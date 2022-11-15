import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-this-demo',
  templateUrl: './this-demo.component.html',
  styleUrls: ['./this-demo.component.css']
})
export class ThisDemoComponent implements OnInit {

  public showDemo: boolean = false;

  public index: number = 1;
  public demoTags: string[] = ["collapsible-menu - view-toggle - resizable-sections", "routing - tab-reselection - tab-rearrangement - tab-closure", "tab-scroll-restoration",  "simulated-terminal-log-entries", "responsive-design"];
  public demoGif: string[] = ["assets/img/app-demos/collapsible-menu_view-toggle_resizable-sections.gif", "assets/img/app-demos/routing-tab-reselection-rearrangement-closure.gif", "assets/img/app-demos/tab-scroll-restoration.gif", "assets/img/app-demos/simulated-terminal-log-entries.gif", "assets/img/app-demos/responsive-design.gif"];

  constructor() { }

  ngOnInit(): void {
    /* timer delay for content visibility - to prevent any flickering before splash screen */
    setTimeout(() => this.showDemo = true, 3100);
  }

  public nextImg(): void {
    if(this.index < 5) this.index++;
    else this.index = 1;
  }

  public previousImg(): void {
    if(this.index > 1) this.index--;
    else this.index = 5;
  }

}
