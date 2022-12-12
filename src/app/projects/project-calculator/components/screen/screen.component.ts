import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'calc-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  @Input() isError!: boolean;
  @Input() syntaxError!: boolean;
  @Input() mathError!: boolean;
  @Input() hypEnabled!: boolean;
  @Input() memoryEnabled!: boolean;
  @Input() memoryRecall!: boolean;
  @Input() charsToLeft!: boolean;
  @Input() charsToRight!: boolean;
  @Input() displayCharsInViewAsStringArray!: string[];
  @Input() cursorOnChar!: boolean;
  @Input() calculatedResult!: string;
  @Input() commas!: boolean[];
  @Input() decimals!: boolean[];
  @Input() isOverTenDigits!: boolean;
  @Input() x10PowerOf!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
