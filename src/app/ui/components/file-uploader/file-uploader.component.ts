import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DocUploadComponent } from './doc-upload/doc-upload.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Attribute } from '../../../models/Attribute';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @Input() document: boolean;
  @Input() disabled: boolean;
  @Input() links: any;
  @Input() required: string;
  @Input('value') attributes: Attribute[];
  @Output() change = new EventEmitter<any>();
  type: boolean;
  documents = [];
  constructor(public docsDialog: MatDialog) { }

  ngOnInit() {
    this.type = this.document;
    this.documents = this.generateDocumentList(this.attributes);
  }

  uploadDocument(documentName, docInfo): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '368px';
    dialogConfig.data = {
      document: this.document,
      documentName: documentName
    };
    dialogConfig.scrollStrategy = new NoopScrollStrategy();

    const docRef = this.docsDialog.open(DocUploadComponent, dialogConfig);
    docRef.afterClosed().subscribe((result) => {
      console.log('result', result);

      if (result.ok) {
        const extention = result.fileName.split('.').pop();
        const URL = `https://aosp-userdata-test-virginia.s3.amazonaws.com/MHOT/userfolder/${docInfo.docName
          .replace(' ', '+')
          .replace(' ', '+')}.${extention}`;
        this.change.emit({ AttributeValue: URL, AttributeID: docInfo.AttributeID });
        this.documents = this.generateDocumentList(this.attributes);
      }
    });
  }
  generateDocumentList(valueList: Attribute[]) {
    const docList = [];
    valueList.forEach((value) => {
      let linkValue = '';
      let uploaded = false;
      let updateTime;
      this.links.forEach((link) => {
        if (link.attributeId === value.attributeId) {
          const dateObj = new Date(link.uploadDate);
          const month = dateObj.getUTCMonth() + 1; // months from 1-12
          const day = dateObj.getUTCDate();
          const year = dateObj.getUTCFullYear();
          updateTime = 'Uploaded ' + month + ' / ' + day + ' / ' + year;
          if (link.leadAttributeValue1) {
            linkValue = link.leadAttributeValue1;
          } else if (link.customerAttributeValue1) {
            linkValue = link.customerAttributeValue1;
          }
          uploaded = true;
        }
      });
      docList.push({
        name: value.value,
        uploaded: uploaded,
        position: value.position,
        attributeId: value.attributeId,
        link: linkValue,
        required: value.required,
        updateTime: updateTime
      });
    });
    return docList;
  }
}
