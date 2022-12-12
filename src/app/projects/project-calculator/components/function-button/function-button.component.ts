import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

import { CalcButton } from '../../models/calc-button.interface';

@Component({
  selector: 'calc-function-button',
  templateUrl: './function-button.component.html',
  styleUrls: ['./function-button.component.css'],
  encapsulation: ViewEncapsulation.None /* to enable innerHTML classes to reference stylesheet */
})
export class FunctionButtonComponent implements OnInit {

  @Input() functionButton!: CalcButton;

  @Output() functionButtonClick: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
