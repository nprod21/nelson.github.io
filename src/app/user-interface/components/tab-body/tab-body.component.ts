import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Page } from '../../models/page.interface';

@Component({
  selector: 'app-tab-body',
  templateUrl: './tab-body.component.html',
  styleUrls: ['./tab-body.component.css'],
  encapsulation: ViewEncapsulation.None /* to enable innerHTML classes to reference stylesheet */
})
export class TabBodyComponent implements OnInit {

  @Input() set openTabs(tabs: Page[]){
    this.openPages = tabs;
  };

  public openPages: Page[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}