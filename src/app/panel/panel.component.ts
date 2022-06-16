import { Component, OnInit, ViewEncapsulation, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TabService } from '../tab.service';
import { TerminalService } from '../terminal.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  encapsulation: ViewEncapsulation.None // to enable innerHTML log entries to reference component css
})
export class PanelComponent implements OnInit, OnDestroy {

  private selectedPanelHeaderID: string = "terminal";
  private platform: string = "Web";
  private logEntries: string[] = [];
  private logSub!: Subscription;
  private weatherFetchedSub!: Subscription;
  private sidebarExpandedSub!: Subscription;
  private weatherSplashTimeout: any;

  public panelBodyID: string = "pbody"; 
  public problemsContent: string[] = ["\"The problem is not the problem - the problem is what you think about the problem.\" Cpt. Jack Sparrow"];
  public outputContent: string[] = ["//TODO output"];
  public debugConsoleContent: string[] = ["//TODO console"];
  public panelOptions: boolean[] = [false, false, false, true];
  public panelBody: string[] = this.logEntries;
  public sidebarExpanded: boolean = this.tabService.sidebarExpanded;

  constructor(
    private tabService: TabService,
    private terminalService: TerminalService
  ) { }

  ngOnInit(): void {

    /* extracts user device platform && assigns to platform property
    (used in first terminal log entry) */
    this.setUserPlatform();

    /* adds consecutive initial log entries */
    this.setInitialLogEntries();
    
    setTimeout(() => {
      /* scrolls terminal log's cursor rectangle (at the bottom of the log entries) into view */
      document.getElementById(this.selectedPanelHeaderID)?.scrollIntoView();
    }, 10);
    
    this.logSub = this.terminalService.logObservable.subscribe(entry => {
      /* scrolls terminal log's cursor rectangle (at the bottom of the log entries) into view,
      after each subsequent log entry */
      this.logEntries.push(entry);
      setTimeout(() => {
        document.getElementById("panel-cursor-container")?.scrollIntoView();
      }, 200);
    });

    this.weatherFetchedSub = this.tabService.weatherFetchedObservable.subscribe(response => {
      /* awaits confirmation that weather service received API response
      then requests terminal service to publish a splash screen deletion after ~3s, if selected tab is weather app  */
      if(response && this.logEntries[this.logEntries.length - 1] != "<span class='destroy'>DESTROY</span> src/app/splash-screen.component") {
        clearTimeout(this.weatherSplashTimeout);
        this.weatherSplashTimeout = setTimeout(() => {
          if(this.tabService.getSelectedTab().id == 7) this.terminalService.pushDestroySplashScreenComponent();
        }, 3050);
      }
    });

    this.sidebarExpandedSub = this.tabService.sidebarExpandedObs.subscribe(expanded => {
      /* property used for ngClasses */
      this.sidebarExpanded = this.tabService.sidebarExpanded;
    });

  }
  
  ngOnDestroy(): void {
    /* manually unsubscribes from all observable subscriptions on component destruction */
    this.logSub.unsubscribe();
    this.weatherFetchedSub.unsubscribe();
    this.sidebarExpandedSub.unsubscribe();
  }
  
  @HostListener("window:resize", ["$event"]) onWindowResize(event: any) {
    /* if window is resized, the selected panel header is scrolled into view, in case of overflow */
    setTimeout(() => {
      document.getElementById(this.selectedPanelHeaderID)?.scrollIntoView();
    }, 200);
  }

  private setUserPlatform(): void {
    /* extracts user device platform && assigns to platform property
    (used in first terminal log entry) */
    let ua: string = navigator.userAgent;
    let extract: boolean = false; 
    for(let i = 0; i < ua.length; i++) {
      if(ua[i - 1] == "(") {
        this.platform = ua[i];
        extract = true;
      }
      if(ua[i] == ";") {
        extract = false;
        break;
      }
      if(extract && ua[i - 1] != "(") this.platform += ua[i];
    }
  }
  
  private setInitialLogEntries(): void {
    /* adds consecutive initial log entries */
    this.logEntries.push(this.platform + ":angular-nelsons-site ng s -o");
    this.logEntries.push("<span class='construct'>CONSTRUCT</span> src/app.component");
    this.logEntries.push("<span class='construct'>CONSTRUCT</span> src/app/user-interface.component");
    this.logEntries.push("<span class='inject'>INJECT</span> src/app/tab.service.ts");
    this.logEntries.push("<span class='construct'>CONSTRUCT</span> src/app/background.component");
    this.logEntries.push("<span class='construct'>CONSTRUCT</span> src/app/side-navbar.component");
    this.logEntries.push("<span class='inject'>INJECT</span> src/app/tab.service.ts");
    this.logEntries.push("<span class='inject'>INJECT</span> src/app/route.service.ts");
    this.logEntries.push("<span class='construct'>CONSTRUCT</span> src/app/panel.component");
    this.logEntries.push("<span class='inject'>INJECT</span> src/app/tab.service.ts");
    this.logEntries.push("<span class='inject'>INJECT</span> src/app/terminal.service.ts");
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