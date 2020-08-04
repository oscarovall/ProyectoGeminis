import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../models/Employee';
import { Store } from '../../models/Store';
import { AppConfig } from '../../app.config';

@Pipe({
  name: 'employeesStore'
})
export class EmployeesStorePipe implements PipeTransform {

  transform(employees: Employee[]): Store[] {
    const appConfig: AppConfig = new AppConfig();

    const stores: Store[] = [];
    employees.forEach((employee: Employee) => {
        let storeExist = false;
        stores.forEach((storesObj: Store) => {
          // if (employee.storeId) {
            if (storesObj.storeId === employee.storeId) {
              storesObj.employee.push(employee);
              storeExist = true;
            }
          // } else {
          //   if (storesObj.storeId == null && employee.storeId == null) {
          //     storesObj.employee.push(employee);
          //     storeExist = true;
          //   }
          // }
        });

        if (!storeExist) {
          // if (employee.store) {
            const newStore = employee.store;
            newStore.employee = [];
            newStore.employee.push(employee);
            stores.push(newStore);
          // } else {}
        }
    });

    console.log(stores);

    return stores;
  }

}
