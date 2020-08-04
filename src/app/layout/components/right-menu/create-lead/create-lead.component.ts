import { MatSnackBar } from '@angular/material';
import { Lead } from './../../../../models/crm/Lead';
import { Component, OnInit } from '@angular/core';
import { AttributeType } from '../../../../models/AttributeType';
import { AppConfig } from '../../../../app.config';
import { CustomerAttributeValue } from '../../../../models/crm/CustomerAttributeValue';
import { LeadAttributeValue } from '../../../../models/crm/LeadAttributeValue';
import { Customer } from '../../../../models/crm/Customer';
import { ClassesService } from '../../../../services/service.index';
import { LeadsService } from '../../../../services/leads/leads.service';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { Employee } from '../../../../models/Employee';
import { UserService } from '../../../../services/user/user.service';
import { Employeelead } from '../../../../models/EmployeeLead';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.css']
})
export class CreateLeadComponent implements OnInit {

  // Creation & Search
  attTypesSearch: AttributeType[];
  attTypesCreation: AttributeType[];
  wasValidated = false;
  requiredFieldsDone = false;
  lead: Lead;

  sources = null;
  sourceSelected = null;
  srSelected = null;
  paSelected = null;

  // After Search
  wasSearch = false;
  foundCustomer: Customer;

  salesRepsEmployees: Employee[] = [];
  pasEmployees: Employee[] = [];

  constructor(private classesService: ClassesService, public appConfig: AppConfig, private leadsService: LeadsService,
    private dashboardService: DashboardService, private _snackBar: MatSnackBar, private userService: UserService,
    private router: Router) {
    this.classesService.getAttributeTypesSearch().subscribe((attTypes: AttributeType[]) => this.attTypesSearch = attTypes);
    this.classesService.getAttributeTypesCreation().subscribe((attTypes: AttributeType[]) => this.attTypesCreation = attTypes);
    this.lead = new Lead();
    this.lead.leadAttributeValue = [];
    this.lead.mainCustomer = new Customer();
  }

  ngOnInit() {
    this.getSources();
    this.getEmployees();
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  getSources() {
    this.dashboardService.getSources().subscribe((res) => {
      // console.log('Sources', res);
      this.sources = res.results;
    });
  }

  getEmployees() {
    this.userService.getEmployeesByRoleAndStore(this.appConfig.rolesIds.sr).subscribe((sreps: Employee[]) => {
      this.salesRepsEmployees = sreps;
    });

    this.userService.getEmployeesByRoleAndStore(this.appConfig.rolesIds.pa).subscribe((pas: Employee[]) => {
      this.pasEmployees = pas;
    });
  }

  onChange(value: any, attType: AttributeType, Att?: any) {
    const classObj = attType.class;
    // console.log('Value', value, 'AttType', attType);

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

      // console.log('attType', attType);

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

  close() {
    this.sources = null;
    this.sourceSelected = null;
    this.srSelected = null;
    this.paSelected = null;

    // After Search
    this.wasSearch = false;
    this.foundCustomer = null;

    this.salesRepsEmployees = [];
    this.pasEmployees = [];
    this.userService.hideRightMenu();
  }

  searchCustomer() {
    const customer = new Customer();
    let empty = false;

    this.attTypesSearch.forEach(element => {
      switch (element.attributeTypeId) {
        case this.appConfig.CustomerAT.MobileNum:
          element.customerAttributeValue.length > 0 ?
            customer.mobileNum = element.customerAttributeValue[0].customerAttributeValue1 : customer.mobileNum = null;
          break;
        case this.appConfig.CustomerAT.Email:
          element.customerAttributeValue.length > 0 ?
            customer.email = element.customerAttributeValue[0].customerAttributeValue1 : customer.email = null;
          break;
      }

      if (element.obligatory && element.customerAttributeValue.length === 0) {
        empty = true;
      }
    });

    if (empty) {
      this.wasValidated = true;
      return null;
    }

    this.leadsService.searchCustomer(customer).subscribe((customerAnsw: Customer) => {
      this.wasValidated = false;
      this.wasSearch = true;
      this.foundCustomer = customerAnsw;
      // console.log('Customer', this.foundCustomer);
    });
  }

  createCustomer() {
    const customer = new Customer();
    customer.customerAttributeValue = [];
    let empty = false;

    this.evaluateAttributes(customer, empty);

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
      this.close();
    });
  }

