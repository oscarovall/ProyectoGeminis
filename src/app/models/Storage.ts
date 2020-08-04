import { Lot } from './Lot';
export class Storage {

    public storageId: number;
    public name: string;
    public storeId: number;

    public lotList: Lot[];
    
    constructor() { }
}