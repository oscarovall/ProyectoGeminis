import { LeadProdOption } from './LeadProdOption';

export class ProdOption {

  optionId: number;
  name: string;
  defaultPrice: number;

  leadProdOption: LeadProdOption[];

  constructor() {
    this.leadProdOption = [new LeadProdOption()];
  }

}
