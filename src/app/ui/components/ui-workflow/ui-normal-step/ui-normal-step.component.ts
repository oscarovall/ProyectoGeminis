import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../../../../models/workflow/Step';

@Component({
  selector: 'app-ui-normal-step',
  templateUrl: './ui-normal-step.component.html',
  styleUrls: ['./ui-normal-step.component.css']
})
export class UiNormalStepComponent implements OnInit {

  @Input() step: Step;

  constructor() { }

  ngOnInit() {
  }

}
