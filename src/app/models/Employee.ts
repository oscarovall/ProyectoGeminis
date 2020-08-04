import { Store } from './Store';
import { EmployeeEmployeeTeam } from './EmployeeEmployeeTeam';
import { Role } from './Role';
export class Employee {

  public employeeId: number;
  public email: string;
  public roleId: number;
  public imageUrl: string;
  public name: string;
  public lastLogin: Date;
  public cellphone: string;
  public storeId: number;
  public active: boolean;
  public employeeStatusId: string;

  public store: Store;
  public role: Role;
  public employeeEmployeeTeamTeamOwner: EmployeeEmployeeTeam[];
  public employeeEmployeeTeamTeamMember: EmployeeEmployeeTeam[];

  // Security
  public password: string;
  public password2: string;

  constructor() {}
}
