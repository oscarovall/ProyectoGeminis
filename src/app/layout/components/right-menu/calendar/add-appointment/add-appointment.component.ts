import { Component, OnInit, ViewChild, Output, EventEmitter, Input, OnChanges, SimpleChanges, Pipe } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Appointment } from '../../../../../models/crm/Appointment';
import { AppConfig } from '../../../../../app.config';
import { AppointmentEmployee } from '../../../../../models/crm/AppoinmentEmployee';
import { LogoComponent } from '../../../logo/logo.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Lead } from '../../../../../models/crm/Lead';
import { AuthService, CalendarService, UserService } from '../../../../../services/service.index';
import { Employee } from '../../../../../models/Employee';
import { LeadsService } from '../../../../../services/leads/leads.service';
import { Customer } from '../../../../../models/crm/Customer';


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit, OnChanges {

  @Input() addTask: Appointment;
  @Input() selectedCustomer: Customer;
  @Input() type: string;
  @Output() saveDone: EventEmitter<boolean>;
  @ViewChild('f', null) form: NgForm;
  toEdit = false;
  startTime: Date;
  endTime: Date;
  wasValidated = false;
  filteredOptions: Array<Lead>;
  teamMemberSelected = null;
  teamMembers: Employee[];
  // myControl = new FormControl();

  constructor(private calendarService: CalendarService, public appConfig: AppConfig, private userService: UserService,
    private authService: AuthService, private leadService: LeadsService) {
    this.saveDone = new EventEmitter<boolean>();
    this.getTeamMembers();
  }

  ngOnInit() {
  }

  setLead(lead: Lead) {
    this.addTask.leadId = lead.leadId;
    this.addTask.workflowId = lead.workflowId;
  }

  onKeyUp(event) {
    this.filteredOptions = [];
    if (event.target.value && event.target.value !== '') {
      this.filter(event.target.value);
    } else {
      if (this.addTask.leadId) {
        this.addTask.leadId = null;
      }
    }
  }

  filter(filterValue: string) {
    if (filterValue.length && filterValue.length >= 3) {
      let arreglo = filterValue.split(' ');
      arreglo = arreglo.filter(el => el !== '');
      arreglo = arreglo.filter(el => el.length !== 1);

      this.calendarService.getLeadByCustomers(arreglo).subscribe((leads: Lead[]) => {
        this.filteredOptions = leads;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.addTask) {
      this.toEdit = true;
      this.startTime = this.addTask.startDate;
      this.endTime = this.addTask.endDate;
    } else {
      this.toEdit = false;
      this.addTask = new Appointment(new Date(), this.appConfig.channelType.email, this.appConfig.appointmentType.appointment);
      const ae = new AppointmentEmployee(this.authService.getUser().employeeId, new Date());
      this.addTask.appointmentEmployee = [];
      this.addTask.appointmentEmployee.push(ae);
    }
    if (this.selectedCustomer) {
  
    }
    if (this.addTask.employeeId) {
      this.teamMemberSelected = this.addTask.employeeId;
    }
  }

  setDate(event, date) {
    date = event;
  }

  saveTask() {
    let isValid = true;

    if (this.form.valid === false) {
      isValid = false;
    }

    
    this.addTask.appointmentTypeId = this.type;
    if (this.type === this.appConfig.appointmentType.appointment) {
      if (this.startTime && this.addTask.startDate &&
        this.endTime && this.addTask.endDate) {
        this.addTask.startDate.setHours(this.startTime.getHours(), this.startTime.getMinutes());
        this.addTask.endDate.setHours(this.endTime.getHours(), this.endTime.getMinutes());
        
      } else {
        isValid = false;
      }
    } else if (this.type === this.appConfig.appointmentType.pendingTask) {
      if (this.endTime && this.addTask.endDate) {
        this.addTask.startDate = new Date();
        this.addTask.endDate.setHours(this.endTime.getHours(), this.endTime.getMinutes());
   
      } else {
        isValid = false;
      }
    } else if (this.type === this.appConfig.appointmentType.reminder) {
      if (this.endTime && this.addTask.endDate) {
        this.addTask.endDate.setHours(this.endTime.getHours(), this.endTime.getMinutes());
        this.addTask.startDate = this.addTask.endDate;
      
      } else {
        isValid = false;
      }
    }

    if (isValid) {
      this.wasValidated = false;
      if (this.addTask.appointmentId) {
        console.log(this.addTask.startDate.toLocaleString());

        this.calendarService.updateEvent(this.addTask).subscribe(res => {
          this.saveDone.emit(true);
        });
      } else {
        this.addTask.createdById = this.authService.getUser().employeeId;
        this.calendarService.createEvent(this.addTask).subscribe(res => {
          this.saveDone.emit(true);
        });
      }
    } else {
      this.wasValidated = true;
    }
  }

  setPriority(event) {
    this.addTask.priority = event;
  }

  cancelTask() {
    this.saveDone.emit(false);
  }

  getTeamMembers() {
    this.leadService.getTeamMembers(this.authService.getUser().employeeId).subscribe((employeeList) => {
      this.teamMembers = employeeList;
    });
  }

  assignEmployee() {
    this.addTask.appointmentEmployee[0].employeeId = this.teamMemberSelected;
    if (this.teamMemberSelected !== this.authService.getUser().employeeId) {
      this.addTask.appointmentEmployee[0].owner = false;
    }
  }
}
