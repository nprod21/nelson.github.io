import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Page } from '../../models/page.interface';
@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  @Input() set sidebarExpanded(expanded: boolean) {
    this.expanded = expanded;
    this.setExplorerIconFill();
  }

  @Input() set allPages(pages: Page[]) {
    this.pages = pages;
  }

  @Output() toggleFolderPage: EventEmitter<Page> = new EventEmitter();

  @Output() toggleSidebarExpanded: EventEmitter<any> = new EventEmitter();

  @Output() selectPage: EventEmitter<Page> = new EventEmitter();

  public pages: Page[] = [];
  public expanded: boolean =  true;
  public explorerIconFill: string = "#ffffff";

  constructor() { }

  ngOnInit(): void {}

  private setExplorerIconFill(): void {
    /* sets the explorer icon fill color to indicate expanded/collapsed sidebar,
        depending on current status */
    if(this.expanded) this.explorerIconFill = "#ffffff";
    else this.explorerIconFill = "#808080";
  }

  public toggleFolder(page: Page): void {
    /* calls service method to toggle the opening/closing of provided folder page */
    this.toggleFolderPage.emit(page);
  }

  public toggleSidebar(): void {
    /* calls method to expand/collapse sidebar menu - done via event emitter as status shared
    &&  calls method to set the explorer icon fill color to indicate expanded/collapsed sidebar*/
    this.toggleSidebarExpanded.emit();
    this.setExplorerIconFill();
  }

  public collapseSidebar(): void {
    /* calls method to collapse sidebar menu - done via event emitter as status shared
      && calls method to set the explorer icon fill color to indicate collapsed sidebar*/
    this.toggleSidebar();
  }

  public fillExplorerIcon(): void {
    /* sets explorer icon fill on mouseenter, if sidebar collapsed
    (for hover effect) */
    if(!this.expanded) this.explorerIconFill = "#ffffff";
  }

  public unfillExplorerIcon(): void {
    /* resets explorer icon fill on mouseleave, if sidebar collapsed 
    (for hover effect) */
    if(!this.expanded) this.explorerIconFill = "#808080";
  }

  public onSelect(page: Page): void {
    this.selectPage.emit(page);
  }

}
