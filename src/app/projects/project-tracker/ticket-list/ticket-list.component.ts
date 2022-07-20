import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ticket } from '../ticket';
import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  @Input() filterProperty!: string;
  @Input() filterValue!: string;
  @Input() anyStatus!: boolean;
  @Input() activeStatus!: boolean;
  @Input() filterClosed!: boolean;
  @Input() keepFilter!: boolean;
  @Input() assignee!: string;
  @Output() ticketSelect = new EventEmitter();

  public tickets: Ticket[] = [];
  private highlightedTicketIndex!: number;
  public count: number = 0;

  public columns: string[] = ["number", "priority", "type", "project", "title", "description", "status", "assignee", "submitter"];
  public sortedColumn: string = this.columns[0];
  public sortPipeTrigger: boolean = false;
  public sortReverse: boolean = true;
  public sortableColumns: any[] = [
    {
      name: "number",
      selected: true,
      filtered: false
    },
    {
      name: "priority",
      selected: false,
      filtered: false
    },
    {
      name: "type",
      selected: false,
      filtered: false
    },
    {
      name: "project",
      selected: false,
      filtered: false
    },
    {
      name: "title",
      selected: false,
      filtered: false
    },
    {
      name: "description",
      selected: false,
      filtered: false
    },
    {
      name: "status",
      selected: false,
      filtered: false
    },
    {
      name: "assignee",
      selected: false,
      filtered: false
    },
    {
      name: "submitter",
      selected: false,
      filtered: false
    },
  ]

  private isTicketViewedSub!: Subscription;

  public latestFilter: string = this.trackerService.latestProperty;
  public latestFilterValue: string = this.trackerService.latestValue;

  constructor(private trackerService: TrackerService) { }

  ngOnInit(): void {
    /* Subscribes to tracker service's isTicketViewed observable
    && calls method to update array of tickets following each subscription received.
    Also assigns trackerService's latest filter property/value values to component's matching properties */
    this.isTicketViewedSub = this.trackerService.isTicketViewedObs.subscribe(sub => {
      this.getTickets();
    });
    this.latestFilter = this.trackerService.latestProperty;
    this.latestFilterValue = this.trackerService.latestValue;
  }

  ngOnDestroy(): void {
  /* manually unsubscribes from observable subscription on component destruction */
    this.isTicketViewedSub.unsubscribe();
  }

  private getFilteredTickets(): void {
    /* Assigns array of tracker service's filtered tickets to component's array of tickets */
    this.tickets = this.trackerService.getFilteredTickets();
  }

  private getTickets(): void {
    /* Assigns various ticket array values to main tickets array, per input values provided */
    if(this.filterClosed) {
      this.tickets = this.trackerService.getActiveTickets();
      return;
    }
    if(this.filterProperty && this.filterValue) {
      if(this.anyStatus != null) {
        if(this.anyStatus == true) this.setFilteredTickets(this.filterProperty, this.filterValue, this.anyStatus); 
        else if(this.activeStatus != null) this.setFilteredTickets(this.filterProperty, this.filterValue, this.anyStatus, this.activeStatus);  
      }
    }
    
    else if(this.keepFilter == null || this.keepFilter == false) this.trackerService.resetFilter();
    
    this.getFilteredTickets();
    if(this.keepFilter) this.filterColumn();
  }

  public viewTicketDetails(ticketNo: number): void {
    /* Performs required actions to display provided ticket's details */
    this.unhighlightTicket();
    this.trackerService.setSelectedTicketNo(ticketNo);
    this.ticketSelect.emit();
    this.trackerService.setIsTicketViewed(true);
  }

  public setSortValues(column: string): void {
    /* Sets values of related Sort properties
    && toggles sortPipeTrigger (used to retrigger the sort Pipe used in template - due to changed parameter) */
    if(column == this.sortedColumn) this.sortReverse = !this.sortReverse;
    else if(column != this.sortedColumn) this.sortedColumn = column;
    this.sortPipeTrigger = !this.sortPipeTrigger;
    this.selectColumn(column);
  }

  private selectColumn(columnName: string): void {
    /* Sets the selected property status of each sortableColumn element to true/false,
    if the column name matches the provided columnName */
    this.sortableColumns.forEach(column => {
      if(column.name == columnName) column.selected = true;
      else column.selected = false;
    });
  }

  private filterColumn(): void {
    /* Sets filtered property status of each sortableColumn element to true/false,
    if the column name matches latestFilters value */    
    this.sortableColumns.forEach(column => {
      if(column.name == this.latestFilter) column.filtered = true;
      else column.filtered = false;
    });
  }

  public setFilteredTickets(property: string, value: string, anyStatus: boolean, activeStatus?: boolean): void {
    /* Calls trackerService methods to set the filteredTickets array, using provided filter settings */
    if(activeStatus != null) this.trackerService.setFilteredTickets(property, value, anyStatus, activeStatus)
    else this.trackerService.setFilteredTickets(property, value, anyStatus);
  }

  private findTicketIndex(ticketNo: number): number {
    /* Returns index of provided ticket number, in main tickets array */
    return this.tickets.findIndex(ticket => ticket.number == ticketNo);
  }

  public highlightTicket(ticketNo: number): void {
    /* Sets highlighted property of provided ticketNo to true,
    && sets currently highlighted ticket's highlighted property to false, if both are not the same ticket
    && resets currently highlightedTicketIndex value to provided ticketNo's index */
    let index: number = this.findTicketIndex(ticketNo);
    if(this.highlightedTicketIndex != index) this.unhighlightTicket();
    this.tickets[index].highlighted = true;
    this.highlightedTicketIndex = index;
  }

  private unhighlightTicket(): void {
    /* Sets currently highlighted ticket's highlighted value to false  */
    if(this.highlightedTicketIndex != undefined) {
      this.tickets[this.highlightedTicketIndex].highlighted = false
    }
  }

  public isFilteredOnCol(column: string): boolean {
    /* Returns bool outcome of whether provided column is filtered */
    if(this.filterProperty != null) {
      let selectedCol: string = this.filterProperty;
      if(column.toUpperCase() == selectedCol.toUpperCase()) return true;
    }
    return false;
  }

}
