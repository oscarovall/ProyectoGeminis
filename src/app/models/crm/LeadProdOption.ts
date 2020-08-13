import { Lead } from './lead';
import { ProdOption } from './ProdOption';


export class LeadProdOption {

  leadId: number;
  workflowId: number;
  optionId: number;
  included: string;
  price: number;

  lead: Lead;
  option: ProdOption;

  constructor() {}

}
