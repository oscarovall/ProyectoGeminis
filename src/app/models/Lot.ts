import { Product } from './crm/Product';
import { LotStatus } from './LotStatus';
export class Lot {

    public lotId: number;
    public lotNameId: string;
    public spacingStatusId: number;
    public storageId: number;
    public productId: number;

    public product: Product;
    public spacingStatus: LotStatus;

    constructor() { }
}