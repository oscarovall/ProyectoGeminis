import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../../app.config';
import { FormsService, UserService } from '../../../services/service.index';
import { LeadDocument } from '../../../models/crm/LeadDocument';
import { CellDocumentAttributeType } from '../../../models/crm/CellDocumentAttributeType';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  getAll: LeadDocument[] = [];
  cargando: boolean = true;
  selectedDocument: LeadDocument = new LeadDocument();
  leadDocumentId: number;

  constructor(
    private router: Router,
    public appConfig: AppConfig,
    public _formService: FormsService,
    private config: AppConfig,
    private usrService: UserService,) {
    this.usrService.selectedFormChanged.subscribe((selectedForm: LeadDocument) => this.gettAll());
  }


  ngOnInit() {

    this.gettAll();
  }

  gettAll() {
    this.cargando = true;

    this._formService.getAllForms()
      .subscribe((result: any) => {
        this.getAll = result.results;

        this.cargando = false;
      });

  }


  addNewForm() {
    const newForm = new LeadDocument();
    newForm.cellDocumentAttributeType = [];
    newForm.cellDocumentAttributeType.push(new CellDocumentAttributeType());

    this.usrService.setSelectedForm(newForm);
    this.usrService.showHideRightMenu(this.config.rightMenu.form);
  }


  edit(form: LeadDocument) {
    this.usrService.setSelectedForm(form);
    this.usrService.showHideRightMenu(this.config.rightMenu.form);
  }

  delete(leadDocumentId: number, index: number) {

    Swal.fire({
      title: '¿Are you sure?',
      html: 'You are about to delete the Form',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true
    })
      .then((borrar: any) => {

        if (borrar) {
          this._formService.deleteForm(leadDocumentId).
            subscribe(resp => {
              this.getAll.splice(index, 1);
            });
        } else {
          return [];
        }
      })
  }
}
