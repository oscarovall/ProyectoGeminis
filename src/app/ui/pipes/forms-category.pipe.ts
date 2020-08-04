import { DocCategory } from './../../models/crm/DocCategory';
import { Pipe, PipeTransform } from '@angular/core';
import { LeadDocument } from '../../models/crm/LeadDocument';

@Pipe({
  name: 'formsCategory'
})
export class FormsCategoryPipe implements PipeTransform {

  transform(leadDocs: LeadDocument[]): DocCategory[] {
    const categories: DocCategory[] = [];
    leadDocs.forEach((leadDoc: LeadDocument) => {
        let leadDocExist = false;
        categories.forEach((cat: DocCategory) => {
          if (cat.docCategoryId === leadDoc.docCategoryId) {
            cat.leadDocument.push(leadDoc);
            leadDocExist = true;
          }
        });

        if (!leadDocExist) {
          const newCat = leadDoc.docCategory;
          newCat.leadDocument = [];
          newCat.leadDocument.push(leadDoc);
          categories.push(newCat);
        }
    });

    console.log(categories);

    return categories;
  }

}
