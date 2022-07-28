import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Page } from '../pages';

import { TabService } from '../tab.service';
import { RouteService } from '../route.service';
import { HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-headers',
  templateUrl: './tab-headers.component.html',
  styleUrls: ['./tab-headers.component.css'],
  encapsulation: ViewEncapsulation.None, /* to enable document.getElementByID() to return defined */
})
export class TabHeadersComponent implements OnInit, OnDestroy {

  private viewToggleSub!: Subscription;
  private sidebarExpandedSub!: Subscription;
  private tabIDSub!: Subscription;

  private viewPosition: number = this.tabService.viewPosition;
  private draggedTabID: number = 0;
  private droppedOnTabID: number = 0;

  public openPages = this.tabService.getTabs();
  public tabHeight: string = "40px";

  public pageFill: string = "#ffffff";
  public previewFill: string = "#ffffff";
  public sidebarExpanded: boolean = this.tabService.sidebarExpanded;
  public endDragged: boolean = false;


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
        this.tabService.setTabDraggedOver(parseInt(event.target.parentElement.parentElement.id), false);
        this.droppedOnTabID = parseInt(event.target.parentElement.parentElement.id);  
      }
      this.endDragged = false;
    }
    if(event.target.parentElement.parentElement.parentElement.className == "tab unselected-tab"
    || event.target.parentElement.parentElement.parentElement.className == "tab selected-tab") {
      let currentTabID = parseInt(event.target.parentElement.parentElement.id);
      if(currentTabID != this.droppedOnTabID) {
        this.tabService.setTabDraggedOver(parseInt(event.target.parentElement.parentElement.parentElement.id), false);
        this.droppedOnTabID = parseInt(event.target.parentElement.parentElement.parentElement.id);
      }
      this.endDragged = false;
    }
    if(event.target.parentElement.parentElement.parentElement.parentElement.className == "tab unselected-tab"
    || event.target.parentElement.parentElement.parentElement.parentElement.className == "tab selected-tab") {
      let currentTabID = parseInt(event.target.parentElement.parentElement.id);
      if(currentTabID != this.droppedOnTabID) {
        this.tabService.setTabDraggedOver(
          parseInt(event.target.parentElement.parentElement.parentElement.parentElement.id), false);
          this.droppedOnTabID = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.id);
      }
      this.endDragged = false;
    }
    if(event.target.className == "tab-container") {
      this.endDragged = true;
      this.tabService.setTabDraggedOver(0, true);
    }
    this.openPages = this.tabService.getTabs();
  }

  // @HostListener("dragenter", ["$event"]) dragEnter(event: any) {
    /* unused - kept for potential future reference */
  // } 

  @HostListener("drop", ["$event"]) dragDrop(event: any) {
    /* calls service methods to reorder dragged/dropped tab in:
        - array of tabs, string of joined tabIDs in order
      && replaces new string of joined tabIDs in URL/location state */
    if(this.endDragged || this.droppedOnTabID > 0) {
      if(this.endDragged) {
        this.tabService.repositionTab(this.draggedTabID, 0, true);
        this.droppedOnTabID = 0;
      }
      if(this.droppedOnTabID > 0) {
        this.tabService.repositionTab(this.draggedTabID, this.droppedOnTabID);
      }
      this.openPages = this.tabService.tabs;
      this.tabService.refreshTabIDs();
      this.routeService.setRoutePath();
    }
  }

  @HostListener("dragend", ["$event"]) dragEnd(event: any) {
    /* resets all properties used for each full drag&drop event cycle */
    this.tabService.setTabDraggedOver(0, true);
    this.endDragged = false;
    this.draggedTabID = 0;
    this.droppedOnTabID = 0;
  }

  @HostListener("dragleave",["$event"]) dragLeave(event: any) {
    /* resets drop target properties, if element is dragged outside of component element */
    this.tabService.setTabDraggedOver(0, true);
    this.endDragged = false;
    this.droppedOnTabID = 0;
  }

  constructor(
    public tabService: TabService,
    private routeService: RouteService
  ) { }

  ngOnInit(): void {
    this.viewToggleSub = this.tabService.viewToggleObs.subscribe(position => {
      /* calls method to set toggled view fill styles, following observed toggle changes */
      this.toggleViewFill();
    });

    this.sidebarExpandedSub = this.tabService.sidebarExpandedObs.subscribe(expanded => {
      /* reassigns status of sidebar expansion, following observed updates
      && calls method to set tab height, depending on if tabs overflow tab container */
      this.sidebarExpanded = this.tabService.sidebarExpanded;
      this.setTabHeight();
    });

    this.tabIDSub = this.tabService.tabIDObservabble.subscribe(val => {
      /* following observed tab changes,
      calls method to set tab height, depending on if tabs overflow tab container */
      this.setTabHeight();
    });
  }

  ngOnDestroy(): void {
    /* manually unsubscribes from all observable subscriptions on component destruction */
    this.viewToggleSub.unsubscribe();
    this.sidebarExpandedSub.unsubscribe();
    this.tabIDSub.unsubscribe();
  }

  private toggleViewFill(): void {
    /* changes properties used for split-screen icon svg styling, depending on view toggle position */
    this.viewPosition = this.tabService.viewPosition;
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
    /* calls service method to toggle view position,
       which sends next value via viewToggleObs[ervable] */
    this.tabService.setViewPosition();
  }

  public selectTab(clickedTab: Page): void {
    /* calls service methods to:
      - create a new tab scroll position setting object for current tab, if not added
      - assign current x and y scroll positions for current tab's content
      - scroll newly selected tab into view
      - set route path && update URL/location state
      - set appropriate destruction/construction terminal log entries
      - toggle menu folder expansion, or closed folder deselection, if necessary 
      - scroll newly selected tab's content to saved positions - or to 0,0 if none saved */
    this.tabService.initializeTabScrollSetting();
    this.tabService.setTabScrollSettings();
    setTimeout(() => {
      this.tabService.scrollIntoView(clickedTab.id);
      this.routeService.setRoutePath();
    }, 1);
    this.tabService.setTerminalLog(clickedTab);
    this.tabService.setSelectedTab(clickedTab);
    this.tabService.toggleFolderSelection(clickedTab);
    this.tabService.scrollToTabScrollSettings();  
    return;
  }

  public closeTab(closedTab: Page): void {
    /* calls service methods to:
    - splice remove selected tab from array of tabs, + then reset this property in component
    - set route path && update URL/location state */
    this.tabService.removeTab(closedTab);
    this.openPages = this.tabService.getTabs();
    setTimeout(() => { this.routeService.setRoutePath(); }, 1);
    return;
  }

}