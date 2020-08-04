import { MatSnackBar } from '@angular/material';
import { Template } from './../../../models/Template';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateContent } from '../../../models/TemplateContent';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { AppConfig } from '../../../app.config';
import { QuillEditorComponent } from 'ngx-quill';
import { AttributeType } from '../../../models/AttributeType';
import { ClassesService, TemplatesService } from '../../../services/service.index';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styles: []
})
export class EmailComponent implements OnInit {

  templates: Template[] = [];
  emailTemplates: Template[] = [];
  textTemplates: Template[] = [];
  selectedSmsTemplateId: number = null;
  selectedTemplate: Template = null;
  selectedTemplateContent: TemplateContent;
  selectedTemplatePos: number;
  selectedLanguage: string;
  selectedChannel: string = null;
  placeholder = 'Add the code here';
  viewCode = false;
  title: string = '';
  newTemplate = true;
  loading: boolean = true;
  viewChannels: boolean = true;
  @ViewChild('TextCode', null) textCode;

  templatesToUpdate: Template[];
  attributeTypes: AttributeType[];
  caretPos: number = 0;

  dateMill = 0;

  constructor(
    private tService: TemplatesService,
    private sanitizer: DomSanitizer,
    public appConfig: AppConfig,
    private _snackBar: MatSnackBar,
    private classesService: ClassesService) {
    this.selectedLanguage = this.appConfig.languages.english;
    this.dateMill = new Date().getTime();
    this.selectedChannel = appConfig.templates.email;
  }

  ngOnInit() {
    this.getAllTemplates();
    this.classesService.getAttributeTypes().subscribe((at: AttributeType[]) => {
      this.attributeTypes = at;
    });
  }

  getAllTemplates() {
    this.tService.getEmailTemplates().subscribe((res) => {
      this.emailTemplates = res.results;
      this.loading = false;
    });

    this.tService.getTextMessageTemplates().subscribe((res) => {
      this.textTemplates = res.results;
      this.loading = false;
    });
  }

  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  viewCodeF() {
    this.viewCode = !this.viewCode;
  }

  selectTemplate(template: Template, i: number) {
    this.selectedTemplatePos = i;
    this.newTemplate = true;
    this.title = 'Edit Template';

    if (this.selectedTemplate) {
      this.selectedTemplate.selected = false;
    }

    template.selected = true;
    this.selectedTemplate = template;

    this.evaluateLanguage();
  }

  selectSmsTemplate() {
    this.selectedTemplatePos = this.textTemplates.findIndex(t => t.templateId === this.selectedSmsTemplateId);
    const tSelected = this.textTemplates.find(t => t.templateId === this.selectedSmsTemplateId);
    this.newTemplate = true;
    this.title = 'Edit Template';
    if (this.selectedTemplate) {
      this.selectedTemplate.selected = false;
    }

    this.selectedTemplate = tSelected;
    this.selectedTemplate.selected = true;
    this.evaluateLanguage();
  }

  evaluateLanguage() {
    this.selectedTemplate.templateContent.forEach((tc: TemplateContent) => {
      if (tc.language === this.selectedLanguage) {
        this.selectedTemplateContent = tc;
      }
    });
  }

  // onEditorCreated(event) {
  //   this.editor = event;
  // }

  addString(idx, str) {
    return this.selectedTemplateContent.contentText.slice(0, idx) + str + this.selectedTemplateContent.contentText.slice(idx);
  }

  addVariable(event) {
    event = Number.parseInt(event, 10);

    // if(!this.viewCode)
    this.attributeTypes.forEach((attType: AttributeType) => {
      if (attType.attributeTypeId === event) {
        let textTOInsert = 'hey';
        textTOInsert = '<%' + event + '%' + attType.name + '%>';
        this.selectedTemplateContent.contentText = this.addString(this.caretPos, textTOInsert);
      }
    });
  }

  changeLanguage(event) {

    this.evaluateLanguage();
  }

  changeChannel(event) {
   
    this.selectedTemplate = null;
    this.selectedSmsTemplateId = null;
    this.viewChannels = false;
  }

  deleteTemplate() {
    if (this.selectedTemplate && this.selectedTemplate.templateId) {
      this.tService.deleteTemplate(this.selectedTemplate).subscribe(() => {
        this.sendNotification('Template deleted');
      });
    } else {
      this.sendNotification('Template deleted');
    }
    if (this.selectedChannel === this.appConfig.templates.email) {
      this.emailTemplates.splice(this.selectedTemplatePos, 1);
    } else {
      this.textTemplates.splice(this.selectedTemplatePos, 1);
    }
  }

  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart === '0') {
      this.caretPos = oField.selectionStart;

    }
  }

  saveTemplate() {
    this.loading = true;
    if (this.selectedTemplate.templateId) {
      this.tService.updateTemplate(this.selectedTemplate).subscribe((template: Template) => {
        this.generatePreview();
        this.sendNotification('Template updated');
      });
    } else {
      this.tService.createTemplate(this.selectedTemplate).subscribe((template: Template) => {
        this.selectedTemplate.templateId = template.templateId;
        this.sendNotification('Template created');
        this.generatePreview();
      });
    }

  }

  generatePreview() {
    if (this.selectedChannel === this.appConfig.templates.email) {
      this.tService.generatePreview(this.selectedTemplate).subscribe((resp) => {
        this.sendNotification('Preview generated');
       /*  this.selectedTemplate = null;
        this.selectedTemplateContent = null; */
        this.getAllTemplates();
      });
    } else {
      this.getAllTemplates();
    }
  }

  addTemplate() {
    const newTemplate = new Template();
    newTemplate.templateContent = [];
    newTemplate.channelType = (this.selectedChannel === this.appConfig.templates.email) ? this.appConfig.channelType.email : this.appConfig.channelType.textMessage;

    const eContent = new TemplateContent();
    eContent.language = this.appConfig.languages.english;
    eContent.contentText = '';
    newTemplate.templateContent.push(eContent);

    const sContent = new TemplateContent();
    sContent.language = this.appConfig.languages.spanish;
    sContent.contentText = '';
    newTemplate.templateContent.push(sContent);

    this.title = 'New Template';

    if (this.selectedChannel === this.appConfig.templates.email) {
      this.emailTemplates.push(newTemplate);
      this.selectTemplate(newTemplate, this.emailTemplates.length - 1);
    } else {
      this.textTemplates.push(newTemplate);
      this.selectTemplate(newTemplate, this.textTemplates.length - 1);
    }
  }

  byPassHTML(html: string) {
    if (this.selectedTemplate && this.selectedTemplate.templateContent) {
      return this.sanitizer.bypassSecurityTrustHtml(this.selectedTemplate.templateContent[0].contentText);
    }
  }

}
