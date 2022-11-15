import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { formatNumber } from '@angular/common';

import { TrackerService } from '../../services/tracker.service';
import { Ticket } from '../../models/ticket.interface';

@Component({
  selector: 'app-ticket-details[ticketNo]',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  @Input() ticketNo: number = 0;
  @Output() ticketUpdate = new EventEmitter();

  ticketForm!: FormGroup;
  
  public ticket!: Ticket;

  public invalidPendingStatus: boolean = false;
  public invalidOpenStatus: boolean = false;
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private trackerService: TrackerService
  ) { }

  ngOnInit(): void {
    /* Assigns values of ticket, with matching input provided ticket number,
    to the ticketForm group object and sets additional comment field as empty with validation required */
    this.ticket = this.trackerService.getTicketByNo(this.ticketNo);
    this.ticketForm = this.formBuilder.group({
      number: [formatNumber(this.ticket.number, 'en-US', '3.')],
      priority: [this.ticket.priority],
      type: [this.ticket.type],
      project: [this.ticket.project],
      title: [this.ticket.title],
      description: [this.ticket.description],
      status: [this.ticket.status],
      assignee: [this.ticket.assignee],
      submitter: [this.ticket.submitter],
      comment: ['', Validators.required]
    });
  }
  
  /* PRIVATE METHODS (for component) */

  private setIsTicketViewed(bool: boolean): void {
    /* Calls tracker service method to set isTicketView value + behaviour subject/observable */
    this.trackerService.setIsTicketViewed(bool);
  }
  

  /* PUBLIC METHODS (for template) */

  public updateTicket(): void {
    /* Handles form submission to update ticket, if submission is valid
    && set tracker services isTicketViewed status
    && emits ticketUpdate output event */
    this.submitted = true;
    if(this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    if(this.ticket.status != "Pending" && this.ticketForm.value.status == "Pending") {
      this.invalidPendingStatus = true;
      return;
    }
    if(this.ticket.status == "Pending" && this.ticketForm.value.status == "Open") {
      this.invalidOpenStatus = true;
    }
    else {
      if(this.trackerService.updateTicket(this.ticketForm?.value)) {
        this.invalidPendingStatus = false;
        this.invalidOpenStatus = false;
        this.setIsTicketViewed(false);
        this.ticketUpdate.emit();
      }      
    }
  }

}
