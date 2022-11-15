import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Page } from '../models/page.interface';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  private logWaiting: boolean = false;
  private weatherPreloaded: boolean = false;

  private logSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private constructSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  private destroySplashEntry: string = "<span class='destroy'>DESTROY</span> src/app/ui/components/splash-screen.component"

  public logObservable: Observable<string> = this.logSubject.asObservable();
  public constructObservable: Observable<boolean> = this.constructSubject.asObservable();

  private constructDestroySplashTimeout: any;

  constructor() { }

  private pushInitialLogEntries(): void {
    /* sends preliminary terminal log entries,
      before first page/tab opened, via behaviour subject/observable */
    this.logSubject.next("<span class='construct'>CONSTRUCT</span> src/app/ui/components/tab-headers.component");
    // this.logSubject.next("<span class='inject'>INJECT</span> src/app/ui/services/tab.service.ts");
    // this.logSubject.next("<span class='inject'>INJECT</span> src/app/ui/services/route.service.ts");
    this.logSubject.next("<span class='construct'>CONSTRUCT</span> src/app/ui/components/tab-body.component");
    // this.logSubject.next("<span class='inject'>INJECT</span> src/app/ui/services/tab.service.ts");
    this.logSubject.next("<span class='construct'>CONSTRUCT</span> src/app/ui/components/tab-linecount.component");
    // this.logSubject.next("<span class='inject'>INJECT</span> src/app/ui/services/tab.service.ts");
    this.logSubject.next("<span class='construct'>CONSTRUCT</span> src/app/ui/components/tab-preview.component");
    return;
  }

  private pushClosingLogEntries(): void {
    /* sends concluding terminal log entries,
      after last page/tab closure, via behaviour subject/observable */
    this.logSubject.next("<span class='destroy'>DESTROY</span> src/app/ui/components/tab-preview.component");
    this.logSubject.next("<span class='destroy'>DESTROY</span> src/app/ui/components/tab-linecount.component");
    this.logSubject.next("<span class='destroy'>DESTROY</span> src/app/ui/components/tab-body.component");
    this.logSubject.next("<span class='destroy'>DESTROY</span> src/app/ui/components/tab-headers.component");
    return;
  }

  public pushLogEntry(clickedPage: Page, construct: boolean,  toggled: boolean, tabCount: number): void {
    /* sends appropriate construction/destruction terminal log entries,
      relating to provided page, via behaviour subject/observables */
    let componentName: string = clickedPage.name;
    if(clickedPage.parentFolderId == 3) {
      if(clickedPage.name == "sciCalculator.app") componentName = "projects/project-calculator";
      if(clickedPage.name == "localWeather.app") {
        componentName = "projects/project-weather";
        this.weatherPreloaded = true;
      }
    }
    if(clickedPage.name == "contact") {
      if(clickedPage.previewToggle == "0") {
        if(toggled) componentName = "contact-email";
        else componentName = "previews/contact-linkedin";
      }
      else {
        if(toggled) componentName = "contact-linkedin";
        else componentName = "previews/contact-email";
      }
    }
    if(clickedPage.name == "issueTracker.app") componentName = "projects/project-issue-tracker";
    if(clickedPage.name == "this.app") componentName = "this-demo";
    if(clickedPage.name == "about" || clickedPage.name == "this.app" || clickedPage.name == "skills") {
      let prefixedComponentName: string = "previews/" + componentName;
      componentName = prefixedComponentName;
    }
    if(construct) {
      if(tabCount == 0) this.pushInitialLogEntries();
      setTimeout(() => this.constructSubject.next(true), 1);
      // this.constructSubject.next(true);
      this.logSubject.next("<span class='construct'>CONSTRUCT</span> src/app/ui/components/splash-screen.component"); 
      if(componentName != "") {
        let entry: string = "<span class='construct'>CONSTRUCT</span> src/app/" + componentName + ".component";
        this.logSubject.next(entry);
      }
      if(clickedPage.name == "sciCalculator.app") {
        let entry: string = "<span class='inject'>INJECT</span> src/app/projects/project-calculator/services/calculator.service.ts";
        this.logSubject.next(entry);
      }
      if(clickedPage.name == "issueTracker.app") {
        let entry: string = "<span class='inject'>INJECT</span> src/app/projects/project-issue-tracker/services/tracker.service.ts";
        this.logSubject.next(entry);
      }
      if(clickedPage.name == "localWeather.app") {
        let entry: string = "<span class='inject'>INJECT</span> src/app/projects/project-weather/services/weather.service.ts";
        this.logSubject.next(entry);
      }
      if(this.logWaiting == false && clickedPage.name != "localWeather.app") {
        this.logWaiting = true;
        if(clickedPage.name != "localWeather.app") {
          clearTimeout(this.constructDestroySplashTimeout);
          this.constructDestroySplashTimeout = setTimeout(() => {
            if(this.logWaiting == true && clickedPage.name != "localWeather.app") {
              this.logSubject.next(this.destroySplashEntry);
              this.logWaiting = false;
            }
          }, 3050);   
        }
      }  
    }
    else if(!construct) {
      console.warn("this.logWaiting == " + this.logWaiting + " this.weatherPreloaded == " + this.weatherPreloaded);
      if(this.logWaiting == true || this.weatherPreloaded == true) {
        if(this.logSubject.getValue() != this.destroySplashEntry) {
          this.logSubject.next(this.destroySplashEntry);
        }
        this.logWaiting = false;
        this.weatherPreloaded = false;
      }
      if(componentName != "") {
        let entry: string = "<span class='destroy'>DESTROY</span> src/app/" + componentName + ".component";
        this.logSubject.next(entry);
      }
      if(tabCount == 0) this.pushClosingLogEntries();
    }
    return;
  }

  public pushDestroySplashScreenComponent(): void {
    /* sends terminal log entries of splash screen destruction
    && resets properties used by dynamic push entry method to perform this action,
                          e.g. if called when tabs auto opened per route/location tabIDs param */
    this.logSubject.next(this.destroySplashEntry);
    if(this.logWaiting == true) this.logWaiting = false;
    if(this.weatherPreloaded == true) this.weatherPreloaded = false;
    return;
  }

}