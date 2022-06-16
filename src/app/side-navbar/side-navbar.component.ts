import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { Page } from '../pages';
import { TabService } from '../tab.service';
import { RouteService } from '../route.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit, OnDestroy {

  private sidebarExpandedSub!: Subscription;
  private projectsFolderSub!: Subscription;
  private routerEventsSub!: Subscription;

  public pages = this.tabService.getAllPages();
  public expanded: boolean = this.tabService.sidebarExpanded;
  public explorerIconFill: string = "#ffffff";

  constructor(
    private tabService: TabService,
    private routeService: RouteService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
    
  ) { }

  ngOnInit(): void {

    /* calls method to subscribe to router event && process route params */
    this.getPage();

    this.sidebarExpandedSub = this.tabService.sidebarExpandedObs.subscribe(expanded => {
      /* calls method to set the explorer icon fill color to indicate expanded/collapsed sidebar,
        depending on observed status */
      this.setExplorerIconFill();
    });

    this.projectsFolderSub = this.tabService.projectsFolderObservable.subscribe(bool => {
      /* sets only existing folder page to closed if observed status is true */
      // TODO REFACTOR
      if(bool) {
        for(let i: number = 0; i < this.pages.length; i++) {
          if(this.pages[i].name == "projects") {
            this.pages[i].folderClosed = false;
            break;
          }
        }
      }
    });

  }

  ngOnDestroy(): void {
    /* manually unsubscribe from all observable subscriptions on component destruction */
    this.sidebarExpandedSub.unsubscribe();
    this.projectsFolderSub.unsubscribe();
    this.routerEventsSub.unsubscribe();
  }

  private setExplorerIconFill(): void {
    /* sets the explorer icon fill color to indicate expanded/collapsed sidebar,
        depending on current status */
    this.expanded = this.tabService.sidebarExpanded;
    if(this.expanded) this.explorerIconFill = "#ffffff";
    else this.explorerIconFill = "#808080";
  }

  public toggleFolder(page: Page): void {
    /* calls service method to toggle the opening/closing of provided folder page */
    this.tabService.toggleFolder(page);
  }

  public toggleSidebar(): void {
    /* calls method to expand/collapse sidebar menu - done via service as status shared
    &&  calls method to set the explorer icon fill color to indicate expanded/collapsed sidebar*/
    this.tabService.toggleSidebarExpanded();
    this.setExplorerIconFill();
  }

  public collapseSidebar(): void {
    /* calls method to collapse sidebar menu - done via service as status shared
      && calls method to set the explorer icon fill color to indicate collapsed sidebar*/
    this.tabService.collapseSidebar();
    this.setExplorerIconFill();
  }

  public fillExplorerIcon(): void {
    /* sets explorer icon fill on mouseenter, if sidebar collapsed
    (for hover effect) */
    if(!this.expanded) this.explorerIconFill = "#ffffff";
  }

  public unfillExplorerIcon(): void {
    /* resets explorer icon fill on mouseleave, if sidebar collapsed 
    (for hover effect) */
    if(!this.expanded) this.explorerIconFill = "#808080";
  }

  public onSelect(page: Page): void {
    /* calls service method to add selected pagge as tab
    && create a new tab scroll position setting object for page, if not added
      + assign current x and y scroll positions for current tab's content
    && slightly delays actions:
          - scroll selected tab into view,
          - set route path / URL/Location state */
    if(this.tabService.getTabs().length >= 1) {
      this.tabService.initializeTabScrollSetting();
      this.tabService.setTabScrollSettings();
    }    
    this.tabService.addTab(page);
    setTimeout(() => {
      this.tabService.scrollIntoView(page.id);
      this.routeService.setRoutePath();
    }, 1);
    this.tabService.scrollToTabScrollSettings();
  }

  /* METHODS TO RETRIEVE/HANDLE ROUTE PARAMS FROM ROUTER EVENT */
  // TODO REFACTOR/MIGRATE TO ROUTE SERVICE, after initial subscription in component (&& service method calls)
  private getPage(): void {
    /* subscribes to route event to retrieve route parameters
    && interprets params, opens the intended tab + any additional tabs 
    && updates URL/location state, if necessary, 
                                to prefix any parent folder ommissions
                              or replaces with an empty string */
    this.routerEventsSub = this.router.events.subscribe(val => {
      if(val instanceof NavigationEnd) {
        let r = this.route;
        
        while(r.firstChild) {
          r = r.firstChild;
        }
        r.params.subscribe(params => {
          if(params['first'])  console.warn("params['first'] == " + params['first']);
          if(params['second'])  console.warn("params['second'] == " + params['second']);
          if(params['third'])  console.warn("params['third'] == " + params['third']);

          // if first param only
          if(params['first'] && !params['second'] && !params['third']) {
            let pageIsValid = this.isPageValid(params['first']);
            if(pageIsValid) {
              console.warn("pageIsValid == " + params['first']);
              this.tabService.addTab(this.getPageByPath(params['first']));
              if(this.getPageByPath(params['first']).parentFolderId > 0) {
                let parentFolderID = this.getPageByPath(params['first']).parentFolderId;
                let parentFilepath = ""
                this.tabService.allPages.forEach(element => {
                  if(element.id == parentFolderID) parentFilepath = element.filepath;
                });
                let newFilepath = parentFilepath + "/" + this.getPageByPath(params['first']).filepath;
                this.location.replaceState(newFilepath);
                this.tabService.openFolder("projects", true);   
              }
            }
            else { // if only param is a folder path, folder's list item in nav sidebar menu will be expanded 
              if(this.getPageByPath(params['first']).folder) {
                this.tabService.openFolder(params['first'], false)
              }
              else this.location.replaceState('');
            }            
          }

          // if first and second params
          if(params['first'] && params['second'] && !params['third']) {
            let pageIsValid = this.isPageValid(params['first']);
            let subPageIsValid = this.isPageValid(params['second']);
            let firstIsFolder = false;
            if(this.getPageByPath(params['first']).folder) firstIsFolder = true;
            
            // for folder + subpage
            if(firstIsFolder && subPageIsValid) {
              let parentFolderID = this.getPageByPath(params['second']).parentFolderId;
              let parentFilepath = ""
              this.tabService.allPages.forEach(element => {
                if(element.id == parentFolderID) parentFilepath = element.filepath;
              });
              let newFilepath = parentFilepath + "/" + this.getPageByPath(params['second']).filepath;
              this.location.replaceState(newFilepath);
              this.tabService.addTab(this.getPageByPath(params['second']));
              this.tabService.openFolder("projects", true);
            }            
            // for page + no subpage (second param expected to be other tabIDs)
            if(pageIsValid && !subPageIsValid) {
              this.validateTabIDs(params['second'], params['first']);
              if(this.getPageByPath(params['first']).parentFolderId > 0) {
                let parentFolderID = this.getPageByPath(params['first']).parentFolderId;
                let parentFilepath = ""
                this.tabService.allPages.forEach(element => {
                  if(element.id == parentFolderID) parentFilepath = element.filepath;
                });
                let newFilepath = parentFilepath 
                  + "/" + this.getPageByPath(params['first']).filepath
                  + "/" + params['second'];
                this.location.replaceState(newFilepath);
                this.tabService.openFolder("projects", true);
              }
            }
          }

          // if first, second and third params
          if(params['first'] && params['second'] && params['third']) {
            let pageIsValid = this.isPageValid(params['first']);
            let subPageIsValid = this.isPageValid(params['second']);
            // for expected folder + subpage + tabIDs
            if(!pageIsValid && subPageIsValid) {
              if(this.getPageByPath(params['first']).folder) {
                this.validateTabIDs(params['third'], params['second']);
                if(this.getPageByPath(params['second']).parentFolderId > 0) {
                  let parentFolderID = this.getPageByPath(params['second']).parentFolderId;
                  let parentFilepath = ""
                  this.tabService.allPages.forEach(element => {
                    if(element.id == parentFolderID) parentFilepath = element.filepath;
                  });
                  let newFilepath = parentFilepath 
                  + "/" + this.getPageByPath(params['second']).filepath
                  + "/" + params['third'];
                  this.location.replaceState(newFilepath);
                  this.tabService.openFolder("projects", true);
                }
              }
              else this.location.replaceState('');
            }
          }
        });
      }
    })
  }

  private isPageValid(pagePath: string): boolean {
    /* checks if provided route event param path is a valid page
    && returns outcome */
    let isValid: boolean = false;
    this.pages.forEach(element => {
      if(pagePath == element.filepath && !element.folder) {
        isValid = true;
      }
      if(element.folder) {
        element.subPages.forEach(subElement => {
          if(pagePath === subElement.filepath && !subElement.folder) isValid = true;
        });
      }
    });
    return isValid;
  }

  private getPageByPath(pagePath: string): any {
    for(let i: number = 0; i < this.pages.length; i++) {
      if(pagePath == this.pages[i].filepath) {
        return this.pages[i];
      }
      if(this.pages[i].folder) {
        for(let j: number = 0; j < this.pages[i].subPages.length; j++) {
          if(pagePath == this.pages[i].subPages[j].filepath) {
            return this.pages[i].subPages[j];
          }
        }
      }
    }
    return;
  }

  private validateTabIDs(tabIDs: string, selectedPagePath: string): void {
    /* extracts tabIDs from provided route param string && adds to an array to loop through,
      then checks if all are valid tab IDs && if target selected page's ID is included,
        if yes to both, then calls relevant methods to add each tab and reselect target page
        if no to either, replaces URL/location state with empty string  */
    let arrayOfTabIDs: number[] = [];
    let tabID: string = ""

    for(let i: number = 0; i < tabIDs.length; i++) {
      if((tabIDs[i] != "-" && (!isNaN(parseInt(tabIDs[i]))))) {
        tabID += tabIDs[i];
        tabIDs = tabIDs.substring(i + 1);
        i--;
        if(i == (tabIDs.length - 1) && this.isTabIDValid(parseInt(tabID))) {
          arrayOfTabIDs.push(parseInt(tabID));
        }
        continue;
      }
      if(tabIDs[i] == "-") {
        if(!isNaN(parseInt(tabID))) {
          let tabIDasNumber = parseInt(tabID);
          if(this.isTabIDValid(tabIDasNumber)) arrayOfTabIDs.push(tabIDasNumber);  
        }
        tabID = ""; 
        tabIDs = tabIDs.substring(i + 1);
        i--;
        continue;
      }
      if(i == (tabIDs.length - 1)) {
        if(!isNaN(parseInt(tabID))) {
          let tabIDasNumber = parseInt(tabID);
          if(this.isTabIDValid(tabIDasNumber)) arrayOfTabIDs.push(tabIDasNumber);
        }
        continue;
      }
      if(isNaN(parseInt(tabIDs[i])) && tabIDs[i] != "-") {
        tabIDs = tabIDs.substring(i + 1);
        i--;
        continue;
      }
    }
    if(this.isSelectedTabListed(arrayOfTabIDs, selectedPagePath)) {
      arrayOfTabIDs.forEach(element => {
        this.tabService.addTab(this.tabService.getPageByID(element));
      });
      this.tabService.setTerminalLog(this.getPageByPath(selectedPagePath));
      this.tabService.setSelectedTab(this.getPageByPath(selectedPagePath));
      this.tabService.scrollIntoView(this.getPageByPath(selectedPagePath).id);
    }
    if(!this.isSelectedTabListed(arrayOfTabIDs, selectedPagePath)) {
      this.location.replaceState('');  
    }
  }

  private isTabIDValid(tabID: number): boolean {
    /* loops through every page && checks if provided number is a valid page ID
    returns outcome */
    let isTabIDValid: boolean = false;

    for(let i: number = 0; i < this.pages.length; i++) {
      if(this.pages[i].id == tabID) {
        isTabIDValid = true;
        break;
      }
      if(this.pages[i].folder) {
        for(let j: number = 0; j < this.pages[i].subPages.length; j++) {
          if(this.pages[i].subPages[j].id == tabID) {
            isTabIDValid = true;
            break;
          }
        }
      }
    }

    return isTabIDValid;
  }

  private isSelectedTabListed(arrayOfTabIDs: number[], pagePath: string): boolean {
    /* loops through provided array of tab IDS 
    && checks if provided page path string can return a page with matching ID
    returns outcome */
    let isListed = false;
    arrayOfTabIDs.forEach(element => {
      if(this.getPageByPath(pagePath).id == element) isListed = true;
    });
    return isListed;
  }

}
