import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PressedKey } from '../../models/pressed-key.interface';

@Component({
  selector: 'calc-arrow-button',
  templateUrl: './arrow-button.component.html',
  styleUrls: ['./arrow-button.component.css']
})
export class ArrowButtonComponent implements OnInit {

  @Input() arrowDisplayUp!: string;
  @Input() arrowDisplayLeft!: string;
  @Input() arrowDisplayRight!: string;
  @Input() arrowDisplayDown!: string;
  @Input() keyPresses!: PressedKey[];

  @Output() arrowButtonHover: EventEmitter<string> = new EventEmitter();
  @Output() arrowButtonClick: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public isKeyPressed(keyCode: string): boolean {
    /* loops through array of keyPress objects
      - if key provided matches a defined key, returns whether that is key is currently being pressed
      (used to set ngClass of button element to appear 'active') */
    for(let i: number = 0; i < this.keyPresses.length; i++) {
      if(keyCode === this.keyPresses[i].keyCode) {
        return this.keyPresses[i].isKeyPressed;
      }
    }
    return false;
  }

}
