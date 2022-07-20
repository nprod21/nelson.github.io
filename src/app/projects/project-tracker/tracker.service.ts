import { Injectable } from '@angular/core';
import { Ticket } from './ticket';
import { initTicketsData } from './init-tickets-data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  private menuItems: any[] = [
    {
        label: "dashboard",
        selected: true
    },
    {
        label: "create ticket",
        selected: false
    },
    {
        label: "my tickets",
        selected: false
    },
    {
        label: "assignees",
        selected: false
    }
  ];

  private tickets: Ticket[] = initTicketsData;
  private activeTickets: Ticket[] = this.getOpenTickets();
  private filteredTickets: Ticket[] = this.tickets;

  private selectedTicketNo: number = 1;
  
  private isTicketViewed: boolean = false;
  private isTicketViewedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isTicketViewed);
  public isTicketViewedObs: Observable<boolean> = this.isTicketViewedSubject.asObservable();
  
  public latestProperty: string = "";
  public latestValue: string = "";

  constructor() { }

  public getMenuItems(): any {
    /* Return the private array of menu items, containing label name and selected status */
    return this.menuItems;
  }

  public getSelectedTicketNo(): number {
    /* Return the number of the currently selected ticket */
    return this.selectedTicketNo;
  }

  public getTickets(): Ticket[] {
    /* Return private array of all tickets */
    return this.tickets;
  }

  public getTicketByNo(ticketNo: number): any {
    /* Return ticket matching provided ticket number,
    if found by further method called */
    let index: number = this.getTicketIndexByNo(ticketNo);
    return this.tickets[index];
  }

  public getTicketIndexByNo(ticketNo: number): number {
    /* Return index of provided ticket number, in array of all tickets */
    let number!: number;
    for(let i: number = 0; i < this.tickets.length; i++) {
      if(this.tickets[i].number == ticketNo) {
        number = i;
        break;
      }
    }
    return number;
  }

  public getIsTicketViewed(): boolean {
    /* Returns private isTicketViewed bool property */
    return this.isTicketViewed;
  }

  public setSelectedMenuItem(label: string): void {
    /* loops through menuItems
    and sets each selected property to either true/false, 
      if matching provided value */
    this.menuItems.forEach(item => {
      if(item.label == label) item.selected = true;
      else item.selected = false;
    });
  }

  public createTicket(submission: any): void {
    /* Creates a new ticket with form submission values
    && adds this ticket to main array of all tickets
    && refreshes the activeTickets array, with all open tickets */
    let ticket: Ticket = {
      number: this.getNextAvailableTicketNo(),
      status: "Open",
      assignee: "Nelson",
      submitter: "DemoUser",
      priority: submission.priority,
      type: submission.type,
      project: submission.project,
      title: submission.title,
      description: submission.description, 
      log: [
        {
          date: new Date(),
          update: "DemoUser opened ticket."
        }
      ],
      highlighted: false
    }
    this.tickets.push(ticket);
    this.activeTickets = this.getOpenTickets();
  }

  private getNextAvailableTicketNo(): number {
    /* Returns the next available ticket number, to be assigned to new ticket */
    let lastIndex: number = this.tickets.length - 1;
    let nextNumber: number = this.tickets[lastIndex].number + 1;
    return nextNumber;
  }

  public updateTicket(submission: any): boolean {
    /* Updates existing ticket using provided form submission values
    && adds generated changelog values, based on any changed ticket property values in submission */
    let index: number = this.getTicketIndexByNo(submission.number);
    let statusChanged: boolean = false;
    let priorityChanged: boolean = false;
    let typeChanged: boolean = false;
    let commentAdded: boolean = (submission.comment != null);
    let initialStatus: string = this.tickets[index].status;
    let initialPriority: string = this.tickets[index].priority;
    let initialType: string = this.tickets[index].type;
    let logUpdate: string = "";
    if(this.tickets[index].status != submission.status) {
      statusChanged = true;
      this.tickets[index].status = submission.status;
      logUpdate += "DemoUser updated Status from " + initialStatus + " to " + submission.status + ".";
    }
    if(this.tickets[index].priority != submission.priority) {
      priorityChanged = true;
      this.tickets[index].priority = submission.priority;
      if(statusChanged) logUpdate += "<br>";
      logUpdate += "DemoUser updated Priority from " + initialPriority + " to " + submission.priority + ".";
    }
    if(this.tickets[index].type != submission.type) {
      typeChanged = true;
      this.tickets[index].type = submission.type;
      if(priorityChanged) logUpdate += "<br>";
      logUpdate += "DemoUser updated Type from " + initialType + " to " + submission.type + ".";
    }

    if(commentAdded) {
      if(logUpdate.length) {
        logUpdate += "<br>" + "DemoUser commented \"" + submission.comment + "\"";
      }
      else {
        this.tickets[index].log?.push({
        date: new Date(),
        update: "DemoUser commented \"" + submission.comment + "\""
        });
      }
    }

    if(statusChanged || priorityChanged || typeChanged) {
      this.tickets[index].log?.push({
        date: new Date(),
        update: logUpdate
      });
    }

    if(statusChanged == false 
      && typeChanged == false 
      && priorityChanged == false
      && commentAdded == false) {
      return false;
    }

    this.activeTickets = this.getOpenTickets();
    return true;
  }

  public setIsTicketViewed(bool: boolean): void {
    /* Assigns provided bool value to private isTicketView property
    && publishes property observable via associated behaviour subject */
    this.isTicketViewed = bool;
    this.isTicketViewedSubject.next(this.isTicketViewed);
  }

  public setSelectedTicketNo(ticketNo: number): void {
    /* Assigns provided ticketNo value to private selectedTicketNo property */
    this.selectedTicketNo = ticketNo;
  }

  public setFilteredTickets(property: string, value: string, anyStatus: boolean, isActive?: boolean): void {
    /* Sets this filteredTickets array property, using provided filter settings */
    this.filteredTickets = [];
    type ObjectKey = keyof typeof this.tickets[0];
    const category = property as ObjectKey;
    this.latestProperty = property;
    this.latestValue = value;
    this.tickets.forEach(ticket => {
      if(ticket[category] == value) {
        let isClosed: boolean = (ticket.status == "Closed");
        if(anyStatus) {
          this.filteredTickets.push(ticket);
        }
        else {
          if(isClosed !== isActive) {
            this.filteredTickets.push(ticket);
          }
        }
      } 
    });  
  }

  private getOpenTickets(): Ticket[] {
    /* Returns array of all open (non-closed) tickets
    (used to set value of this.activeTickets property) */
    let openTickets: Ticket[] = [];
      this.tickets.forEach(ticket => {
        if(ticket.status != "Closed") openTickets.push(ticket);
      });
      return openTickets;
  }

  public getActiveTickets(): Ticket[] {
    /* Returns private array of all active (non-closed) tickets */
    return this.activeTickets;
  }

  public getFilteredTickets(): Ticket[] {
    /* Returns private array of filtered tickets */
    return this.filteredTickets;
  }

  public resetFilter(): void {
    /* Resets filterTickets array to array of all tickets */
    this.filteredTickets = this.tickets;
  }

  public getActiveTicketsCount(assignee: string): number {
    /* Returns number of active tickets for provided assignee */
    let activeTicketCount: number = 0;
    this.tickets.forEach(ticket => {
      if(ticket.assignee == assignee && ticket.status != "Closed") {
        activeTicketCount++;
      }
    });
    return activeTicketCount;
  }

  public getClosedTicketsCount(assignee: string): number {
    /* Gets and returns number of closed tickets for provided assignee */
    let closedTicketCount: number = 0;
    this.tickets.forEach(ticket => {
      if(ticket.assignee == assignee && ticket.status == "Closed") {
        closedTicketCount++;
      }
    });
    return closedTicketCount;
  }

}
