import { Storage } from './Storage';
import { Product } from './crm/Product';
import { LotStatus } from './LotStatus';
export class Location {

    public lotId: number;
    public storageId: number;
    public spacingStatusId: number;
    public lotNameId: string;
    public productId: number;
    public location: string;

    public product: Product;
    public spacingStatus: LotStatus;
    public storage: Storage;

    constructor() { }
}