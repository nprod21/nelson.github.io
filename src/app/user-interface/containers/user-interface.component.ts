import { Component, OnInit, HostListener, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { TabService } from '../services/tab.service';
import { TerminalService } from '../services/terminal.service';
import { RouteService } from '../services/route.service';
import { Page } from '../models/page.interface';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css'],
  encapsulation: ViewEncapsulation.None, /* to enable document.getElementByID() to return defined */
})
export class UserInterfaceComponent implements OnInit, OnDestroy {

  private viewToggleSub!: Subscription;
  private sidebarExpandedSub!: Subscription;
  private tabOpenSub!: Subscription;
  private constructSub!: Subscription;
  private tabIDSub!: Subscription;
  private logSub!: Subscription;
  private routerEventsSub!: Subscription;
  private routeParamsSub!: Subscription;
  private projectsFolderSub!: Subscription;
  
  public viewPosition: number = 0;
  private sidebarWidth: number = 315;
  private contentResized: boolean = false;
  private windowWidthMinusSidebarHalved: number = (window.innerWidth - 315) / 2;

  public pageDisplay: string = "grid";
  public pageColSpan: string = "span 1"
  public previewDisplay: string = "grid";
  public previewColSpan: string = "span 1";
  public resizerDisplay: string = "block";
  public resizerColSpan: string = "span 1";

  public sidebarExpanded: boolean = this.tabService.sidebarExpanded;
  public resizeActive: boolean = false;

  public contentWidth: number = this.windowWidthMinusSidebarHalved;
  public previewWidth: number = this.contentWidth;
  public previewHeight: number = 0;

  public pages: Page[] = this.tabService.getAllPages();
  public tabsOpen: boolean = false;
  public openTabs: Page[] = this.tabService.getTabs();
  public selectedTab: Page = this.tabService.getSelectedTab();
  public tabIDs: string = this.tabService.getTabIDsString(); 


  public logEntries: string[] = [];
  private platform: string = "Web";

  public tabHeadEndDragged: boolean = false;

  private weatherSplashTimeout: any;

