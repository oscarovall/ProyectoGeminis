import { TemplateContent } from './TemplateContent';
import { Lead } from './crm/lead';

export class Template {
  public templateId: number;
  public name: string;
  public channelType: string;
  public url: string;

  public templateContent: TemplateContent[];

  // UI
  public selected = false;
  public lead: Lead;

  constructor() {}
}
