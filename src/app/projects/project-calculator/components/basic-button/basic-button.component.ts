import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CalcButton } from '../../models/calc-button.interface';
import { PressedKey } from '../../models/pressed-key.interface';

@Component({
  selector: 'calc-basic-button',
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.css'],
  encapsulation: ViewEncapsulation.None /* to enable innerHTML classes to reference stylesheet */
})
export class BasicButtonComponent implements OnInit {

  @Input() basicButton !: CalcButton;
  @Input() keyPresses!: PressedKey[];

  @Output() basicButtonClick: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public isKeyPressed(keyCode: string): boolean {
    /* loops through array of keyPress objects
      - if key provided matches a defined key, returns whether that is key is currently being pressed
      (used to set ngClass of button element to appear 'active') */
    if(keyCode == "delete") keyCode = "Backspace";
    if(keyCode == "ac") keyCode = "Clear";
    if(keyCode == "multiple") keyCode = "*";
    if(keyCode == "divide") keyCode = "/";
    if(keyCode == "add") keyCode = "+";
    if(keyCode == "subtract") keyCode = "-";
    if(keyCode == "decimal") keyCode = ".";
    if(keyCode == "equals") keyCode = "=";

    for(let i: number = 0; i < this.keyPresses.length; i++) {
      if(keyCode === this.keyPresses[i].keyCode) {
        // swaps keyCode to alternative key intended to delete, to double check
        if(keyCode == "Backspace" && !this.keyPresses[i].isKeyPressed) {
          keyCode = "Delete";
        }
        else return this.keyPresses[i].isKeyPressed;
      }
    }
    return false;
  }

}
