import { ProductImg } from './ProductImg';


export class Product {

  name: string;
  price: number;
  productStatusId: number;
  active: boolean;
  nameId: string;
  year: number;
  sqft: number;
  bed: number;
  bath: number;
  boxWide: number;
  boxLong: number;
  boxWide2: number;
  boxLong2: number;
  weight: number;
  weight2: number;
  manufacturerId: number;
  typeWide: string;
  productId: number;
  windZone: number;
  floorplanUrl: string;
  _3dTourUrl: string;
  iconUrl: string;
  featureHome: boolean;
  moveInReady: boolean;
  thermalZone: number;
  roofLoadZone: number;
  floorRValue: number;
  wallsRValue: number;
  ceilingRValue: number;
  floorThickness: number;
  wallsThickness: number;
  ceilingThickness: number;
  floors: number;
  store: string;
  details: string;
  mainProductImg: ProductImg;

  manufacturer: any;
  productImg: ProductImg[];

  constructor() { }
}