import { Pipe, PipeTransform } from '@angular/core';
import { StepType } from '../../models/workflow/StepType';

//////////////////////////////////////////////////////////
// Group elements of the Workflow UI Page for the right menu
//////////////////////////////////////////////////////////
@Pipe({
  name: 'filterGroup'
})
export class FilterGroupPipe implements PipeTransform {

  transform(value: StepType[], additionl: string): StepType[] {
    let clasesTemp = [];
    clasesTemp = value.filter(element => element.setStepType === additionl && element.showMenu);

    return clasesTemp;
  }

}
