import { FormsService } from './../../../services/forms/forms.service';
import { CustomerAttributeValue } from './../../../models/crm/CustomerAttributeValue';
import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';


import { Attribute } from '../../../models/Attribute';
import { Class } from '../../../models/Class';
import { AttributeType } from '../../../models/AttributeType';

import { ActivatedRoute, Router } from '@angular/router';
import { Lead, LeadProduct } from '../../../models/crm/Lead';
import { GroupStepOverview } from '../../../models/workflow/GroupStepOverview';
import { LeadStep } from '../../../models/crm/LeadStep';
import { LeadAttributeValue } from '../../../models/crm/LeadAttributeValue';
import { AppConfig } from '../../../app.config';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Traceability } from '../../../models/crm/Traceability';
import { AuthService, WorkflowService, TraceabilityService, LeadsService } from '../../../services/service.index';
import { LeadDocument } from '../../../models/crm/LeadDocument';
import { environment } from '../../../../environments/environment';
import { API } from 'aws-amplify';
import { Home } from '../../../models/crm/home';
import { Employee } from '../../../models/Employee';
import { UserService } from '../../../services/user/user.service';
import { Employeelead } from '../../../models/EmployeeLead';
import { AddOnsInv } from '../../../models/crm/AddOnsInv';
import { ProductService } from '../../../services/Product/product.service';
import { Product } from '../../../models/crm/Product';
import { HomesOrderInput } from '../../../models/crm/HomesOrderInput';
import Swal from 'sweetalert2';
import { ProdOption } from '../../../models/crm/ProdOption';




@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styles: []
})
export class LeadComponent implements OnInit {

  // Data
  selectData = [];
  classes: Class[];
  edit: boolean = false;
  basicInfoDisabled: boolean = true;
  customerAttValueChange: CustomerAttributeValue[];
  homes: Home[];
  dataComplete: Home[];
  addons: AddOnsInv[];

  showSelectedHome: boolean = false;

  // Lead
  leadAttValueChange: LeadAttributeValue[];
  leadId: number;
  lead: Lead;

  tempEmployeeLeads: Employeelead[];

  salesRepsEmployees: Employee[];
  pasEmployees: Employee[];
  lasEmployees: Employee[];

  selectedSR: number;
  selectedPA: number;
  selectedLA: number;

  // Workflow
  WorkflowId: number = this.appConfig.salesWorkflowId;
  wizardGroups: GroupStepOverview[] = [];
  leadStepCurrent: LeadStep;
  wGroups: GroupStepOverview[];

  // Forms to print
  formsToPrint: LeadDocument[];
  homeSelected: Home[] = [new Home(), new Home(), new Home()];
  options: ProdOption[];

  homeToOrder: Home;


  @ViewChild('f', null)
  form: NgForm;
  tempLead: Lead;
  constructor(
    private authService: AuthService,
    public ar: ActivatedRoute,
    private leadsService: LeadsService,
    private wService: WorkflowService,
    private formsService: FormsService,
    public appConfig: AppConfig,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private productService: ProductService,
  ) {

    // Get Classes
    const ClassCustomerLead = this.leadsService.getClassCustomerLead().subscribe((classes: Class[]) => {
      this.classes = classes;
      // console.log(this.classes);

      if (this.classes && this.lead) {
        this.setClasses(this.classes);
      }
    });

    // Get Groups
    this.wService.getGroupStepOverviewsForWorkflow(this.appConfig.salesWorkflowId)
      .subscribe((wGroups: GroupStepOverview[]) => {
        this.wGroups = wGroups;

        if (this.wGroups && this.lead) {
          this.evaluateGroups();
        }
      });

    // Get the Id of the Lead
    this.ar.params.subscribe((params) => {
      this.leadId = params.id;
      this.leadsService.getLead(this.leadId).subscribe((lead: Lead) => {
        this.setLead(lead);
      });

      this.leadsService.getEmployeesLead(this.leadId).subscribe((employeeLeads: Employeelead[]) => {
        this.tempEmployeeLeads = employeeLeads;

        this.setEmployeeLead();
      });
    });

    this.leadsService.leadStepsChanges.subscribe((leadSteps: LeadStep[]) => {
      this.lead.leadSteps = leadSteps;
      this.evaluateLeadSteps(this.lead.leadSteps);
    });

    // Get Forms
    this.formsService.getAllForms().subscribe((leadDocuments: any) => {
      this.formsToPrint = leadDocuments.results;
    });

    // Get Employees
    this.getEmployees();
  }

