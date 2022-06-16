import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TabService } from '../tab.service';

@Component({
  selector: 'app-tab-body',
  templateUrl: './tab-body.component.html',
  styleUrls: ['./tab-body.component.css'],
  encapsulation: ViewEncapsulation.None /* to enable innerHTML classes to reference stylesheet */
})
export class TabBodyComponent implements OnInit {

  public openPages = this.tabService.getTabs();

  constructor(
    private tabService: TabService
  ) { }

  ngOnInit(): void {
  }

}