  createLead() {
    if (this.foundCustomer) {
      let empty = false;

      if (this.paSelected == null || this.srSelected == null) {
        empty = true;
      }

      if (empty) {
        this.wasValidated = true;
        return null;
      }

      const newLead = new Lead();
      this.createNewLead(newLead);

      // console.log(newLead);

      this.leadsService.createLead(newLead).subscribe((lead: Lead) => {
        this.sendNotification('Lead Created!');
        this.close();
        this.router.navigateByUrl(`/lead/${lead.leadId}`);
      });

    } else {
      this.createCustomerAndLead();
    }
  }

  createCustomerAndLead() {
    const customer = new Customer();
    customer.customerAttributeValue = [];
    let empty = false;

    this.evaluateAttributes(customer, empty);

    if (!this.sourceSelected) {
      empty = true;
    }

    if (this.paSelected == null || this.srSelected == null) {
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
      console.log(customerAnsw);
      customerAnsw.lead = [];

      this.sendNotification('Customer Created!');
      this.foundCustomer = customerAnsw;

      const newLead = new Lead();
      this.createNewLead(newLead);

      this.leadsService.createLead(newLead).subscribe((lead: Lead) => {
        this.sendNotification('Lead Created!');
        this.close();
        this.router.navigateByUrl(`/lead/${lead.leadId}`);
      });
    });
  }

  createNewLead(newLead: Lead) {
    const eleadPA: Employeelead = new Employeelead();
    eleadPA.employeeId = this.paSelected;
    const eleadSR: Employeelead = new Employeelead();
    eleadSR.employeeId = this.srSelected;

    newLead.workflowId = this.appConfig.salesWorkflowId;
    if (this.foundCustomer) {
      newLead.mainCustomerId = this.foundCustomer.customerId;
    }
    newLead.creationDate = new Date();
    newLead.lastContactDate = new Date();
    newLead._1stVisitDate = new Date();

    if (this.foundCustomer) {
      newLead.sourceName = this.foundCustomer.sourceName;
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

  evaluateAttributes(customer: Customer, empty: boolean) {
    this.attTypesCreation.forEach(element => {
      switch (element.attributeTypeId) {
        case this.appConfig.CustomerAT.Name:
          if (element.customerAttributeValue.length > 0) {
            customer.name = element.customerAttributeValue[0].customerAttributeValue1;
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
          }
          break;
        case this.appConfig.CustomerAT.Lastname:
          if (element.customerAttributeValue.length > 0) {
            customer.lastname = element.customerAttributeValue[0].customerAttributeValue1;
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
          }
          break;
        case this.appConfig.CustomerAT.MobileNum:
          if (element.customerAttributeValue.length > 0) {
            customer.mobileNum = element.customerAttributeValue[0].customerAttributeValue1;
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
          }
          break;
        case this.appConfig.CustomerAT.Email:
          if (element.customerAttributeValue.length > 0) {
            customer.email = element.customerAttributeValue[0].customerAttributeValue1;
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
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
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
          }
          break;
        case this.appConfig.CustomerAT.Lastname:
          if (element.customerAttributeValue.length > 0) {
            customer.lastname = element.customerAttributeValue[0].customerAttributeValue1;
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
          }
          break;
        case this.appConfig.CustomerAT.MobileNum:
          if (element.customerAttributeValue.length > 0) {
            customer.mobileNum = element.customerAttributeValue[0].customerAttributeValue1;
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
          }
          break;
        case this.appConfig.CustomerAT.Email:
          if (element.customerAttributeValue.length > 0) {
            customer.email = element.customerAttributeValue[0].customerAttributeValue1;
            customer.customerAttributeValue.push(element.customerAttributeValue[0]);
          }
          break;
      }

      if (element.obligatory && element.customerAttributeValue.length === 0) {
        empty = true;
      }
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

}
