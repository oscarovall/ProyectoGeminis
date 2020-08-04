import { MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Template } from '../../../../models/Template';
import { AppConfig } from '../../../../app.config';
import { NgForm } from '@angular/forms';
import { TemplatesService } from '../../../../services/templates/templates.service';
import { CustomerService } from '../../../../services/customer/customer.service';
import { Customer } from '../../../../models/crm/Customer';

import { UserService } from '../../../../services/user/user.service';
import { EmailNotification } from '../../../../models/EmailNotication';
import { TextMessageNotification } from '../../../../models/TextMessageNotification';
import { TemplateContent } from '../../../../models/TemplateContent';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Lead } from '../../../../models/crm/lead';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  @ViewChild('f', null) form: NgForm;


  // email
  emailTemplates: Template[] = [];
  selectedTemplate: Template = null;
  selectedLanguageEmail: string = null;
  customTextEmail: string;
  emailNotification: EmailNotification;
  requiredFieldsDone = false;

  // sms
  textTemplates: Template[] = [];
  selectedTextTemplate: Template = null;
  selectedLanguageText: string = null;
  requiredFieldsSmsDone = false;
  customText: string;
  textMessageNotification: TextMessageNotification;

  selectedCustomer: Customer;
  selectedLead: Lead;
  wasValidated = false;
  constructor(
    public appConfig: AppConfig,
    private tService: TemplatesService,
    private customerService: CustomerService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal
  ) {
    this.getAllTemplates();
    this.emailNotification = new EmailNotification();
    this.textMessageNotification = new TextMessageNotification();
  }

  ngOnInit() {
    this.customerService.selectedCustomerChanged.subscribe((selectedCustomer: Customer) => {
      this.selectedCustomer = selectedCustomer;
      this.initValues();
      console.log('selectedCustomer', this.selectedCustomer);
    });

    this.customerService.selectedLeadChanged.subscribe((selectedLead: Lead) => {
      this.selectedLead = selectedLead;
      this.initValues();
      console.log('selectedLead', this.selectedLead);
    });
  }

  initValues() {
    this.selectedTemplate = null;
    this.selectedTextTemplate = null;
    this.selectedLanguageEmail = null;
    this.selectedLanguageText = null;
    this.customTextEmail = null;
    this.customText = null;
    this.requiredFieldsDone = false;
  }

  getAllTemplates() {
    this.tService.getEmailTemplates().subscribe((res) => {
      this.emailTemplates = res.results;
      console.log('Email Templates', this.emailTemplates);
    });

    this.tService.getTextMessageTemplates().subscribe((res) => {
      this.textTemplates = res.results;
      console.log('Text Message Templates', this.textTemplates);
    });
  }

  viewPreview() {
    this.selectedTemplate.templateContent.forEach((tc: TemplateContent) => {
      if (tc.language === this.selectedLanguageEmail) {
        // this.customText = tc.contentText;
        console.log('preview', tc.url);
        this.userService.showModal(tc.url, false);
      }
    });
  }

  validateFormEmail() {
    if (!this.selectedTemplate || !this.selectedLanguageEmail) {
      this.requiredFieldsDone = false;
    } else {
      this.requiredFieldsDone = true;
    }
  }

  validateFormSms() {
    if (!this.selectedTextTemplate || !this.selectedLanguageText) {
      this.requiredFieldsSmsDone = false;
    } else {
      this.requiredFieldsSmsDone = true;
      this.evaluateLanguage();
    }
  }

  evaluateLanguage() {
    this.selectedTextTemplate.templateContent.forEach((tc: TemplateContent) => {
      if (tc.language === this.selectedLanguageText) {
        this.customText = tc.contentText;
      }
    });
  }

  sendNotificationEmail() {
    let isValid = true;
    if (!this.selectedTemplate || !this.selectedLanguageEmail) {
      isValid = false;
    }
    if (this.selectedCustomer) {
      this.emailNotification.customerId = this.selectedCustomer.customerId;
    }
    if (this.selectedLead) {
      this.emailNotification.leadId = this.selectedLead.leadId;
      this.emailNotification.workflowId = this.selectedLead.workflowId;
    }

    if (isValid) {
      this.emailNotification.templateId = this.selectedTemplate.templateId;
      this.emailNotification.language = this.selectedLanguageEmail;
      this.emailNotification.customText = this.customTextEmail;
      console.log('emailNotification->', this.emailNotification);
      this.tService.sendEmail(this.emailNotification).subscribe((res) => {
        this.sendNotification('Email Sended');
        this.userService.hideRightMenu();
        this.incrementEmail();
      });
    }
  }

  sendNotificationSms() {
    let isValid = true;
    if (!this.selectedTextTemplate || !this.selectedLanguageText) {
      isValid = false;
    }

    if (isValid) {
      this.textMessageNotification.phoneNumber = this.selectedCustomer.mobileNum;
      this.textMessageNotification.message = this.customText;
      this.textMessageNotification.typeMessage = 'Promotional';
      console.log('sendSms->', this.textMessageNotification);
      this.tService.sendTextMessage(this.textMessageNotification).subscribe((res) => {
        this.userService.hideRightMenu();
        this.sendNotification('Text Message Sended');
        this.incrementEmail();
      });
    }
  }

  incrementEmail() {
    this.tService.setIncrementEmail(this.selectedCustomer.customerId).subscribe((res) => {
      console.log('ok');
    });
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

}
