import { Class } from './Class';

export class ObjectType {

  objectTypeId: number;
  name: string;
  description: string;
  showWorkflow: boolean;

  class: Class[];

  constructor () {}
}
