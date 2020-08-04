import { Employee } from './Employee';
export class Store {

    public storeId: number;
    public name: string;
    public phoneNumber: string;
    public address: string;
    public zip: string;
    public country: Date;
    public city: string;
    public state: string;
    public storage: Array<any>;

    public employee: Employee[];

    constructor() {}
  }
