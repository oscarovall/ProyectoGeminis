import { Location } from './../Location';
import { ProductInvAvailableStatus } from "./ProductInvAvailableStatus";
import { ProductInvImg } from "./ProductInvImg";
import { AddOnsInv } from "./AddOnsInv";
import { ProductInvUsedStatus } from './ProductInvUsedStatus';
import { Lot } from '../Lot';



export class ProductInv {

  productInvId: number;
  details: string;
  name: string;
  readyToMove: boolean;
  price: number;
  productStatusId: number;
  nameId: string;
  year: number;
  sqft: number;
  bed: number;
  bath: number;
  boxWide: number;
  boxLong: number;
  manufacturerId: number;
  typeWide: string;
  floorplanUrl: string;
  _3dTourUrl: string;
  windZone: number;
  featureHome: boolean;
  iconUrl: string;
  productInvUsedStatusId: number;
  productInvAvStatusId: number;
  hudNum: string;
  hudNum2: string;
  serialNum: string;
  serialNum2: string;
  rsoOrderNum: string;
  moveInReady: boolean;
  estOffline: string;
  discount: number;
  buyingPrice: string;
  addOnsPrice: number;
  mainIconUrl: string;

  public productInvAvailableStatus: ProductInvAvailableStatus[];
  public productInvImg: ProductInvImg[];
  public addOnsInv: AddOnsInv[];
  public productInvUsedStatus: ProductInvUsedStatus;
  public lot: Location;

  constructor() { }
}
