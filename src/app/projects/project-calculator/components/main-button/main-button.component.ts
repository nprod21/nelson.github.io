import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'calc-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.css']
})
export class MainButtonComponent implements OnInit {

  @Input() enabled!: boolean;
  @Input() set label(value: string) {
    this.buttonLabel = value.toLocaleUpperCase();
    // this.buttonClass += value.toLocaleLowerCase(); // unused in template
  };
  @Output() mainButtonClick: EventEmitter<string> = new EventEmitter();

  // public buttonClass: string = "key-"; // unused in template
  public buttonLabel!: string;

  constructor() { }

  ngOnInit(): void {
  }
  
}
