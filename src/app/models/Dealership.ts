import { Employee } from './Employee';
export class Dealership {

    public storeId: number;
    public name: string;
    public phoneNumber: string;
    public address: string;
    public zip: string;
    public county: String;
    public city: string;
    public state: string;
    public fax: string;
    public license: string;

    public storeMemberList: Employee[];
    public storageList: Storage[];

    constructor() {}
  }
