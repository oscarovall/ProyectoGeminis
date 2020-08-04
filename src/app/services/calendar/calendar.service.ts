import { environment } from './../../../environments/environment';
import { AppConfig } from './../../app.config';
import { Injectable, EventEmitter } from '@angular/core';
import { Appointment } from '../../models/crm/Appointment';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AppointmentEmployee } from '../../models/crm/AppoinmentEmployee';
import { Lead } from '../../models/crm/Lead';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { Customer } from '../../models/crm/Customer';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  // Pending Events
  allEvents: Appointment[];
  allEventsChanged: EventEmitter<Appointment[]> = new EventEmitter<Appointment[]>();
  selectedEventChanged: EventEmitter<Appointment> = new EventEmitter<Appointment>();
  selectedEvent: Appointment;

  // Customer
  public selectedCustomer: Customer;
  public selectedCustomerChanged: EventEmitter<Customer> = new EventEmitter<Customer>();
  
  displayCreationForm = true;

  constructor(
    private http: HttpClient,
    private config: AppConfig,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.getAllEvents(this.authService.getUser().employeeId);
  }

  getAllEvents(employeeId) {
    this.getEventsByEmployee(employeeId).subscribe((appointmentsEmployee: AppointmentEmployee[]) => {
      this.allEvents = [];  
      appointmentsEmployee.forEach((appointmentEmployee: AppointmentEmployee) => {
        // Change the datetime to Date DataType
        appointmentEmployee.appointment.creationDate = this.convertDateToTimezone(appointmentEmployee.appointment.creationDate);
        appointmentEmployee.appointment.startDate = this.convertDateToTimezone(appointmentEmployee.appointment.startDate);
        appointmentEmployee.appointment.endDate = this.convertDateToTimezone(appointmentEmployee.appointment.endDate);
        appointmentEmployee.appointment.employeeId = appointmentEmployee.employeeId;
        this.allEvents.push(appointmentEmployee.appointment);
      });

      this.allEventsChanged.emit(this.allEvents);
    });
  }

  ////////////////////////////////////////////
  //              Appointments              //
  ////////////////////////////////////////////
  setSelectedEvent(selectedEvent: Appointment) {
    this.selectedEvent = selectedEvent;
    this.selectedEventChanged.emit(this.selectedEvent);
  }

  setSelectedCustomer(selectedCustomer: Customer) {
    this.selectedCustomer = selectedCustomer;
    this.selectedCustomerChanged.emit(this.selectedCustomer);
  }

  getEventsByEmployee(employeeId: number) {
    const url = `${environment.api}AppointmentEmployees/${employeeId}`;
    return this.http.get<AppointmentEmployee[]>(url)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Appoinments',
            text: err.message
          });
          return [];
        })
      );
  }

  getEventsByEmployeeDate(employeeId: number, date: Date) {
    const url = `${environment.api}AppointmentEmployees/${employeeId}`;
    return this.http.put<AppointmentEmployee[]>(url, date)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Appoinments',
            text: err.message
          });
          return [];
        })
      );
  }

  updateEvent(appointment: any) {
    appointment.appointmentEmployee = null;
    const url = `${environment.api}Appointments/${appointment.appointmentId}`;
    return this.http.put<Appointment>(url, appointment)
      .pipe(
        map(() => {
          if (appointment.open === false) {
            this.allEvents = this.allEvents.filter(ev => ev.appointmentId !== appointment.appointmentId);
          }
          this.allEventsChanged.emit(this.allEvents);
        }),
        catchError(err => {
          console.log('Error', err);
          Swal.fire({
            icon: 'error',
            title: 'Error when updating Appoinment',
            text: err.message
          });
          return [];
        })
      );
  }

  createEvent(appointment: Appointment) {
    const url = `${environment.api}Appointments`;
    return this.http.post<Appointment>(url, appointment)
      .pipe(
        map((appointmentNew: Appointment) => {
          appointmentNew.creationDate = this.convertDateToTimezone(appointmentNew.creationDate);
          appointmentNew.startDate = this.convertDateToTimezone(appointmentNew.startDate);
          appointmentNew.endDate = this.convertDateToTimezone(appointmentNew.endDate);
          this.allEvents.push(appointmentNew);
          this.allEventsChanged.emit(this.allEvents);
        }),
        catchError(err => {
          console.log('Error', err);
          Swal.fire({
            icon: 'error',
            title: 'Error when creating Appoinment',
            text: err.message
          });
          return [];
        })
      );
  }

  convertDateToTimezone(date: any) {
    // const nowDate = new Date();
    if (date) {
      date = new Date(date);
      // date = new Date(date.getTime() + (nowDate.getTimezoneOffset() * 60 * 1000));
      return date;
    }
  }

  getLeadByCustomers(filter: String[]) {
    const url = `${environment.api}Leads/byCostumers`;
    return this.http.post<Lead[]>(url, filter)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Appoinments',
            text: err.message
          });
          return [];
        })
      );
  }

}
