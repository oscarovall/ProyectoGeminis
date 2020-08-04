

import { DocCategory } from './DocCategory';
import { CellDocumentAttributeType } from './CellDocumentAttributeType';



export class LeadDocument {

  leadDocumentId: number;
  name: string;
  docCategoryId: number;
  previewUrl: string;
  templateUrl: string;

  cellDocumentAttributeType: CellDocumentAttributeType[];
  docCategory: DocCategory;

  constructor() { }
}

