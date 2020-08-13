import { CustomerAttributeValue } from './crm/CustomerAttributeValue';
import { Attribute } from './Attribute';
import { LeadAttributeValue } from './crm/LeadAttributeValue';
import { Class } from './Class';


export class AttributeType {

  public attributeTypeId: number;
  public name: string;
  public description: string;
  public dataTypeId: number;
  public attributeId: number;
  // public attributeTypeParentId: number;
  public classId: number;
  public length: number;
  public position: number;
  public disabled: boolean;
  public obligatory: boolean;
  public required: boolean;

  public attributeNavigation: Attribute;
  public attribute: Attribute[];
  public customerAttributeValue: CustomerAttributeValue[];
  public leadAttributeValue: LeadAttributeValue[] = [];
  public class: Class;

  // UI
  public valid: boolean = true;

  constructor() {}
}
