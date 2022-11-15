import { Component, OnInit, ViewEncapsulation, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  encapsulation: ViewEncapsulation.None // to enable innerHTML log entries to reference component css
})
export class PanelComponent implements OnInit {

  @Input() sidebarExpanded: boolean = true;
  // @Input() weatherFetched: boolean = false;

  @Input() set logs(entries: string[]) {
    this.logEntries = entries;
    this.panelBody = this.logEntries;
    setTimeout(() => {
      document.getElementById("panel-cursor-container")?.scrollIntoView();
    }, 200);
  }

  private selectedPanelHeaderID: string = "terminal";
  private logEntries: string[] = [];

  public panelBodyID: string = "pbody"; 
  public problemsContent: string[] = ["\"The problem is not the problem - the problem is what you think about the problem.\" Cpt. Jack Sparrow"];
  public outputContent: string[] = ["//TODO output"];
  public debugConsoleContent: string[] = ["//TODO console"];
  public panelOptions: boolean[] = [false, false, false, true];
  public panelBody: string[] = this.logEntries;

  constructor() { }

  ngOnInit(): void {
    
    setTimeout(() => {
      /* scrolls terminal log's cursor rectangle (at the bottom of the log entries) into view */
      document.getElementById(this.selectedPanelHeaderID)?.scrollIntoView();
    }, 10);

  }
  
  @HostListener("window:resize", ["$event"]) onWindowResize(event: any) {
    /* if window is resized, the selected panel header is scrolled into view, in case of overflow */
    setTimeout(() => {
      document.getElementById(this.selectedPanelHeaderID)?.scrollIntoView();
    }, 200);
  }

  private setSelectedPanelOptionID(): string {
    /* assigns the corresponding elemented ID, of the selected panel option, 
      to the selected panel header ID property, to be scrolled into view */
    let optionID: string = "";
    for(let i: number = 0; i < this.panelOptions.length; i++) {
      if(this.panelOptions[i] == true) {
        if(i == 0) {
          this.selectedPanelHeaderID = "problems";
          break;
        }
        if(i == 1) {
          this.selectedPanelHeaderID = "output";
          break;
        }
        if(i == 2) {
          this.selectedPanelHeaderID = "debug-console";
          break;
        }
        if(i == 3) {
          this.selectedPanelHeaderID = "terminal";
          break;
        }
      }
    }
    return optionID;
  }

  public selectPanel(option: number): void {
    /* sets selected panel using provided option index
    if option index corresponds to the terminal log view: 
      - cursor is scrolled into view (at the bottom of the populated log entries)
    the selected panel option header set as the selected panel header ID property,
      which is then also scrolled into view, in case of possible overflow */
    for(let i: number = 0; i < this.panelOptions.length; i++) {
      if(i == option) {
        this.panelOptions[i] = true;
        if(i == 3) {
          setTimeout(() => {
           document.getElementById("panel-cursor-container")?.scrollIntoView(); 
          }, 200);
        } 
      }
      else this.panelOptions[i] = false;
    }
    this.setSelectedPanelOptionID();
    setTimeout(() => {
      document.getElementById(this.selectedPanelHeaderID)?.scrollIntoView();
    }, 10);
  }

}