import { Employee } from './Employee';
import { RolePermission } from './RolePermission';
import { Step } from './workflow/Step';
export class Role {

  roleId: number;
  role1: string;
  shortRole: string;

  employee: Employee[];
  rolePermission: RolePermission[];
  step: Step[];

  constructor() {}

  
}
