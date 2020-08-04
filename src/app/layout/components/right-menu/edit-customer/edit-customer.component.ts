import { MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../../../../models/crm/Customer';
import { AttributeType } from '../../../../models/AttributeType';
import { CustomerAttributeValue } from '../../../../models/crm/CustomerAttributeValue';
import { LeadAttributeValue } from '../../../../models/crm/LeadAttributeValue';
import { ClassesService } from '../../../../services/classes/classes.service';
import { AppConfig } from '../../../../app.config';
import { LeadsService } from '../../../../services/leads/leads.service';
import { Lead } from '../../../../models/crm/Lead';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { CustomerService } from '../../../../services/customer/customer.service';
import { UserService } from '../../../../services/user/user.service';
import { Employee } from '../../../../models/Employee';
import { Attribute } from '../../../../models/Attribute';
import { Appointment } from '../../../../models/crm/Appointment';
import { NgForm } from '@angular/forms';
import { Employeelead } from '../../../../models/EmployeeLead';
import { CalendarService } from '../../../../services/calendar/calendar.service';
import { AppointmentEmployee } from '../../../../models/crm/AppoinmentEmployee';
import { AuthService } from '../../../../services/auth/auth.service';
import { config } from 'rxjs';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  @ViewChild('f2', null) form: NgForm;

  // Creation & Search
  attTypesSearch: AttributeType[];
  attTypesCreation: AttributeType[];
  wasValidated = false;
  requiredFieldsDone = false;
  lead: Lead;

  salesRepsEmployees: Employee[] = [];
  pasEmployees: Employee[] = [];
  lasEmployees: Employee[] = [];

  selectedCustomer: Customer;
  sources = null;
  status = null;
  sourceSelected = null;
  srSelected = null;
  paSelected = null;
  statusSelected = null;
  notes = null;

  // Lead && Appointment
  createLeadInProgress: boolean = false;
  newAppointment: Appointment;
  startTime: Date;
  endTime: Date;


  // After Search
  wasSearch = false;
  foundCustomer: Customer;

  constructor(
    private classesService: ClassesService,
    public appConfig: AppConfig,
    private leadsService: LeadsService,
    private dashboardService: DashboardService,
    private customerService: CustomerService,
    private calendarService: CalendarService,
    private authService: AuthService,
    private userService: UserService,
    private _snackBar: MatSnackBar) {

    // Appointment
    this.newAppointment = new Appointment(new Date(), this.appConfig.channelType.email, this.appConfig.appointmentType.appointment);
    const ae = new AppointmentEmployee(this.authService.getUser().employeeId, new Date());
    this.newAppointment.appointmentEmployee = [];
    this.newAppointment.appointmentEmployee.push(ae);

    // Lead
    this.lead = new Lead();
    this.lead.leadAttributeValue = [];
    this.lead.mainCustomer = new Customer();

    // AttributeType
    this.classesService.getAttributeTypesSearch().subscribe((attTypes: AttributeType[]) => {
      console.log('1');
      this.attTypesSearch = attTypes;
      this.setCustomer();
    });
    this.classesService.getAttributeTypesCreation().subscribe((attTypes: AttributeType[]) => {
      console.log('2');
      this.attTypesCreation = attTypes;
      this.setCustomer();
    });
  }

  ngOnInit() {
    this.getSources();
    this.getCustomerStatus();
    this.getEmployees();

    this.customerService.selectedCustomerChanged.subscribe((selectedCustomer: Customer) => {
      this.selectedCustomer = selectedCustomer;
      this.setCustomer();
    });
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  getEmployees() {
    this.userService.getEmployeesByRoleAndStore(this.appConfig.rolesIds.sr).subscribe((sreps: Employee[]) => {
      this.salesRepsEmployees = sreps;
    });

    this.userService.getEmployeesByRoleAndStore(this.appConfig.rolesIds.pa).subscribe((pas: Employee[]) => {
      this.pasEmployees = pas;
    });

    this.userService.getEmployeesByRoleAndStore(this.appConfig.rolesIds.la).subscribe((las: Employee[]) => {
      this.lasEmployees = las;
    });
  }

  getSources() {
    this.dashboardService.getSources().subscribe((res) => {
      // console.log('Sources', res);
      this.sources = res.results;
    });
  }

  getCustomerStatus() {
    this.customerService.getCustomerStatus().subscribe((res) => {
      console.log('Status', res);
      this.status = res;
    });
  }

  initValues() {
    if (this.attTypesCreation) {
      this.attTypesCreation.forEach((attType: AttributeType) => {
        attType.customerAttributeValue = [];
      });
    }

    if (this.attTypesSearch) {
      this.attTypesSearch.forEach((attType: AttributeType) => {
        attType.customerAttributeValue = [];
      });
    }
    this.createLeadInProgress = false;
    this.cleanValues();
  }

  cleanValues() {
    this.newAppointment = new Appointment(new Date(), this.appConfig.channelType.email, this.appConfig.appointmentType.appointment);
    const ae = new AppointmentEmployee(this.authService.getUser().employeeId, new Date());
    this.newAppointment.appointmentEmployee = [];
    this.newAppointment.appointmentEmployee.push(ae);
    this.srSelected = null;
    this.paSelected = null;
    this.startTime = null;
    this.endTime = null;
  }

  setCustomer() {
    this.initValues();
    console.log('3');

    // this.selectedCustomer = resCustomer;
    console.log('customerSlected', this.selectedCustomer);
    // Get Customer Values
    this.selectedCustomer.customerAttributeValue.forEach(
      (customerAttValue: CustomerAttributeValue) => {
        if (this.attTypesCreation) {
          this.attTypesCreation.forEach((attType: AttributeType) => {
            if (attType.attributeTypeId === customerAttValue.attributeTypeId) {
              attType.customerAttributeValue = [];
              attType.customerAttributeValue.push(customerAttValue);
              attType.attribute.forEach((att: Attribute) => {
                if (customerAttValue.attributeId === att.attributeId) {
                  att.checkValue = true;
                }
              });
            }
          });
        }

        if (this.attTypesSearch) {
          this.attTypesSearch.forEach((attType: AttributeType) => {
            if (attType.attributeTypeId === customerAttValue.attributeTypeId) {
              attType.customerAttributeValue = [];
              attType.customerAttributeValue.push(customerAttValue);
              attType.attribute.forEach((att: Attribute) => {
                if (customerAttValue.attributeId === att.attributeId) {
                  att.checkValue = true;
                }
              });
            }
          });
        }
      }
    );

    console.log();

  }

  onChange(value: any, attType: AttributeType, Att?: any) {
    const classObj = attType.class;
    console.log('Value', value, 'AttType', attType);

    if (value || this.appConfig.dataType.Checkbox.includes(attType.dataTypeId)) {
      const attTypeTemp = attType;

      if (this.appConfig.dataType.NoList.includes(attTypeTemp.dataTypeId)) {
        if (classObj.objectTypeId === this.appConfig.objectType.Customer) {
          if (attType.dataTypeId === this.appConfig.dataType.Date) {
            try {
              const date = new Date(value);
              value = date.toLocaleString('en-US');
            } catch (Exception) {
              value = '';
            }
          }
          attType.customerAttributeValue = [];
          const data = new CustomerAttributeValue();
          data.attributeId = parseInt(value.AttributeID, 10);
          data.customerAttributeValue1 = value;
          data.customerId = this.lead.mainCustomerId;
          data.attributeId = -1;
          data.attributeTypeId = attType.attributeTypeId;
          attType.customerAttributeValue.push(data);
          attType.customerAttributeValue[0].customerAttributeValue1 = value;
        } else if (classObj.objectTypeId === this.appConfig.objectType.Lead) {
          if (attType.dataTypeId === this.appConfig.dataType.Date) {
            try {
              const date = new Date(value);
              value = date.toLocaleString('en-US');
            } catch (Exception) {
              value = '';
            }
          }
          if (!attType.leadAttributeValue.length) {
            attType.leadAttributeValue = [];
            const data = new LeadAttributeValue();
            data.attributeId = parseInt(value.AttributeID, 10);
            data.leadAttributeValue1 = value;
            data.attributeId = -1;
            data.attributeTypeId = attType.attributeTypeId;
            attType.leadAttributeValue.push(data);
          } else {
            attType.leadAttributeValue[0].leadAttributeValue1 = value;
          }
        }
      }

      if (this.appConfig.dataType.List.includes(attTypeTemp.dataTypeId)) {
        if (classObj.objectTypeId === this.appConfig.objectType.Customer) {
          if (!attType.customerAttributeValue[0]) {
            const data = new CustomerAttributeValue();
            data.attributeId = parseInt(value.AttributeID, 10);
            data.customerId = this.lead.mainCustomerId;
            data.attributeId = parseInt(value, 10);
            data.attributeTypeId = attType.attributeTypeId;
            attType.customerAttributeValue.push(data);
          }
          attType.customerAttributeValue[0].attributeId = parseInt(value, 10);
        } else if (classObj.objectTypeId === this.appConfig.objectType.Lead) {
          if (!attType.leadAttributeValue.length) {
            attType.leadAttributeValue = [];
            const data = new LeadAttributeValue();
            data.attributeId = parseInt(value.AttributeID, 10);
            data.attributeId = parseInt(value, 10);
            data.attributeTypeId = attType.attributeTypeId;
            attType.leadAttributeValue.push(data);
          } else {
            attType.leadAttributeValue[0].attributeId = parseInt(value, 10);
          }
        }
      }

      if (this.appConfig.dataType.Checkbox.includes(attTypeTemp.dataTypeId)) {
        if (classObj.objectTypeId === this.appConfig.objectType.Customer) {
          if (value) {
            let data = new CustomerAttributeValue();
            data = Att;
            data.customerAttributeValue1 = value;
            attType.customerAttributeValue.push(data);
          } else {
            attType.customerAttributeValue.forEach(function (item, index, object) {
              if (item.attributeId === Att.attributeId) {
                object.splice(index, 1);
              }
            });
          }
        } else if (classObj.objectTypeId === this.appConfig.objectType.Lead) {
          if (value) {
            let data = new LeadAttributeValue();
            data = Att;
            data.leadAttributeValue1 = value;
            attType.leadAttributeValue.push(data);
          } else {
            attType.leadAttributeValue.forEach(function (item, index, object) {
              if (item.attributeId === Att.attributeId) {
                object.splice(index, 1);
              }
            });
          }
        }
      }

      if (this.appConfig.dataType.DocumentList.includes(attTypeTemp.dataTypeId)) {
        if (classObj.objectTypeId === this.appConfig.objectType.Customer) {
          if (value) {
            const data = new CustomerAttributeValue();
            data.attributeId = parseInt(value.AttributeID, 10);
            data.customerAttributeValue1 = value.AttributeValue;
            data.uploadDate = new Date();
            attType.customerAttributeValue.push(data);
          }
        } else if (classObj.objectTypeId === this.appConfig.objectType.Lead) {
          if (value) {
            const data = new LeadAttributeValue();
            data.attributeId = parseInt(value.AttributeID, 10);
            data.leadAttributeValue1 = value.AttributeValue;
            data.uploadDate = new Date();
            data.attributeTypeId = attType.attributeTypeId;
            attType.leadAttributeValue.push(data);
          }
        }
      }

      console.log('attType', attType);

      if (classObj.changedAttTypes) {
        let wasChanged = false;
        classObj.changedAttTypes.forEach((attTypeChange: AttributeType) => {
          if (attTypeChange.attributeTypeId === attType.attributeTypeId) {
            attTypeChange = attType;
            wasChanged = true;
          }
        });

        if (!wasChanged) {
          classObj.changedAttTypes.push(attType);
        }
      } else {
        classObj.changedAttTypes = [];
        classObj.changedAttTypes.push(attType);
      }
    }
  }

  cancelCreation() {
    this.wasSearch = false;
    this.foundCustomer = null;
  }

  createCustomer() {
    const customer = new Customer();
    customer.customerAttributeValue = [];
    let empty = false;

    this.attTypesCreation.forEach(element => {
      switch (element.attributeTypeId) {
        case this.appConfig.CustomerAT.Name:
          if (element.customerAttributeValue.length > 0) {
            customer.name = element.customerAttributeValue[0].customerAttributeValue1;
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
          } else {
            customer.name = null;
          }
          break;
        case this.appConfig.CustomerAT.Lastname:
          if (element.customerAttributeValue.length > 0) {
            customer.lastname = element.customerAttributeValue[0].customerAttributeValue1;
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
          } else {
            customer.lastname = null;
          }
          break;
        case this.appConfig.CustomerAT.MobileNum:
          if (element.customerAttributeValue.length > 0) {
            customer.mobileNum = element.customerAttributeValue[0].customerAttributeValue1;
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
          } else {
            customer.mobileNum = null;
          }
          break;
        case this.appConfig.CustomerAT.Email:
          if (element.customerAttributeValue.length > 0) {
            customer.email = element.customerAttributeValue[0].customerAttributeValue1;
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
          } else {
            customer.email = null;
          }
          break;
      }

      if (element.obligatory && element.customerAttributeValue.length === 0) {
        empty = true;
      }
    });

    if (!this.sourceSelected) {
      empty = true;
    }

    if (empty) {
      this.wasValidated = true;
      return null;
    }

    customer.creationDate = new Date();
    customer.sourceName = this.sourceSelected;

    console.log('Customer', customer);

    this.leadsService.createCustomer(customer).subscribe((customerAnsw: Customer) => {
      this.sendNotification('A new customer was created');
    });
  }

  cancelPropagacion(e) {
    if (e.target.tagName === 'INPUT') {
      e.preventDefault();
      e.returnValue = false;
      e.cancelBubble = true;
      return false;
    }
  }

  validForm() {
    let isValid = true;

    if (this.form.valid === false) {
      isValid = false;
    }

    if (isValid) {
      this.createLead();
    } else {
      this.wasValidated = true;
    }
  }

  createLead() {
    const newLead = new Lead();
    this.createNewLead(newLead);

    console.log(newLead);

    this.leadsService.createLead(newLead).subscribe((lead: Lead) => {
      this.sendNotification('Lead Created!');
      this.createAppointment(lead.leadId);
      this.onNavigate(lead);
    });
  }

  createNewLead(newLead: Lead) {
    const eleadPA: Employeelead = new Employeelead();
    eleadPA.employeeId = this.paSelected;
    const eleadSR: Employeelead = new Employeelead();
    eleadSR.employeeId = this.srSelected;

    newLead.workflowId = this.appConfig.salesWorkflowId;
    if (this.selectedCustomer) {
      newLead.mainCustomerId = this.selectedCustomer.customerId;
    }
    newLead.creationDate = new Date();
    newLead.lastContactDate = new Date();
    if (this.selectedCustomer) {
      newLead.sourceName = this.selectedCustomer.sourceName;
    } else {
      newLead.sourceName = this.sourceSelected;
    }
    newLead.leadStatusId = this.appConfig.leadStatusIds.potencial;

    this.salesRepsEmployees.forEach((sr: Employee) => {
      if (sr === this.srSelected) {
        newLead.storeId = sr.storeId;
      }
    });

    newLead.employeeLead = [];
    newLead.employeeLead.push(eleadPA);
    newLead.employeeLead.push(eleadSR);
  }

  createAppointment(leadId) {
    if (leadId) {
      this.newAppointment.leadId = leadId;
    }
    if (this.startTime && this.newAppointment.startDate && this.endTime && this.newAppointment.endDate) {
      this.newAppointment.startDate.setHours(this.startTime.getHours(), this.startTime.getMinutes());
      this.newAppointment.endDate.setHours(this.endTime.getHours(), this.endTime.getMinutes());
      console.log('Appointment Task', this.newAppointment);
    }
    this.calendarService.createEvent(this.newAppointment).subscribe(res => {
      this.sendNotification('Appointment Created!');
      this.userService.hideRightMenu();
      this.changeStatusToAppointmentSet();
    });
  }

  updateCustomer() {
    this.evaluateAttributes(this.selectedCustomer, true);
    console.log('selectedCustomer', this.selectedCustomer);
    this.customerService.updateCustomer(this.selectedCustomer).subscribe((customer: Customer) => {
      this.sendNotification('Customer Updated');
      this.customerService.saveDoneCustomer(customer);
      this.userService.hideRightMenu();
    });
  }

  evaluateAttributes(customer: Customer, empty: boolean) {
    this.attTypesCreation.forEach(element => {
      switch (element.attributeTypeId) {
        case this.appConfig.CustomerAT.Name:
          if (element.customerAttributeValue.length > 0) {
            customer.name = element.customerAttributeValue[0].customerAttributeValue1;
            this.setCustomerAttValue(customer, element);
          }
          break;
        case this.appConfig.CustomerAT.Lastname:
          if (element.customerAttributeValue.length > 0) {
            customer.lastname = element.customerAttributeValue[0].customerAttributeValue1;
            this.setCustomerAttValue(customer, element);
          }
          break;
        case this.appConfig.CustomerAT.MobileNum:
          if (element.customerAttributeValue.length > 0) {
            customer.mobileNum = element.customerAttributeValue[0].customerAttributeValue1;
            this.setCustomerAttValue(customer, element);
          }
          break;
        case this.appConfig.CustomerAT.Email:
          if (element.customerAttributeValue.length > 0) {
            customer.email = element.customerAttributeValue[0].customerAttributeValue1;
            this.setCustomerAttValue(customer, element);
          }
          break;
      }

      if (element.obligatory && element.customerAttributeValue.length === 0) {
        empty = true;
      }
    });

    this.attTypesSearch.forEach(element => {
      switch (element.attributeTypeId) {
        case this.appConfig.CustomerAT.Name:
          if (element.customerAttributeValue.length > 0) {
            customer.name = element.customerAttributeValue[0].customerAttributeValue1;
            this.setCustomerAttValue(customer, element);
          }
          break;
        case this.appConfig.CustomerAT.Lastname:
          if (element.customerAttributeValue.length > 0) {
            customer.lastname = element.customerAttributeValue[0].customerAttributeValue1;
            this.setCustomerAttValue(customer, element);
          }
          break;
        case this.appConfig.CustomerAT.MobileNum:
          if (element.customerAttributeValue.length > 0) {
            customer.mobileNum = element.customerAttributeValue[0].customerAttributeValue1;
            this.setCustomerAttValue(customer, element);
          }
          break;
        case this.appConfig.CustomerAT.Email:
          if (element.customerAttributeValue.length > 0) {
            customer.email = element.customerAttributeValue[0].customerAttributeValue1;
            this.setCustomerAttValue(customer, element);
          }
          break;
      }

      if (element.obligatory && element.customerAttributeValue.length === 0) {
        empty = true;
      }
    });
  }

  setCustomerAttValue(customer, element) {
    const existCustomerAttVal = customer.customerAttributeValue.find(el => el.attributeTypeId === element.attributeTypeId);
    if (existCustomerAttVal) {
      existCustomerAttVal.customerAttributeValue1 = element.customerAttributeValue[0].customerAttributeValue1;
    } else {
      customer.customerAttributeValue.push(element.customerAttributeValue[0]);
    }
  }

  changeStatusToAppointmentSet() {
    const appointmentSet = this.status.find(st => st.status === 'Appointment Set');
    if (appointmentSet) {
      this.selectedCustomer.customerStatusId = appointmentSet.customerStatusId;
    }
    this.customerService.updateCustomer(this.selectedCustomer).subscribe((customer: Customer) => {
      this.sendNotification('Customer Updated');
      this.customerService.saveDoneCustomer(customer);
    });
  }

  onNavigate(lead: Lead) {
    if (lead) {
      window.open('/lead/' + lead.leadId);
    }
  }
}