  setLead(lead: Lead) {
    this.lead = lead;
    if (!this.hasLeadProductActive()) {
      this.search();
    } else {
      // Get Options
      this.leadsService.getAllOptionsByLead().subscribe((options: ProdOption[]) => {
        this.options = options;
      });

      const productInvId = this.lead.leadProducts.filter(data => data.active)[0].productInvId;
      this.leadsService.getOrderHome(productInvId).subscribe(result => this.homeToOrder = result);

      // Get Value Options

    }

    this.tempLead = this.lead;

    // Analize Groups
    if (this.wGroups && this.lead) {
      this.evaluateGroups();
    }

    // Analize Classes
    if (this.classes && this.lead) {
      this.setClasses(this.classes);
    }
  }

  changeOption(option: ProdOption) {

  }

  setClasses(classes: Class[]) {
    // Get General Classes
    // Minimize and Hide classes
    this.evaluateLeadSteps(this.lead.leadSteps);

    // Get Lead Values
    this.lead.leadAttributeValue.forEach((leadAttValue: LeadAttributeValue) => {
      this.classes.forEach((classObj: Class) => {
        classObj.attributeType.forEach((attType: AttributeType) => {
          if (attType.leadAttributeValue == null) {
            attType.leadAttributeValue = [];
          }

          if (attType.attributeTypeId === leadAttValue.attributeTypeId) {
            attType.leadAttributeValue.push(leadAttValue);
            attType.attribute.forEach((att: Attribute) => {
              if (leadAttValue.attributeId === att.attributeId) {
                att.checkValue = true;
              }
            });
          }
        });
      });
    });

    // Get Customer Values
    this.lead.mainCustomer.customerAttributeValue.forEach(
      (customerAttValue: CustomerAttributeValue) => {
        this.classes.forEach((classObj: Class) => {
          classObj.attributeType.forEach((attType: AttributeType) => {
            if (attType.customerAttributeValue == null) {
              attType.customerAttributeValue = [];
            }

            if (attType.attributeTypeId === customerAttValue.attributeTypeId) {
              attType.customerAttributeValue.push(customerAttValue);
              attType.attribute.forEach((att: Attribute) => {
                if (customerAttValue.attributeId === att.attributeId) {
                  att.checkValue = true;
                }
              });
            }
          });
        });
      }
    );


    this.setEmployeeLead();
  }

  evaluateGroups() {
    // Checking the status of the groups
    this.lead.leadSteps.forEach((leadStep: LeadStep) => {
      this.wGroups.forEach((group: GroupStepOverview) => {
        if (group.groupId === leadStep.step.groupId) {
          if (group.statusLead !== 'Done') {
            group.statusLead = leadStep.statusName;
          }
        }
      });
    });
    // console.log('wGroups:', wGroups);
    this.wizardGroups = this.wGroups;
  }

  setEmployeeLead() {

    if (this.lead && this.tempEmployeeLeads && this.lasEmployees && this.salesRepsEmployees && this.pasEmployees) {
      this.lead.employeeLead = this.tempEmployeeLeads;

      this.lead.employeeLead.forEach((employeeLead: Employeelead) => {
        let employee = this.salesRepsEmployees.find(em => em.employeeId === employeeLead.employeeId);
        if (!employee) {
          employee = this.pasEmployees.find(em => em.employeeId === employeeLead.employeeId);
        }
        if (!employee) {
          employee = this.lasEmployees.find(em => em.employeeId === employeeLead.employeeId);
        }

        if (employee) {
          if (employee.roleId === this.appConfig.rolesIds.sr) {
            this.selectedSR = employee.employeeId;
          }
          if (employee.roleId === this.appConfig.rolesIds.pa) {
            this.selectedPA = employee.employeeId;
          }
          if (employee.roleId === this.appConfig.rolesIds.la) {
            this.selectedLA = employee.employeeId;
          }
        }
      });
    }
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

    this.setEmployeeLead();
  }

  evaluateLeadSteps(leadSteps: LeadStep[]) {

    leadSteps.forEach((leadStep: LeadStep) => {
      leadStep.step.stepClasses.forEach((stepClass) => {
        this.classes.forEach((classObj: Class) => {
          // Show Done Classes
          if (stepClass.classId === classObj.classId) {
            classObj.visible = true;
            // Visible Classes - OPEN THE CURRENT CLASS
            if (leadStep.statusName === this.appConfig.leadStepStatus.current) {
              classObj.open = true;
              this.leadStepCurrent = leadStep;
            } else {
              classObj.open = false;
              classObj.disabled = true;
            }
          }
        });
      });
    });
  }

