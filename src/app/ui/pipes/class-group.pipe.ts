import { Pipe, PipeTransform } from '@angular/core';
import { GroupStepOverview } from '../../models/workflow/GroupStepOverview';
import { Class } from '../../models/Class';
import { ObjectType } from '../../models/ObjectType';


//////////////////////////////////////////////////////////
// Filter if the Groups already exist on another array
//////////////////////////////////////////////////////////
@Pipe({
  name: 'classGroup'
})
export class ClassGroupPipe implements PipeTransform {

  transform(classes: Class[]): ObjectType[] {
    const objectTypes: ObjectType[] = [];
    classes.forEach((classObj: Class) => {
      let objTypeExist = false;
      objectTypes.forEach((objectType: ObjectType) => {
        if (objectType.objectTypeId === classObj.objectTypeId) {
          objectType.class.push(classObj);
          objTypeExist = true;
        }
      });

      if (!objTypeExist && classObj.objectType.showWorkflow) {
        const objTypeNew = classObj.objectType;
        objTypeNew.class = [];
        objTypeNew.class.push(classObj);
        objectTypes.push(objTypeNew);
      }

    });

    console.log(objectTypes);

    return objectTypes;
  }

}