  constructor(
    private tabService: TabService,
    private terminalService: TerminalService,
    private routeService: RouteService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {

    /* calls method to subscribe to router event && process route params */
    this.getPage();

    this.projectsFolderSub = this.tabService.projectsFolderObservable.subscribe(bool => {
      /* sets only existing folder page to closed if observed status is true */
      // TODO REFACTOR
      if(bool) {
        for(let i: number = 0; i < this.pages.length; i++) {
          if(this.pages[i].name == "projects") {
            this.pages[i].folderClosed = false;
            break;
          }
        }
      }
    });

    /* calls service method to collapse side navbar menu,
      if window width less than double width of expanded sidebar */
    this.autoCollapseSidebar();

    /* calls method to initialize widths of: page/tab text/content && preview sections */
    this.setInnerWidths(true, this.viewPosition);

    /* calls method to set previewHeight */
    this.setPreviewHeight();

    /* extracts user device platform && assigns to platform property
    (used in first terminal log entry) */
    this.setUserPlatform();

    /* adds consecutive initial log entries */
    this.setInitialLogEntries();

    setTimeout(() => {
      this.selectedTab = this.tabService.getSelectedTab();
      // console.log("UI selectedTab.name == " + this.selectedTab.name);
    },1);

    this.viewToggleSub = this.tabService.viewToggleObs.subscribe(position => {
      /* calls method to set display + grid column styles for:
       page/tab text/content, preview && resizer handle (display only)
        accordingly, depending on observed view toggle position */
      this.viewPosition = position;
      this.setDisplayStyles(position);
    });

    this.sidebarExpandedSub = this.tabService.sidebarExpandedObs.subscribe(expanded => {
      /* reassigns status of sidebar expansion, following observed updates
      && calls method to set inner widths of content sections,
        taking into account on whether content has been resized + current view poisition */
      this.sidebarExpanded = this.tabService.sidebarExpanded;
      if(this.contentResized) this.setInnerWidths(false, this.viewPosition);
      else if(!this.contentResized) {
        if(this.viewPosition == 0) {
          this.setInnerWidths(true, this.viewPosition);
        }
        else {
          this.setInnerWidths(false, this.viewPosition);  
        }
      }  
    });

    this.tabOpenSub = this.tabService.tabOpenObs.subscribe(status => {
      /* assigns async status from tabOpenObservable to this.tabsOpen
      - used to display either app-background or tab-view-container elements in template
      - if tabsOpen, calls method to set preview height property */
      this.tabsOpen = status;
      this.setPreviewHeight();
    });

    this.constructSub = this.terminalService.constructObservable.subscribe(() => {
      this.selectedTab = this.tabService.getSelectedTab();
    });

    this.logSub = this.terminalService.logObservable.subscribe(entry => {
      /* scrolls terminal log's cursor rectangle (at the bottom of the log entries) into view,
      after each subsequent log entry */
      this.logEntries.push(entry);
      let logCopy: string[] = [...this.logEntries];
      this.logEntries = logCopy;
    });

    this.tabIDSub = this.tabService.tabIDObservabble.subscribe(val => {
      /* following observed tab changes,
      calls method to set string of open tab IDs && openTabs */
      this.tabIDs = val;
      this.openTabs = [...this.tabService.getTabs()];
    });

    this.openTabs = this.tabService.getTabs();

  }

  ngOnDestroy(): void {
    /* manually unsubscribes from all observable subscriptions on component destruction */
    this.viewToggleSub.unsubscribe();
    this.sidebarExpandedSub.unsubscribe();
    this.tabOpenSub.unsubscribe();
    this.constructSub.unsubscribe();
    this.tabIDSub.unsubscribe();
    this.logSub.unsubscribe();
    this.routeParamsSub.unsubscribe();
    this.routerEventsSub.unsubscribe();
    this.projectsFolderSub.unsubscribe();
  }

  @HostListener("window:resize", ["$event"]) onResize(event: any) {
    /* window resize event calls service methods to collapse or expand nav sidebar menu
      && refresh view toggle position
      && sets widths of: page/tab text/content && preview sections */  
    this.autoCollapseSidebar();
    this.autoExpandSidebar();
    this.setPreviewHeight();
    this.viewPosition = this.tabService.viewPosition;
    if(this.contentResized) this.setInnerWidths(false, this.viewPosition);
    else if(!this.contentResized) {
      if(this.viewPosition == 0) {
        this.setInnerWidths(true, this.viewPosition);
      }
      else {
        this.setInnerWidths(false, this.viewPosition);  
      }
    }  
    return;
  }

  @HostListener("resizeStart", ["$event"]) onResizeStart(event: any) {
    /* sets resize active property to true
    which is used by resize move method determine whether resizer handle is being 'dragged' */
    this.resizeActive = true;
    return;
  }
  
  @HostListener("resizeMove", ["$event"]) onResizeMove(event: any) {
    /* checks if a resize event is active
    && if yes, sets content resized property to true
            && calculates/assigns width values to relevant properties used by template */
    if(this.resizeActive) {
      this.contentResized = true;
      let contentOffsetLeft: any = document.getElementById("content")?.offsetLeft;
      let sidebarWidth: number = 315;
      if(!this.sidebarExpanded) sidebarWidth = 50;
      let contentNewWidth: number = event.clientX - sidebarWidth - contentOffsetLeft - 1;
      let bodyWidth: any = document.getElementById("bodyContainer")?.offsetWidth;
      if(contentNewWidth < 100) contentNewWidth = 100;
      if(contentNewWidth > (bodyWidth - 100)) contentNewWidth = (bodyWidth - 100);
      let previewNewWidth: number = bodyWidth - 10 - contentNewWidth;
      this.contentWidth = contentNewWidth;
      this.previewWidth = previewNewWidth;  
    }
    return;
  }

  @HostListener("resizeEnd", ["$event"]) onResizeEnd(event: any) {
    /* resets resize active property to false to confirm resizer handle is no longer 'dragged' */
    this.resizeActive = false;
    return;
  }

  public assignComponent(eventObject: {component: string, page: Page}): void {
    /* invoked if preview component option toggled
    - calls terminal service methods to 'destroy' deselected preview component
    - then calls tab service method to call correct button toggle method
    - then last calls terminal service method again to 'construct' selected preview component */
    if(eventObject.component != this.tabService.getActiveComponent(eventObject.page)) {
      this.terminalService.pushLogEntry(this.tabService.getSelectedTab(), false, false, this.tabService.tabs.length);
      this.tabService.assignComponent(eventObject.component);
      this.terminalService.pushLogEntry(this.tabService.getSelectedTab(), true, false, this.tabService.tabs.length);
    }
    return;
  }

  private setDisplayStyles(position: number): void {
    /* sets display + grid column styles for:
       page/tab text/content, preview && resizer handle (display only)
        accordingly, depending on provided view toggle position */
    this.viewPosition = position;
    if(position == 0) {
      this.pageDisplay = "grid";
      this.pageColSpan = "span 1";
      this.previewDisplay = "grid";
      this.previewColSpan = "span 1";
      this.resizerDisplay = "block";
      this.resizerColSpan = "span 1";
      this.setInnerWidths(true, position);
      return;
    }
    if(position == 1) {
      this.pageDisplay = "grid";
      this.pageColSpan = "span 3";
      this.previewDisplay = "none";
      this.previewColSpan = "span 0";
      this.resizerDisplay = "none";
      this.resizerColSpan = "span 0";
      this.setInnerWidths(false, position);
      return;
    }
    if(position == 2) {
      this.pageDisplay = "none";
      this.pageColSpan = "span 0";
      this.previewDisplay = "grid";
      this.previewColSpan = "span 3";
      this.resizerDisplay = "none";
      this.resizerColSpan = "span 0";
      this.setInnerWidths(false, position);
      return;
    }
  }

  private autoCollapseSidebar(): void {
    /* calls service method to collapse side navbar menu,
         if window width less than double width of expanded sidebar */
    if(window.innerWidth < 700) {
      this.tabService.collapseSidebar();
    }
  }

  private autoExpandSidebar(): void {
    /* calls service method to expand side navbar menu 
        if window width exceeds double width of expanded sidebar */
    if(window.innerWidth > 700) {
      this.tabService.expandSidebar();
    }
  }

  public toggleFolder(page: Page): void {
    /* calls service method to toggle the opening/closing of provided folder page */
    this.tabService.toggleFolder(page);
  }

  public toggleSidebar(): void {
    /* calls method to expand/collapse sidebar menu - done via service as status shared
    &&  calls method to set the explorer icon fill color to indicate expanded/collapsed sidebar*/
    this.tabService.toggleSidebarExpanded();
  }

  public selectPage(page: Page): void {
    /* calls service method to add selected page as tab
    && create a new tab scroll position setting object for page, if not added
      + assign current x and y scroll positions for current tab's content
    && slightly delays actions:
          - scroll selected tab into view,
          - set route path / URL/Location state
    && calls method to auto collapse sidebar, if window width is less than double width of expanded sidebar */
    if(this.tabService.getTabs().length >= 1) {
      this.tabService.initializeTabScrollSetting();
      this.tabService.setTabScrollSettings();
    }    
    this.tabService.addTab(page);
    setTimeout(() => {
      this.tabService.scrollIntoView(page.id);
      this.routeService.setRoutePath();
    }, 1);
    this.tabService.scrollToTabScrollSettings();
    this.autoCollapseSidebar();
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
    setTimeout(() => { this.routeService.setRoutePath(); }, 1);
    this.openTabs = this.tabService.getTabs();
  }
  
  private setInnerWidths(initialize: boolean, position: number): void {
    /* sets widths of: page/tab text/content && preview sections
        taking into account the view toggle position
        && whether sections has been manually resized */
    if(this.sidebarExpanded) this.sidebarWidth = 315;
    else if(!this.sidebarExpanded) this.sidebarWidth = 50;
    if(initialize) {
      let splitInnerWidth: number = (window.innerWidth - this.sidebarWidth - 10) / 2;
      this.contentWidth = splitInnerWidth;
      this.previewWidth = this.contentWidth;  
    }
    else if(!initialize) {
      if(position == 0) { // split position
        let contentWidthNum: any = document.getElementById("content")?.offsetWidth;
        if(contentWidthNum > (window.innerWidth -  this.sidebarWidth - 110)) {
          contentWidthNum = window.innerWidth -  this.sidebarWidth - 110;
          this.contentWidth = contentWidthNum;
        }
        let previewNewWidth: number = (window.innerWidth - this.sidebarWidth - contentWidthNum - 10);
        this.previewWidth = previewNewWidth; 
      }
      if(position == 1 || position == 2) { // either or position
        let fullWidth: any = window.innerWidth - this.sidebarWidth;
        // let fullWidthPx: string = fullWidthNum;
        if(position == 1) { // text only position
          this.contentWidth = fullWidth;
          this.previewWidth = 0;
        }
        else if(position == 2) {
          this.contentWidth = 0;
          this.previewWidth = fullWidth;
        }
      }
    }
    return;
  }

  private setPreviewHeight(): void {
    setTimeout(() => {
      let previewElementHeight: any = document.getElementById('bodyContainer')?.clientHeight;
      this.previewHeight = previewElementHeight;
    }, 1);    
  }

  private setUserPlatform(): void {
    /* extracts user device platform && assigns to platform property
    (used in first terminal log entry) */
    let ua: string = navigator.userAgent;
    let extract: boolean = false; 
    for(let i = 0; i < ua.length; i++) {
      if(ua[i - 1] == "(") {
        this.platform = ua[i];
        extract = true;
      }
      if(ua[i] == ";") {
        extract = false;
        break;
      }
      if(extract && ua[i - 1] != "(") this.platform += ua[i];
    }
  }

  private setInitialLogEntries(): void {
    /* adds consecutive initial log entries */
    this.logEntries.push(this.platform + ":angular-nelsons-site ng s -o");
    this.logEntries.push("<span class='construct'>CONSTRUCT</span> src/app.component");
    this.logEntries.push("<span class='construct'>CONSTRUCT</span> src/app/ui/containers/user-interface.component");
    this.logEntries.push("<span class='inject'>INJECT</span> src/app/ui/services/tab.service.ts");
    this.logEntries.push("<span class='inject'>INJECT</span> src/app/ui/services/terminal.service.ts");
    this.logEntries.push("<span class='inject'>INJECT</span> src/app/ui/services/route.service.ts");
    this.logEntries.push("<span class='construct'>CONSTRUCT</span> src/app/ui/components/background.component");
    this.logEntries.push("<span class='construct'>CONSTRUCT</span> src/app/ui/components/side-navbar.component");
    this.logEntries.push("<span class='construct'>CONSTRUCT</span> src/app/ui/components/panel.component");  
  }

  public handleWeatherResponse(response: boolean): void {
    // TODO - MIGRATE TO UI COMPONENT
    // this.weatherFetchedSub = this.tabService.weatherFetchedObservable.subscribe(response => {
      /* awaits confirmation that weather service received API response
      then requests terminal service to publish a splash screen deletion after ~3s, if selected tab is weather app  */
    if(response && this.logEntries[this.logEntries.length - 1] != "<span class='destroy'>DESTROY</span> src/app/ui/components/splash-screen.component") {
      clearTimeout(this.weatherSplashTimeout);
      this.weatherSplashTimeout = setTimeout(() => {
        if(this.tabService.getSelectedTab().id == 7) this.terminalService.pushDestroySplashScreenComponent();
      }, 3050);
    }
  }
  
  /* METHOD TO RETRIEVE/HANDLE ROUTE PARAMS FROM ROUTER EVENT */
  private getPage(): void {
    /* subscribes to route event to retrieve route parameters
    && calls Route service to process changes */
    this.routerEventsSub = this.router.events.subscribe(val => {
      if(val instanceof NavigationEnd) {
        let r = this.route;
        
        while(r.firstChild) {
          r = r.firstChild;
        }
        this.routeParamsSub = r.params.subscribe(params => {
          this.routeService.manageRouteParams(params);

        });
      }
    })
  }

  public toggleView(): void {
    /* calls service method to toggle view position,
       which sends next value via viewToggleObs[ervable] */
    this.tabService.setViewPosition();
  }

  public setTabDraggedOver(event: {targetTabID: number, resetStatus: boolean}): void {
    this.tabService.setTabDraggedOver(event.targetTabID, event.resetStatus);
  }

  public repositionTab(event: {draggedTabID: number, droppedOnTabID: number}): void {
    this.tabService.repositionTab(event.draggedTabID, event.droppedOnTabID);
    this.tabService.refreshTabIDs();
    this.routeService.setRoutePath();
  }

  public setTabLast(event: {draggedTabID: number}): void {
    this.tabService.repositionTab(event.draggedTabID, 0, true);
    this.tabService.refreshTabIDs();
    this.routeService.setRoutePath();
  }

}