import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {

  @Output() formClose = new EventEmitter();

  ticketForm: FormGroup = this.formBuilder.group({
    priority: ['', Validators.required],
    type: ['', Validators.required],
    project: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private trackerService: TrackerService
  ) { }

  ngOnInit(): void {  }

  get priority() { return this.ticketForm?.get('priority'); }
  get type() { return this.ticketForm?.get('type'); }
  get project() { return this.ticketForm?.get('project'); }
  get title() { return this.ticketForm?.get('title'); }
  get description() { return this.ticketForm?.get('description'); }

  addTicket(): void {
    /* Calls tracker service method to create new ticket, if form submission is valid
    && emits formClose output event */
    this.submitted = true;
    if(this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }
    this.submitted = true;
    this.trackerService.createTicket(this.ticketForm?.value);
    this.formClose.emit();
  }

}
