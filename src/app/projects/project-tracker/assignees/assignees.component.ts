import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { TrackerService } from '../tracker.service';

@Component({
  selector: 'app-assignees',
  templateUrl: './assignees.component.html',
  styleUrls: ['./assignees.component.css']
})
export class AssigneesComponent implements OnInit {

  @Output() showAssigneeTickets = new EventEmitter<object>();

  public assignees: any[] = [
    {
      name: "Nelson",
      email: "nelson.daly@outlook.com",
      imgSrc: "assets/img/pro-pic.jpeg"
    }
  ]

  constructor(private trackerService: TrackerService) { }

  ngOnInit(): void {
  }

  public getActiveTicketsCount(assignee: string): number {
    /* Gets and returns number of active tickets for provided assignee */
    return this.trackerService.getActiveTicketsCount(assignee);
  }

  public getClosedTicketsCount(assignee: string): number {
    /* Gets and returns number of closed tickets for provided assignee */
    return this.trackerService.getClosedTicketsCount(assignee);
  }

  public setAssigneeTickets(name: string, activeStatus: boolean): void {
    // this.trackerService.setSelectedAssignee(name);
    this.showAssigneeTickets.emit({name, activeStatus});
  }

}
