import { Component, OnInit, ViewEncapsulation, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Page } from '../../models/page.interface';

@Component({
  selector: 'app-tab-headers',
  templateUrl: './tab-headers.component.html',
  styleUrls: ['./tab-headers.component.css'],
  encapsulation: ViewEncapsulation.None, /* to enable document.getElementByID() to return defined */
})
export class TabHeadersComponent implements OnInit {

  @Input() set viewTogglePosition(position: number) {
    this.viewPosition = position;
    /* calls method to set toggled view fill styles, following input view toggle changes */
    this.toggleViewFill();
  }
  @Input() set sidebarExpanded(expanded: boolean) {
    this.isSidebarExpanded = expanded;
    this.setTabHeight();
  }
  @Input() set openTabs(openTabs: Page[]) {
    this.openedTabs = [...openTabs];
    this.setTabHeight();
  }

  @Output() tabSelect: EventEmitter<Page> = new EventEmitter();
  @Output() tabClose: EventEmitter<Page> = new EventEmitter();
  @Output() tabDragStart: EventEmitter<number> = new EventEmitter();
  @Output() tabDragOverEnd: EventEmitter<Page> = new EventEmitter();
  @Output() tabDropEnd: EventEmitter<any> = new EventEmitter();
  @Output() tabDragLeave: EventEmitter<Page> = new EventEmitter();
  @Output() tabDragOver: EventEmitter<any> = new EventEmitter();
  @Output() tabReposition: EventEmitter<any> = new EventEmitter();
  @Output() viewToggle: EventEmitter<any> = new EventEmitter();

  private viewPosition!: number;
  private draggedTabID: number = 0;
  private droppedOnTabID: number = 0;
  public endDragged: boolean = false;

  public openedTabs: Page[] = [];
  public tabHeight: string = "40px";

  public pageFill: string = "#ffffff";
  public previewFill: string = "#ffffff";
  public isSidebarExpanded!: boolean;


  @HostListener("dragstart", ["$event"]) dragStart(event: any) {
    /* stores ID of tab at the start of the drag event */
    this.draggedTabID = event.target.id;
  }

  @HostListener("dragover", ["$event"]) dragOver(event: any) {
    /* retrieves and stores tabID, if dragged over a different tab + sets endDragged to false
    or sets the endDragged to true, if dragged over the empty tab header/container area */
    event.preventDefault();
    if(event.target.parentElement.parentElement.className == "tab unselected-tab"
    || event.target.parentElement.parentElement.className == "tab selected-tab") {
      let currentTabID = parseInt(event.target.parentElement.parentElement.id);
      if(currentTabID != this.droppedOnTabID) {
        this.droppedOnTabID = parseInt(event.target.parentElement.parentElement.id);
        let targetTabID: number = this.droppedOnTabID;
        let resetStatus: boolean = false;
        this.tabDragOver.emit({targetTabID, resetStatus});
      }
      this.endDragged = false;
    }
    if(event.target.parentElement.parentElement.parentElement.className == "tab unselected-tab"
    || event.target.parentElement.parentElement.parentElement.className == "tab selected-tab") {
      let currentTabID = parseInt(event.target.parentElement.parentElement.id);
      if(currentTabID != this.droppedOnTabID) {
        this.droppedOnTabID = parseInt(event.target.parentElement.parentElement.parentElement.id);
        let targetTabID: number = this.droppedOnTabID;
        let resetStatus: boolean = false;
        this.tabDragOver.emit({targetTabID, resetStatus});
      }
      this.endDragged = false;
    }
    if(event.target.parentElement.parentElement.parentElement.parentElement.className == "tab unselected-tab"
    || event.target.parentElement.parentElement.parentElement.parentElement.className == "tab selected-tab") {
      let currentTabID = parseInt(event.target.parentElement.parentElement.id);
      if(currentTabID != this.droppedOnTabID) {
        this.droppedOnTabID = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.id);
        let targetTabID: number = this.droppedOnTabID;
        let resetStatus: boolean = false;
        this.tabDragOver.emit({targetTabID, resetStatus});
      }
      this.endDragged = false;
    }
    if(event.target.className == "tab-container") {
      this.endDragged = true;
      let targetTabID: number = 0
      let resetStatus: boolean = this.endDragged;
      this.tabDragOver.emit({targetTabID, resetStatus});
    }
  }

  @HostListener("drop", ["$event"]) dragDrop(event: any) {
    /* calls service methods to reorder dragged/dropped tab in:
        - array of tabs, string of joined tabIDs in order
      && replaces new string of joined tabIDs in URL/location state */
    if(this.endDragged || this.droppedOnTabID > 0) {
      if(this.endDragged) {
        this.droppedOnTabID = 0;
        let draggedTabID = this.draggedTabID;
        this.tabDropEnd.emit({draggedTabID});
      }
      if(this.droppedOnTabID > 0) {
        let draggedTabID = this.draggedTabID;
        let droppedOnTabID = this.droppedOnTabID
        this.tabReposition.emit({draggedTabID, droppedOnTabID});
      }
    }
  }

  @HostListener("dragend", ["$event"]) dragEnd(event: any) {
    let targetTabID: number = 0
    let resetStatus: boolean = true;
    this.tabDragOver.emit({targetTabID, resetStatus});
    /* resets all properties used for each full drag&drop event cycle */
    this.endDragged = false;
    this.draggedTabID = 0;
    this.droppedOnTabID = 0;
  }

  @HostListener("dragleave",["$event"]) dragLeave(event: any) {
    let targetTabID: number = 0
    let resetStatus: boolean = true;
    this.tabDragOver.emit({targetTabID, resetStatus});
    /* resets drop target properties, if element is dragged outside of component element */
    this.endDragged = false;
    this.droppedOnTabID = 0;
  }

  constructor() { }

  ngOnInit(): void {}

  private toggleViewFill(): void {
    /* changes properties used for split-screen icon svg styling, depending on view toggle position */
    if(this.viewPosition == 0) {
      this.pageFill = "#239ef0";
      this.previewFill = "#239ef0";
      return;
    }
    if(this.viewPosition == 1) {
      this.pageFill = "#239ef0";
      this.previewFill = "#2e3138";
      return;
    }
    if(this.viewPosition == 2) {
      this.pageFill = "#2e3138";
      this.previewFill = "#239ef0";
      return;
    }
  }

  private setTabHeight(): void {
    /* checks if sum of tabs width exceeds container
    && updates binded style tab height property to accommodate scrollbar height */
    setTimeout(() => {
      let tabContainerViewWidth: any = document.getElementById("tabscontainer")?.clientWidth;
      let tabContainerInnerWidth: any = document.getElementById("tabscontainer")?.scrollWidth;
      let tabsOverflow: boolean = (tabContainerViewWidth < tabContainerInnerWidth);
      if(tabsOverflow) this.tabHeight = "34px";
      else if(!tabsOverflow) this.tabHeight = "40px";
    }, 1);
  }

  public handleToggle(): void {
    this.viewToggle.emit();
    /* emits event to toggle view position */
  }

  public selectTab(clickedTab: Page): void {
    /* emits clicked tab as an event */
    this.tabSelect.emit(clickedTab);
  }

  public closeTab(closedTab: Page): void {
    /* emits closed tab as an event */
    this.tabClose.emit(closedTab);
  }

}