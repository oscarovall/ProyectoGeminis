import { Component, OnInit, Inject, Input, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UploadFileService } from '../../../../services/service.index';


@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.css']
})
export class DocUploadComponent implements OnInit {
  display: string = 'Upload file';
  displayClass: string = '';
  enable: boolean = false;
  message: string = '';
  constructor(
    public dialogRef: MatDialogRef<DocUploadComponent>,
    public ufs: UploadFileService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    if (this.data.document) {
      this.message = '*upload only .pdf or  Microsoft Word files, max file size 1MB';
    } else {
      this.message = '*upload only .jpg or .png images, max file size 1MB';
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadFile(file: File) {
    this.display = this.ufs.selectFile(file, this.data.document);
    //  console.log(this.data);
    if (this.display !== 'Upload file') {
      this.displayClass = 'displayName';
      this.enable = true;
    } else {
      this.displayClass = '';
      this.enable = false;
    }
  }
  sendFile() {
    this.ufs.uploadImagen(this.data.documentFolder, this.data.documentName).subscribe((result) => {
      if (result.ok) {
        this.dialogRef.close(result);
      }
    });
  }

  closeButton() {
    this.dialogRef.close();
  }

  templateChanged($event: any) {
    const value = $event.target.value;
  }
}
