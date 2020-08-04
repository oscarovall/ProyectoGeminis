import { Role } from './Role';
import { RolePage } from './RolePage';
export class RolePermission {

  public roleId: number;
  public rolePageId: number;
  public permission: string;

  public role: Role;
  public rolePage: RolePage;

  constructor() {}
}
