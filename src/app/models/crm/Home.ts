
import { ProductInv } from './ProductInv';



export class Home extends ProductInv {

  storeName: string;
  selected: boolean;
  mainIconUrl: string;
  readyToMove: boolean;
  productInvId: number;

  optionsPrice: number = 0;
  disabled = true;

  productStatus;
  manufacturer;
}
