import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsService, UserService } from '../../../../services/service.index';
import { DocCategory } from '../../../../models/crm/DocCategory';
import { AppConfig } from '../../../../app.config';
import { AttributeType } from '../../../../models/AttributeType';
import { LeadDocument } from '../../../../models/crm/LeadDocument';
import { NgForm } from '@angular/forms';
import { CellDocumentAttributeType } from '../../../../models/crm/CellDocumentAttributeType';
import { MatSnackBar } from '@angular/material';
import { input } from 'aws-amplify';



@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  //@ViewChild('fileInput', null) fileInput: HTMLInputElement;
  @ViewChild('fileInput', null) fileInput: ElementRef<HTMLInputElement>;
  editar: LeadDocument = new LeadDocument();

  @ViewChild('fileButton', null) fileButton: HTMLButtonElement;

  @ViewChild('f', null) form: NgForm;



  getAllDocCategory: DocCategory[] = [];
  getAllAttributeType: AttributeType[] = [];
  leadDocument: LeadDocument[] = [];
  selectedDocument: LeadDocument = new LeadDocument();
  selectedCellDocumentAttributeType: CellDocumentAttributeType;
  addAttributeType: string[] = [];

  selectFile: any = File;
  cedula: number;

  cargando: boolean = true;
  positionRelation: number = 0;

  constructor(

    private router: Router,
    private _snackBar: MatSnackBar,
    public appConfig: AppConfig,
    public _formService: FormsService,
    private config: AppConfig,
    private usrService: UserService,) {

    this.usrService.selectedFormChanged.subscribe((resp: any) => this.getForm());
  }


  ngOnInit() {
    this.selectedDocument.cellDocumentAttributeType = [];
    this.selectedDocument.cellDocumentAttributeType.push(new CellDocumentAttributeType());
    //this.selectedCellDocumentAttributeType = this.selectedDocument.cellDocumentAttributeType[0];
    this.gettAllCategory();
    this.gettAllAttributeType();
    this.getForm();
  }


  gettAllCategory() {
    this.cargando = true;

    this._formService.getAllDocCategory()
      .subscribe((result: any) => {
        this.getAllDocCategory = result.results;

        this.cargando = false;
      });

  }

  //Nuevo
  sendNotification(message: string) {
    this._snackBar.open(message);
  }

  gettAllAttributeType() {
    this.cargando = true;

    this._formService.getAllAttributeTypes()
      .subscribe((result: any) => {

        this.getAllAttributeType = result;

        this.cargando = false;
      });
  }


  createForm() {

    let position = 0;
    let newDocument = {
      ...this.selectedDocument,
      cellDocumentAttributeType: this.selectedDocument.cellDocumentAttributeType.map(data => {
        const newResponse = [];
        data.attributeTypeId.forEach((at, index) => {
          newResponse.push({
            ...data,
            attributeTypeId: at,
            position: position
          });
          position++;
        });
        return newResponse;
      })
    };

    newDocument = {
      ...newDocument,
      cellDocumentAttributeType: newDocument.cellDocumentAttributeType.flat()
    };


    this._formService.createForm(newDocument)
      .subscribe((leadDocument: LeadDocument) => {
        this.selectedDocument.leadDocumentId = leadDocument.leadDocumentId;
        this.sendNotification('Created Form');
      });
  }

  terminateSave() {
    if (this.selectedDocument.leadDocumentId) {
      this.selectedDocument.leadDocumentId = null;
      this.usrService.hideRightMenu();
    }
  }

  // Nuevo
  onFileSelected(event) {
    this.selectFile = event.target.files[0]
  }

  // Nuevo
  uploadFile() {
    const fd = new FormData();
    fd.append('FormFile', this.selectFile)
    fd.append('LeadDocumentId', this.selectedDocument.leadDocumentId.toString())
    this._formService.uploadFiles(fd).subscribe(resultado => {

      this.terminateSave()
    });
  }

  getForm() {
    // console.log(this.usrService.selectedForm, 'prueba');
    if (this.usrService.selectedForm) {
      this.editar = this.usrService.selectedForm;
      this.selectedDocument.docCategoryId = this.editar.docCategoryId;
      this.selectedDocument.name = this.editar.name;


      let miarray: CellDocumentAttributeType[];
      let SegundoArray: CellDocumentAttributeType[];

      let group = this.editar.cellDocumentAttributeType.reduce((r, a) => {
        console.log("a", a);
        console.log('r', r);
        r[a.cell] = [...r[a.cell] || [], a];
        return r;
      }, {});


      miarray = Object.keys(group).map(function (personNamedIndex) {
        let person = group[personNamedIndex];
        return person;
      });


      this.editar.cellDocumentAttributeType = miarray;

      //miarray.push()
      let i = 0;

      //let arrayNumeros: number[];

      var miarrayFinal: CellDocumentAttributeType[] = [];
      var indice = 0;
      for (let obj of miarray) {

        var ObjetoUnico = new CellDocumentAttributeType();

        var arrayNumeros: number[] = [];

        for (let i in Object.keys(obj)) {

          let num: number = obj[i].attributeTypeId;
          arrayNumeros.push(num);
        }

        var celda: string = obj[0].cell;
        //console.log("celda-->", obj[0].cell)

        ObjetoUnico.cell = celda;
        ObjetoUnico.attributeTypeId = arrayNumeros;
        ObjetoUnico.position = indice;
        indice++;

        miarrayFinal.push(ObjetoUnico);
        //console.log("agrupadas propiedades--->", arrayNumeros);
      }

      this.selectedDocument.leadDocumentId = this.editar.leadDocumentId;

      this.selectedDocument.cellDocumentAttributeType = miarrayFinal;


      if (this.editar.leadDocumentId || this.editar.leadDocumentId === 0) {
        //this.tilte = 'Edit';
      } else {
        //this.tilte = 'Add';
      }
    } else {

    }
  }


  getFileButtonText() {
    return this.editar && this.editar.templateUrl ? 'FILE UPLOADED' : 'UPLOAD';
  }

  fileButtonClicked() {

    this.fileInput.nativeElement.click();
  }

  //Nuevo
  add() {
    let cellDocument = new CellDocumentAttributeType();
    this.selectedDocument.cellDocumentAttributeType.push(cellDocument);
    this.positionRelation++;

  }


  //Nuevo
  delete(index: number) {
    this.selectedDocument.cellDocumentAttributeType.splice(index, 1);
    this.positionRelation--;
  }

  addAttribute(i1) {

    if (!this.selectedDocument.cellDocumentAttributeType[i1].attributeTypeId) {
      this.selectedDocument.cellDocumentAttributeType[i1].attributeTypeId = [];
      this.selectedDocument.cellDocumentAttributeType[i1].attributeTypeId.push(0);
    } else {
      this.selectedDocument.cellDocumentAttributeType[i1].attributeTypeId.push(0);
    }
    this.selectedDocument.cellDocumentAttributeType[i1].attributeTypeId = this.selectedDocument.cellDocumentAttributeType[i1].attributeTypeId;

  }

  deleteAttribute(index: number, i: number) {
    this.selectedDocument.cellDocumentAttributeType[index].attributeTypeId.splice(i, 1);
    this.selectedDocument.cellDocumentAttributeType[index].attributeTypeId = this.selectedDocument.cellDocumentAttributeType[index].attributeTypeId;
  }

}

