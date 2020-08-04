import { environment } from './../../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Class } from '../../models/Class';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AttributeType } from '../../models/AttributeType';
import { AppConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  public classes: Class[];
  public updateClasses: EventEmitter<Class[]> = new EventEmitter();

  constructor(private http: HttpClient, private appConfig: AppConfig) {
    if (!this.classes) {
      this.getClassesServer().subscribe((classes: Class[]) => {
        this.classes = classes;
        this.updateClasses.emit(this.classes);
        console.log('Classes:', this.classes);
      });
    }
  }


  ////////////////////////////////////////////
  //   CLASSES
  ////////////////////////////////////////////
  getClassesServer() {
    return this.http.get<Class[]>(`${environment.api}Classes`)
      .pipe(
        // map( (workflows: Workflow[]) => {
        //   workflows.forEach(workflow => {
        //     this.getGroupStepOverviewsForWorkflow(workflow.workflowId)
        //     .subscribe((groups: GroupStepOverview[]) => workflow.groupStepOverview = groups);
        //   });
        //   console.log('Workflows', workflows);
        //   return workflows;
        // }),
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting Classes',
            text: err.message
          });
          return [];
        })
      );
  }


  ////////////////////////////////////////////
  //   ATTRIBUTE TYPES
  ////////////////////////////////////////////
  getAttributeTypes() {
    return this.http.get<AttributeType[]>(`${environment.api}AttributeTypes`)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting AttributeTypes',
            text: err.message
          });
          return [];
        })
      );
  }

  ////////////////////////////////////////////
  //   ATTRIBUTE TYPES CREATION
  ////////////////////////////////////////////
  getAttributeTypesCreation() {
    return this.http.get<AttributeType[]>(`${environment.api}AttributeTypes/creation`)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting AttributeType for creating customer',
            text: err.message
          });
          return [];
        })
      );
  }

  getAttributeTypesSearch() {
    return this.http.get<AttributeType[]>(`${environment.api}AttributeTypes/search`)
      .pipe(
        catchError(err => {
          Swal.fire({
            icon: 'error',
            title: 'Error when getting AttributeType to search',
            text: err.message
          });
          return [];
        })
      );
  }
}
