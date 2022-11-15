import { Component, Input } from '@angular/core';

@Component({
  selector: 'background[sidebarExpanded]',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent
{

  @Input() sidebarExpanded!: boolean; // toggles ngClass for width style

 constructor() { }

}
