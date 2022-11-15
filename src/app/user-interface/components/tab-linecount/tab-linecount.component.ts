import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../../models/page.interface';

@Component({
  selector: 'app-tab-linecount',
  templateUrl: './tab-linecount.component.html',
  styleUrls: ['./tab-linecount.component.css']
})
export class TabLinecountComponent implements OnInit {

  @Input() openTabs: Page[] = [];

  counter(i: number): any[] {
    /* returns an array the size of provided number */
    return new Array(i);
  }

  underTen(i: number): boolean {
    /* returns true/false if provided number(an index) is less than zero-indexed ten*/
    return (i < 9);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
