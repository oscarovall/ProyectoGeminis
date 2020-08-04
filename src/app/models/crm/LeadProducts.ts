

import { Lead } from "./lead";
import { ProductInv } from "./ProductInv";


export class LeadProducts {

  workflowId: number;
  active: boolean;
  productInvId: number;
  leadId: number;

  public lead: Lead[];
  public productInv: ProductInv[];

  constructor() { }
}
