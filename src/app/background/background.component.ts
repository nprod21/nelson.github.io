import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TabService } from '../tab.service';
@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit, OnDestroy
{

 private sidebarExpandedSub!: Subscription;

 public sidebarExpanded: boolean = this.tabService.sidebarExpanded;

 constructor(public tabService: TabService) { }

 ngOnInit(): void {

   this.sidebarExpandedSub = this.tabService.sidebarExpandedObs.subscribe(expanded => {
     /* property used for ngClasses */
     this.sidebarExpanded = this.tabService.sidebarExpanded;
   });

 }

 ngOnDestroy(): void {
   /* manually unsubscribes from observable subscription on component destruction */
   this.sidebarExpandedSub.unsubscribe();
 }

}
