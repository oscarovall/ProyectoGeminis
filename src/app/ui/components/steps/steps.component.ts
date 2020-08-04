import { Component, OnInit, Input } from '@angular/core';
import { GroupStepOverview } from '../../../models/workflow/GroupStepOverview';

@Component({
  selector: 'steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  @Input() steps: GroupStepOverview[];

  constructor() { }

  ngOnInit() {
  }
}
