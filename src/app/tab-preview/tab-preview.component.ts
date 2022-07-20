import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TabService } from '../tab.service';
import { Page } from '../pages';
import { TerminalService } from '../terminal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-preview',
  templateUrl: './tab-preview.component.html',
  styleUrls: ['./tab-preview.component.css']
})
export class TabPreviewComponent implements OnInit, OnDestroy {

  @Input() previewWidth: number = 0; // binded to template's container [style.width]
  @Input() previewHeight: number = 0; // to be provided to project-component

  private weatherFetchedSub!: Subscription;
  private constructSub!: Subscription;
  private sidebarExpandedSub!: Subscription;
  private viewToggleSub!: Subscription;
  private weatherTimeout: any
  private constructTimeout: any;
 
  public openPages = this.tabService.getTabs();
  public splashTimeout: boolean = true;
  public sidebarExpanded: boolean = this.tabService.sidebarExpanded;

  constructor(
    private tabService: TabService,
    private terminalService: TerminalService
  ) { }

  ngOnInit(): void {

    this.weatherFetchedSub = this.tabService.weatherFetchedObservable.subscribe(response => {
      /* starts ~3s splash screen countdown once weather API response received */
      if(response) {
        this.splashTimeout = true;
        clearTimeout(this.weatherTimeout);
        this.weatherTimeout = setTimeout(() => {
        if(this.tabService.getSelectedTab().id == "7") {
          this.splashTimeout = false;
        }
      }, 3100);
      } 
    });

    this.constructSub = this.terminalService.constructObservable.subscribe(entry => {
      /* starts ~3s splash screen countdown once terminal 'construction' trigger received */
      this.splashTimeout = true;
      if(this.tabService.getSelectedTab().id != "7") {
        clearTimeout(this.constructTimeout);
        this.constructTimeout = setTimeout(() => {
          if(this.tabService.getSelectedTab().id != "7") {
              this.splashTimeout = false;
          }
        }, 3100);
      }
    });

    this.sidebarExpandedSub = this.tabService.sidebarExpandedObs.subscribe(() => {
      /* async assigns updated service sidebar expanded status to component reference */
      this.sidebarExpanded = this.tabService.sidebarExpanded;   
    });

    this.viewToggleSub = this.tabService.viewToggleObs.subscribe(() => {
      /* async assigns latest service sidebar expanded status to component reference,
      important when window resize auto collapses/expands sidebar */
      this.sidebarExpanded = this.tabService.sidebarExpanded;
    });

  }

  ngOnDestroy(): void {
    /* manually unsubscribes from all observable subscriptions on component destruction
    && clear any pending timeouts */
    this.weatherFetchedSub.unsubscribe();
    this.constructSub.unsubscribe();
    this.sidebarExpandedSub.unsubscribe();
    this.viewToggleSub.unsubscribe();
    clearTimeout(this.weatherTimeout);
    clearTimeout(this.constructTimeout);
  }

  public assignComponent(component: string, page: Page): void {
    /* invoked if preview component option toggled
    - calls terminal service methods to 'destroy' deselected preview component
    - then calls tab service method to call correct button toggle method
    - then last calls terminal service method again to 'construct' selected preview component */
    if(component != this.tabService.getActiveComponent(page)) {
      this.terminalService.pushLogEntry(this.tabService.getSelectedTab(), false, false, this.tabService.tabs.length);
      this.tabService.assignComponent(component);
      this.terminalService.pushLogEntry(this.tabService.getSelectedTab(), true, false, this.tabService.tabs.length);
    }
    return;
  }

}
