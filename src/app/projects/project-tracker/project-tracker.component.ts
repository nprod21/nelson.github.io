import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { TrackerService } from './tracker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-tracker',
  templateUrl: './project-tracker.component.html',
  styleUrls: ['./project-tracker.component.css']
})
export class ProjectTrackerComponent implements OnInit {

  public showProject: boolean = false;

  public appWidth: number = 0;

  @Input() set previewWidth(value: number) {
    this.appWidth = value;
    this.setExpanded(this.appWidth);
  }

  @Input() appHeight: number = 0; 

  public expanded: boolean = false;
  public sidenavWidth: number = 80;

  public menuItems = this.trackerService.getMenuItems();
  public isTicketViewed: boolean = this.trackerService.getIsTicketViewed();
  private isTicketViewedSub!: Subscription;
  public selectedTicketNo: number = this.trackerService.getSelectedTicketNo();

  public bgFill: string = "#134a9f";
  public iconFill: string = "#dddddd";

  public filterProperty!: string;
  public filterValue!: string;

  public showReportIssue: boolean = false;
  public showCharts: boolean = true;

  public columns: string[] = ["number", "priority", "type", "project", "title", "description", "status", "assignee", "submitter"];
  public sortedColumn: string = "number";
  public sortPipeTrigger: boolean = false;
  public sortReverse: boolean = false;
  public sortableColumns: any[] = [
    {
      name: "number",
      selected: true
    },
    {
      name: "priority",
      selected: false
    },
    {
      name: "type",
      selected: false
    },
    {
      name: "project",
      selected: false
    },
    {
      name: "title",
      selected: false
    },
    {
      name: "description",
      selected: false
    },
    {
      name: "status",
      selected: false
    },
    {
      name: "assignee",
      selected: false
    },
    {
      name: "submitter",
      selected: false
    },
  ]

  public showAssigneeTickets: boolean = false;
  public assigneeActiveTickets: boolean = true;
  public selectedAssignee: string = "Nelson";

  public showWelcome: boolean = true;

  constructor(private trackerService: TrackerService) { }

  ngOnInit(): void {
    /* Subscribes to tracker service's isTicketViewed observable
    && assigns each subscription status to component's isTicketViewed boolean */
    this.isTicketViewedSub = this.trackerService.isTicketViewedObs.subscribe(status =>
      {
        this.isTicketViewed = status;
      });

    /* timer delay for content visibility - to prevent flickering before splash screen */
    setTimeout(() => this.showProject = true, 3100);
  }

  ngOnDestroy(): void {
    /* manually unsubscribes from observable subscription on component destruction */
    this.isTicketViewedSub.unsubscribe();
  }

  public setSelectedMenuItem(label: string): void {
    /* Sets properties used for controlling views displayed
    && calls tracker service method to set the selected menu item, using provided label */
    this.trackerService.setSelectedMenuItem(label);
    this.isTicketViewed = false;
    this.showCharts = true;
    this.showAssigneeTickets = false;
  }

  public toggleSidenav(): void {
    /* Sets properties used for controlling side navigation bar expansion + width
    && calls method to toggle display of shown welcome user message */
    this.expanded = !this.expanded;
    if(this.expanded) this.sidenavWidth = 265;
    else if(this.expanded == false) this.sidenavWidth = 80;
    this.toggleWelcome();
  }

  public collapseSidenav(): void {
    /* Sets properties used for controlling side navigation bar to a 'collapsed' status/width
    && calls method to toggle display of shown welcome user message */
    this.expanded = false;
    this.sidenavWidth = 80;
    this.toggleWelcome();
  }

  private setExpanded(previewWidth: number): void {
    /* Sets expanded status based on provided preview(app) width
    && calls method to toggle display of shown welcome user message */
    if(previewWidth > 400) this.expanded = true;
    else if(previewWidth < 400) {
      this.expanded = false;
    }
    this.toggleWelcome();
  }

  private toggleWelcome(): void {
    /* Toggles bool used to display welcome user message in side navigation bar, if collapsed or expanded */
    if(!this.expanded) this.showWelcome = this.expanded;
    else setTimeout(()=> this.showWelcome = this.expanded, 60);
  }

  public onCloseReport(): void {
    /* Sets selected menuItem to dashboard and toggles boolean used to retrigger the sort pipe
    (called following ticket-form submission's 'onCloseReport' event) */
    this.setSelectedMenuItem("dashboard");
    this.sortPipeTrigger = !this.sortPipeTrigger;
  }

  public setSelectedTicketNo(): void {
    /* Assigns selected ticket number from tracker service to component property */
    this.selectedTicketNo = this.trackerService.getSelectedTicketNo();
  }

  public filterTickets(): void {
    /* Sets showcharts bool to false
    (called following chart components' emitted elementSelect output event) */
    this.showCharts = false;
  }

  public resetFilter(): void {
    /* Calls service method to reset filter applied to tickets
    && sets showCharts to true, for dashboard display */
    this.trackerService.resetFilter();
    this.showCharts = true;
  }

  public setAssigneeTickets(eventValues: any): void {
    /* Sets assignee properties using provided event values
    && sets bool used to control assignee ticket view to true */
    this.selectedAssignee = eventValues.name;
    this.assigneeActiveTickets = eventValues.activeStatus;
    this.showAssigneeTickets = true;
  }

}