  ngOnInit() {
    this.productService.orderHomeSelected.subscribe((home: Home) => {
      this.homeToOrder = home;
      this.orderHomes();
    });
  }

  Test(some: any) {
  }

  // Hidden Show Classes with dependencies
  validateClass(AttributeObj, classes: Class[]) {
    if (AttributeObj) {
      if (classes[AttributeObj.attributeType.classId - 1].objectTypeId === this.appConfig.objectType.Customer) {
        let at;
        classes.forEach((classObj) => {
          classObj.attributeType.forEach((attType) => {
            if (AttributeObj.attributeType.attributeTypeId === attType.attributeTypeId) {
              at = attType;
            }
          });
        });
        const attributeId = at.CustomerAttributeValue[0].attributeId;
        // console.log(attributeId);
        if (AttributeObj.attributeId === attributeId) {
          return true;
        }
      } else if (
        classes[AttributeObj.attributeType.classId - 1].objectTypeId === this.appConfig.objectType.Lead
      ) {
        let at;
        classes.forEach((classObj) => {
          classObj.attributeType.forEach((attType) => {
            if (AttributeObj.attributeType.attributeTypeId === attType.attributeTypeId) {
              at = attType;
            }
          });
        });
        const attributeId = at.leadAttributeValue[0] ? at.leadAttributeValue[0].attributeId : null;
        if (AttributeObj.attributeId === attributeId) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  }

  saveLeadInf() {
    this.lead = this.tempLead;

    this.basicInfoDisabled = true;

    if (!this.lead.employeeLead) {
      this.lead.employeeLead = [];
    }

    const existSR = this.lead.employeeLead.find(el => el.employeeId === this.selectedSR);
    if (!existSR) {
      const newEmployeeLead = new Employeelead();
      newEmployeeLead.employeeId = this.selectedSR;
      newEmployeeLead.leadId = this.lead.leadId;
      newEmployeeLead.workflowId = this.appConfig.salesWorkflowId;
      this.lead.employeeLead.push(newEmployeeLead);
    }
    const existPA = this.lead.employeeLead.find(el => el.employeeId === this.selectedPA);
    if (!existPA) {
      const newEmployeeLead = new Employeelead();
      newEmployeeLead.employeeId = this.selectedPA;
      newEmployeeLead.leadId = this.lead.leadId;
      newEmployeeLead.workflowId = this.appConfig.salesWorkflowId;
      this.lead.employeeLead.push(newEmployeeLead);
    }
    const existLA = this.lead.employeeLead.find(el => el.employeeId === this.selectedLA);
    if (!existLA) {
      const newEmployeeLead = new Employeelead();
      newEmployeeLead.employeeId = this.selectedLA;
      newEmployeeLead.leadId = this.lead.leadId;
      newEmployeeLead.workflowId = this.appConfig.salesWorkflowId;
      this.lead.employeeLead.push(newEmployeeLead);
    }

    this.sendNotification('Saving information...');
    this.leadsService.updateLeadBasicInformation(this.lead).subscribe((resp) => {
      this.sendNotification('Basic information saved');
    });
  }

  OnChangesLead(value, LeadbasicInfoField) {

    if (LeadbasicInfoField === this.appConfig.leadBasicInformation.Source) {
    }
    if (LeadbasicInfoField === this.appConfig.leadBasicInformation.firstVisit) {
      this.tempLead._1stVisitDate = value;
    }
    if (LeadbasicInfoField === this.appConfig.leadBasicInformation.signDate) {
      this.tempLead.signingDate = value;
    }
    if (LeadbasicInfoField === this.appConfig.leadBasicInformation.closeDate) {
      this.tempLead.closeDate = value;
    }
  }

  // Hidden Show attributeType with dependencies
  validate(attType: AttributeType, classObj: Class) {
    // console.log('Validate 1');

    if (attType && attType.attributeNavigation) {
    // console.log('Validate 2', attType, classObj);
    const attDep = attType.attributeNavigation;

    if (classObj.objectTypeId === this.appConfig.objectType.Customer) {
      if (attDep) {
        let at;
        classObj.attributeType.forEach((attType2) => {
          if (attDep.attributeTypeId === attType2.attributeTypeId) {
            at = attType2;
          }
        });
        if (!at.customerAttributeValue.length) {
          return false;
        }
        if (this.appConfig.dataType.NoList.includes(at.dataTypeId)) {
          if (attDep.value === at.customerAttributeValue[0].customerAttributeValue1) {
            return true;
          } else {
            return false;
          }
        } else {
          if (attDep.attributeId === at.customerAttributeValue[0].attributeId) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return true;
      }
    } else if (classObj.objectTypeId === this.appConfig.objectType.Lead) {
      if (attDep) {
        let at: AttributeType;
        classObj.attributeType.forEach((attType2: AttributeType) => {
          if (attDep.attributeTypeId === attType2.attributeTypeId) {
            at = attType2;
          }
        });
        if (!at.leadAttributeValue.length) {
          return false;
        }
        if (this.appConfig.dataType.NoList.includes(at.dataTypeId)) {
          if (attDep.value === at.leadAttributeValue[0].leadAttributeValue1) {
            return true;
          } else {
            return false;
          }
        } else {
          if (attDep.attributeId === at.leadAttributeValue[0].attributeId) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return true;
      }
    }
  }
  return true;
  }

  save(classObj: Class, homeComparison?: boolean) {

    let allGood = true;
    classObj.attributeType.forEach((attType: AttributeType) => {
      if (attType.obligatory) {
        if (classObj.objectTypeId === this.appConfig.objectType.Lead) {
          if (!attType.leadAttributeValue || attType.leadAttributeValue.length === 0) {
            allGood = false;
            attType.valid = false;

          } else {
            attType.leadAttributeValue.forEach((lav: LeadAttributeValue) => {
              if (
                (lav.leadAttributeValue1 === '' && !lav.attributeId) ||
                (lav.leadAttributeValue1 === '' && lav.attributeId === -1)
              ) {
                allGood = false;
                attType.valid = false;

              } else {

              }
            });
          }
        }
      }
      if (attType.dataTypeId === this.appConfig.dataType.ListDocument) {
        attType.attribute.forEach((att: Attribute) => {
          if (att.required) {

            let find = false;
            attType.leadAttributeValue.forEach((lav: LeadAttributeValue) => {
              if (lav.attributeId === att.attributeId) {
                find = true;

                if (
                  lav.leadAttributeValue1 === '' ||
                  !lav.attributeId ||
                  (lav.leadAttributeValue1 === '' || lav.attributeId === -1)
                ) {
                  find = true;
                  allGood = false;
                  attType.valid = false;

                } else {

                }
              }
            });
            if (!find) {
              allGood = false;
              attType.valid = false;

            }
          }
        });
      }
      if (attType.dataTypeId === this.appConfig.dataType.ListImages) {
        attType.attribute.forEach((att: Attribute) => {
          if (att.required) {

            let find = false;
            attType.leadAttributeValue.forEach((lav: LeadAttributeValue) => {
              if (lav.attributeId === att.attributeId) {
                find = true;

                if (
                  lav.leadAttributeValue1 === '' ||
                  !lav.attributeId ||
                  (lav.leadAttributeValue1 === '' || lav.attributeId === -1)
                ) {
                  find = true;
                  allGood = false;
                  attType.valid = false;

                } else {

                }
              }
            });
            if (!find) {
              allGood = false;
              attType.valid = false;

            }
          }
        });
      }
    });

    classObj.attributeType.forEach((attType: AttributeType) => {
      if (attType.valid) {
        if (classObj.objectTypeId === this.appConfig.objectType.Lead) {
          this.lead.leadAttributeValue = attType.leadAttributeValue;
        } else if (classObj.objectTypeId === this.appConfig.objectType.Customer) {

        }
      }
    });

    if (!classObj.changedAttTypes || classObj.changedAttTypes.length === 0) {
      allGood = false;
      this.sendNotification('There are not changes to save!');
    }

    if (allGood) {

      let id;
      if (classObj.objectTypeId === this.appConfig.objectType.Customer) {
        id = this.lead.mainCustomerId;
      } else if (classObj.objectTypeId === this.appConfig.objectType.Lead) {
        id = this.leadId;
      }

      this.sendNotification('Saving Information...');

      this.leadsService.updateLeadAttValues(id, classObj, this.leadId).subscribe(() => {

        classObj.changedAttTypes = [];
        this.sendNotification('Changes Saved!');

        if (homeComparison) {
          // console.log(classObj, 'Prueba');
          this.search();
        }

        // const trace = new Traceability();
        // trace.workflowId = this.WorkflowId;
        // trace.leadId = this.leadId;
        // trace.name = 'Section completed';
        // trace.employeeID = 2;
        // trace.description1 = classObj.name;
        // trace.type = 'info';
        // trace.date = new Date();

        // this.traceabilityService.saveClassChange(trace).subscribe(() => { });
      });
    } else {

      classObj.wasValidated = true;

      if (classObj.changedAttTypes && classObj.changedAttTypes.length > 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Mandatory info is required',
          text: 'There are mandatory values missing'
        });
      }

      return;
    }
  }

  search() {
    this.sendNotification('Searching houses...');
    if (this.lead && this.lead.leadId && this.lead.workflowId) {

      this.leadsService.getHomes(this.lead.leadId, this.lead.workflowId)
        .subscribe((result: any) => {
          this.sendNotification('Houses found!');
          this.homes = result.results;
          this.addons = result.results.addOnsInv;


          for (let i = 0; i <= 2; i++) {
            if (this.homes.length > i) {
              this.homes[i].selected = true;
              this.homeSelected[i] = this.homes[i];
            }
            if (this.homes.length === i) {

              this.dataComplete = this.homes;
            }
          }
        });


    } else {

      this.homes = [];
    }
  }

  cargarHome(home: Home, index: number) {

    home.selected = false;
    this.homeSelected[index].selected = true;

  }

  getSelectedHomes() {
    if (this.homeSelected) {
      // return this.homes.filter(data => data.selected);
      return this.homeSelected;
    } else {
      return [];
    }
  }

  getNotSelectedHomes() {
    if (this.homes) {
      const catalog = this.homes.filter(data => !data.selected && !data.readyToMove);
      const inventory = this.homes.filter(data => !data.selected && data.readyToMove);
      return [{ name: 'Inventory', items: inventory }, { name: 'Catalog', items: catalog }];
    } else {
      return [];
    }
  }

  orderHomes() {
    const input = new HomesOrderInput();
    input.leadId = this.lead.leadId;
    input.workflowId = this.lead.workflowId;
    input.productInvId = this.homeToOrder.productInvId;
    input.readyToMove = this.homeToOrder.readyToMove;
    // this.showSelectedHome = true;
    this.leadsService.homesOrder(input)
      .subscribe((leadProducts: HomesOrderInput) => {
        console.log(leadProducts, 'Order Home');

        let found = false;
        this.lead.leadProducts.forEach(data => {

          if (data.productInvId === input.productInvId) {
            found = true;
            data.active = true;
          } else {
            data.active = false;
          }
        });
        if (!found) {
          this.lead.leadProducts.push(
            { leadId: input.leadId, workflowId: input.workflowId, active: true, productInvId: input.productInvId });
        }
      });
  }


  onChange(value: any, attType: AttributeType, classObj: Class, Att?: any) {

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
            data.workflowId = this.WorkflowId;
            data.leadId = this.leadId;
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
            data.workflowId = this.WorkflowId;
            data.leadId = this.leadId;
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
            data.workflowId = this.WorkflowId;
            data.leadId = this.leadId;
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
            data.workflowId = this.WorkflowId;
            data.leadId = this.leadId;
            data.uploadDate = new Date();
            data.attributeTypeId = attType.attributeTypeId;
            attType.leadAttributeValue.push(data);
          }
        }
      }


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

  cancelarPropagacion(e) {
    if (e.target.tagName === 'INPUT') {
      e.preventDefault();
      e.returnValue = false;
      e.cancelBubble = true;
      return false;
    }
  }



  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  hasLeadProductActive() {
    for (const product in this.lead.leadProducts) {
      if (this.lead.leadProducts[product].active === true) {
        return true;
      }
    }
    return false;
  }

  printForm(formToPrint: LeadDocument) {
    this.formsService.generateFilledForm(this.lead.leadId, this.WorkflowId, formToPrint.leadDocumentId).subscribe((urlS: any) => {

      // const url = this.router.navigateByUrl(urlS);

      let url = urlS.excelUrl;
      if (urlS.pdfSuccess === true) {
        url = urlS.pdfUrl;
      }

      window.open(environment.api + url, '_blank');
    });
  }

  seeDetail(homeSelected: Home) {
    this.userService.showHideRightMenu(this.appConfig.rightMenu.productDetail);
    setTimeout(() => { this.productService.setSelectedHome(homeSelected); });
  }

  showModal(url: string, iframe: boolean) {
    this.userService.showModal(url, iframe);
  }

  showModalQualify() {

    this.userService.showModalQualify();
  }
}
