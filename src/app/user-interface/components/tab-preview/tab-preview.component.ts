import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Page } from '../../models/page.interface';

@Component({
  selector: 'app-tab-preview',
  templateUrl: './tab-preview.component.html',
  styleUrls: ['./tab-preview.component.css']
})
export class TabPreviewComponent implements OnInit {

  @Input() previewWidth: number = 0; // binded to template's container [style.width]
  @Input() previewHeight: number = 0; // to be provided to project-component
  @Input() sidebarExpanded: boolean = true;
  @Input() openPages: Page[] = [];
  @Input() set selectedTab(selectedTab: Page) {
    this.selectedPage = selectedTab;
    this.resetSplashScreen();
  }

  @Output() weatherResponse: EventEmitter<boolean> = new EventEmitter();
  @Output() componentAssign: EventEmitter<any> = new EventEmitter();

  private weatherTimeout: any
  private constructTimeout: any;
 
  public selectedPage!: Page;
  public splashTimeout: boolean = true;

  constructor() { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    /* manually clears any pending timeouts */
    clearTimeout(this.weatherTimeout);
    clearTimeout(this.constructTimeout);
  }

  public assignComponent(component: string, page: Page): void {
    this.componentAssign.emit({component, page});
    if(this.componentInactive(component)) this.resetSplashScreen();
    /* invoked if preview component option toggled
    - calls terminal service methods to 'destroy' deselected preview component
    - then calls tab service method to call correct button toggle method
    - then last calls terminal service method again to 'construct' selected preview component */
    return;
  }

  public componentInactive(component: string): boolean {
    let inactiveStatus: boolean = false
    if(
      (component != this.selectedPage.previewComponents[0]
      && this.selectedPage.previewToggle != '0')
      || (component != this.selectedPage.previewComponents[1]
          && this.selectedPage.previewToggle == '0')
    ) {
      inactiveStatus = true;
    }
    return inactiveStatus;
  }

  public resetSplashScreen(): void {
    this.splashTimeout = true;
    if(this.selectedPage) {
      if(this.selectedPage.id != 7) {
        clearTimeout(this.constructTimeout);
        this.constructTimeout = setTimeout(() => {
          if(this.selectedPage.id != 7) {
            this.splashTimeout = false;
          }
        }, 3100);
      }  
    }
  }

  public handleWeatherResponse(Response: boolean): void {
    /* starts ~3s splash screen countdown once weather API response received */
    this.weatherResponse.emit(Response);
    if(Response) {
      this.splashTimeout = true;
      clearTimeout(this.weatherTimeout);
      this.weatherTimeout = setTimeout(() => {
        if(this.selectedPage.id == 7) {
          this.splashTimeout = false;
        }
      }, 3100);
    }
  }

}
