import { Component, OnInit, HostListener, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TabService } from '../tab.service';

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
  
  private viewPosition: number = 0;
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

  public tabsOpen: boolean = false;

  constructor(
    public tabService: TabService,
  ) { }

  ngOnInit(): void {

    /* calls service method to collapse side navbar menu,
      if window width less than double width of expanded sidebar */
    this.collapseSidebar();

    /* calls method to initialize widths of: page/tab text/content && preview sections */
    this.setInnerWidths(true, this.viewPosition);

    /* calls method to set previewHeight */
    this.setPreviewHeight();

    this.viewToggleSub = this.tabService.viewToggleObs.subscribe(position => {
      /* calls method to set display + grid column styles for:
       page/tab text/content, preview && resizer handle (display only)
        accordingly, depending on observed view toggle position */
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
      console.warn("ui.tabsOpen status = " + status);
      this.setPreviewHeight();
    });

  }

  ngOnDestroy(): void {
    /* manually unsubscribes from all observable subscriptions on component destruction */
    this.viewToggleSub.unsubscribe();
    this.sidebarExpandedSub.unsubscribe();
    this.tabOpenSub.unsubscribe();
  }

  @HostListener("window:resize", ["$event"]) onResize(event: any) {
    /* window resize event calls service methods to collapse or expand nav sidebar menu
      && refresh view toggle position
      && sets widths of: page/tab text/content && preview sections */  
    this.collapseSidebar();
    this.expandSidebar();
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

  private collapseSidebar(): void {
    /* calls service method to collapse side navbar menu,
         if window width less than double width of expanded sidebar */
    if(window.innerWidth < 700) {
      this.tabService.collapseSidebar();
    }
  }

  private expandSidebar(): void {
    /* calls service method to expand side navbar menu 
        if window width exceeds double width of expanded sidebar */
    if(window.innerWidth > 700) {
      this.tabService.expandSidebar();
    }
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
      // this.previewWidth = (previewElementWidth - 6).toString() + "px";
      console.warn("ui.previewElementHeight == " + previewElementHeight);
      // this.previewHeight = (previewElementHeight).toString() + "px";
      this.previewHeight = previewElementHeight;
      console.warn("ui.previewHeight == " + this.previewHeight);
    }, 1);
    /* sets preview height value as string with appended unit measurement */
    
  }

}