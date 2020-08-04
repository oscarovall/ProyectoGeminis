import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  // Upload Images
  fileUpload: File;
  tempFile: string;
  imagenInicial: string;

  uploadPercent$: Observable<number>;
  downloadUrl$: Observable<string>;
  loaded: EventEmitter<boolean>;

  constructor(private http: HttpClient, private router: Router, private config: AppConfig) {
    this.loaded = new EventEmitter();
  }

  uploadImagen(folder: string, idElement: number) {
    const formData = new FormData();
    //  console.log(this.fileUpload);
    formData.append('file', this.fileUpload, this.fileUpload.name);
    //  console.log(formData);
    const url = environment.api + `Upload/${folder}/${idElement}`;
    return this.http.post(url, formData, { reportProgress: true, observe: 'events' }).pipe(
      map((resp: any) => {
        //      console.log(resp);
        if (resp.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'successfully uploaded',
            showConfirmButton: false,
            timer: 1500
          });
        }
        resp.fileName = this.fileUpload.name;
        return resp;
      }),
      catchError((err: any) => {
        //     console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error at upload the file',
          text: `The file wasn't uploaded! ` + err.message
        });
        return [];
      })
    );
  }

  selectFile(file: File, document: boolean) {
    if (!file) {
      this.fileUpload = null;
      return;
    }
    console.log(file.type);
    if (document) {
      if (file.type.indexOf('document') < 0 && file.type.indexOf('pdf') < 0) {
        Swal.fire({
          title: 'Only Documents',
          text: 'The selected file is not supported',
          icon: 'error'
        });
        this.fileUpload = null;
        return 'Upload file';
      }
    } else {
      if (file.type.indexOf('image') < 0) {
        Swal.fire({
          title: 'Only images',
          text: 'The selected file is not supported',
          icon: 'error'
        });
        this.fileUpload = null;
        return 'Upload file';
      }
    }
    if (file.size > 1024 * 800) {
      Swal.fire({
        title: 'The file is too big',
        text: 'The file is over 800 kb',
        icon: 'error'
      });
      this.fileUpload = null;
      return 'Upload file';
    }
    this.fileUpload = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.tempFile = reader.result.toString();
      this.loaded.emit(true);
    };
    return file.name;
  }
}
