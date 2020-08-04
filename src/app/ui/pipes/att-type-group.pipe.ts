import { Pipe, PipeTransform } from '@angular/core';
import { AttributeType } from '../../models/AttributeType';
import { AppConfig } from '../../app.config';
import { Class } from '../../models/Class';

@Pipe({
  name: 'attTypeGroup'
})
export class AttTypeGroupPipe implements PipeTransform {

  transform(attTypes: AttributeType[]): Class[] {
    const appConfig: AppConfig = new AppConfig();

    attTypes = attTypes.filter(at => {
      return appConfig.dataType.NoList.includes(at.dataTypeId) ? true : false;
    });
    // console.log('Pipe attTypes', attTypes);

    const classes: Class[] = [];
    attTypes.forEach((attType: AttributeType) => {
        let classExist = false;
        classes.forEach((classObj: Class) => {
          if (classObj.classId === attType.classId) {
            classObj.attributeType.push(attType);
            classExist = true;
          }
        });

        if (!classExist) {
          const newClass = attType.class;
          newClass.attributeType = [];
          newClass.attributeType.push(attType);
          classes.push(newClass);
        }
    });

    // console.log(classes);

    return classes;
  }

}
