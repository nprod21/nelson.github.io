import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Location } from '@angular/common';

import { Page } from '../models/page.interface';
import { PagesData } from '../data/pages-data';
import { TabScrollSetting } from '../models/tab-scroll-setting.interface';

import { TerminalService } from './terminal.service';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  /* PRIVATE PROPERTIES */

  private tabScrollSettings: TabScrollSetting[] = [];

  private tabIDs: string[] = [];

  private resetRequired: boolean = false;

  private counter: number = 3;

  private tabOpen: boolean = false;

  private sidebarExpandedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private viewToggleSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  private tabOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private constructSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  private tabIDsSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  private projectsFolderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 
  /* PUBLIC PROPERTIES */

  public tabs: Page[] = [];

  public tabIDsString: string = "";

  public allPages: Page[] = PagesData;

  public sidebarExpanded: boolean = true;

  public viewPosition: number = 0;

  public sidebarExpandedObs: Observable<boolean> = this.sidebarExpandedSubject.asObservable();

  public viewToggleObs: Observable<number> = this.viewToggleSubject.asObservable();

  public tabOpenObs: Observable<boolean> = this.tabOpenSubject.asObservable();

  public constructObservable: Observable<boolean> = this.constructSubject.asObservable();

  public tabIDObservabble: Observable<string> = this.tabIDsSubject.asObservable();

  public projectsFolderObservable: Observable<boolean> = this.projectsFolderSubject.asObservable();

  
  constructor(
    private location: Location,
    private terminalService: TerminalService
  ) { }

  /* PRIVATE METHODS */

  private resetSelectedTab(): void {
    // called if currently selected tab is closed
    /* if any tabs open:
        last tab will be auto selected + scrolled into view
        && associated log entries will be sent to terminal */ 
    let k: number = this.tabs.length - 1;
    if (this.tabs.length > 0) {
      this.tabs[k].selected = true;
      this.terminalService.pushLogEntry(this.tabs[k], true, false, this.tabs.length);
      this.scrollIntoView(this.tabs[k].id);
    }
  }

  private formatContent(selectedPage: Page): void {
    /* Loops through each character in provided page's written content
      && applies HTML <span class> + <br> formatting to stylize text like code */ 
    if(this.contentFormatted(selectedPage) === false){
      let formatCopy: string = '';
      let spanOpen: boolean = false;
      let indentCount: number = 0;
      let commentOpen: boolean = false;
      let blockOpen: boolean = false;
      let highlightOpen: boolean = false;
      let featureOpen: boolean = false;
      let underFeatures: boolean = false;
      let linkOpen: boolean = false;

      for (let i: number = 0; i < selectedPage.content.length; i++) {
        let charMatchEnders = false;
        if (selectedPage.content.charAt(i).match(/[\\]/)) {
          charMatchEnders = true;
          formatCopy += "<br>";
        }

        if(selectedPage.content[i] == "<" && selectedPage.content[i + 1] == "a") linkOpen = true;

        if(selectedPage.content[i] == "<"
        && selectedPage.content[i + 1] == "/"
        && selectedPage.content[i + 2] == "a"
        && selectedPage.content[i + 3] == ">") linkOpen = false;

        if(selectedPage.content.charAt(i).match(/[.!?;]/) && !linkOpen && !commentOpen) {
          charMatchEnders = true;
          if(selectedPage.content[i] != ";" && !blockOpen) indentCount = 0;
          if(highlightOpen) {
            highlightOpen = false;
            formatCopy += "</span>";
          }
          if(spanOpen && commentOpen == false) {
            formatCopy += "</span>";
            spanOpen = false;
          }
          formatCopy += selectedPage.content[i];
          formatCopy += "<br>";
          if(selectedPage.content[i + 1] != "\}") {
            if(selectedPage.content[i] == ";") {
              formatCopy += "<span class=\"text-line\"></span>";
              formatCopy += "<span class=\"indent";
              if(blockOpen) indentCount = 1;
              else if(!blockOpen) indentCount++;
              formatCopy += indentCount;
              formatCopy += "\">"
              spanOpen = true; 
            }  
          }
          
        }

        if(selectedPage.content.charAt(i).match(/[\]]/)) {
          if(spanOpen) {
            formatCopy += "</span>";
          }
          if(highlightOpen) formatCopy += "</span>";
        }

        if(
          selectedPage.content.charAt(i).match(/[/]/)
          && selectedPage.content.charAt(i + 1).match(/[*]/)
        ) {
          if(spanOpen) {
            formatCopy += "<span class=\"text-line\"></span>";
            formatCopy+= "<span class=\"comment indent";
            formatCopy += indentCount;
            formatCopy += "\">"
          }
          else if(spanOpen == false) formatCopy+= "<span class=\"comment\">";
          commentOpen = true;
        }
        if(
          selectedPage.content.charAt(i).match(/[*]/)
          && selectedPage.content.charAt(i + 1).match(/[/]/)
        ) {
          formatCopy += selectedPage.content[i];
          formatCopy += selectedPage.content[i + 1];
          i++;
          formatCopy+= "</span>";
          charMatchEnders = true;
          commentOpen = false;
          if(spanOpen) {
            formatCopy+= "</span>";
            spanOpen = false;
          }
          if(this.matchesKeyword(selectedPage.content, "/* FEATURES */", i) ||
          this.matchesKeyword(selectedPage.content, "/* CORE TECH SKILLS */", i)) {
            underFeatures = true;
            formatCopy += "<span class= \"feature\">";
            featureOpen = true;
          }
        }

        if (
          selectedPage.content.charAt(i).match(/[,{]/)) {
          if (spanOpen && commentOpen && highlightOpen == false) {
            formatCopy += "</span>";
            spanOpen = false;
          }

          if(highlightOpen) {
            formatCopy += "</span>";
            if(spanOpen) {
              formatCopy += "</span>";
              spanOpen = false;
            }
          }
          
          if(selectedPage.content.charAt(i).match(/[{]/)) {
            indentCount = 0;
            blockOpen = true;
            if(underFeatures) formatCopy += "</span>";
            if(featureOpen) featureOpen = false;
          }
          charMatchEnders = true;
          indentCount++; 
          if(selectedPage.content.charAt(i).match(/[,]/) && highlightOpen) indentCount = 8;
          if(selectedPage.content.charAt(i).match(/[,]/) && selectedPage.id == 2) indentCount = 7;
          formatCopy += selectedPage.content[i];
          formatCopy += "<br>";
          if(highlightOpen) {
            formatCopy+= "<span class=\"highlight\">";
          }
          
          if(commentOpen == false) {
            formatCopy += "<span class=\"text-line\"></span>";
            formatCopy += "<span class=\"indent";
            formatCopy += indentCount;
            formatCopy += "\">"
            spanOpen = true;  
          }
        }

        if(selectedPage.content.charAt(i).match(/[:]/)) {
          if(this.matchesKeyword(selectedPage.content, "highlight", i - 1)
          || this.matchesKeyword(selectedPage.content, "highlights", i - 1)
          || this.matchesKeyword(selectedPage.content, "summary", i - 1)
          || this.matchesKeyword(selectedPage.content, "features", i - 1)) {
            formatCopy += selectedPage.content[i];
            highlightOpen = true;
            formatCopy+= "<span class=\"highlight\">";
            i++;
          }
        }

        if(selectedPage.content.charAt(i).match(/[}]/)
        && underFeatures) {
          formatCopy += selectedPage.content[i];
          formatCopy += "<br>";
          charMatchEnders = true;
          formatCopy += "<span class= \"feature\">";     
        }
        if(selectedPage.content[i] == "[" && highlightOpen) {
          formatCopy += "</span>";
          formatCopy += selectedPage.content[i];
          formatCopy+= "<span class=\"highlight\">";
        }
        

        else if(charMatchEnders === false){
          formatCopy += selectedPage.content[i];
        }
      }

      for(let i: number = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].id === selectedPage.id) {
          this.tabs[i].content = formatCopy;
          this.tabs[i].contentFormatted = true;
        }
      }
    }
  }

  private contentFormatted(selectedPage: Page): boolean {
    /* checks if page's content has already been formatted/stylize
      - will be true if page has been opened during current session */ 
    let outcome: boolean = false;
      for (let i: number = 0; i < this.tabs.length; i++) {
        if (this.tabs[i].id === selectedPage.id) {
          outcome = this.tabs[i].contentFormatted;
        }
      }
    return outcome;
  }

  private matchesKeyword(fullString: string, keyword: string, fromIndex: number): boolean {
    /* loop backwards through fullString characters, starting from provided index
    checking if each char matches the corresponding char in given keyword
    - false returned instantly if condition not met
    */
    let isMatch: boolean = false;
    for(let i: number = (keyword.length - 1); i > 0; i--) {
      if(fullString[fromIndex] == keyword[i]) {
        isMatch = true;
        fromIndex--;
      }
      else {
        return false;
      }
    }
    return isMatch;
  }

  private getTabIndexByID(tabID: number): number {
    /* returns index of provided tabID, in array of open tabs */ 
    let tabIndex: number = -1;
    for(let i: number = 0; i < this.tabs.length; i++) {
      if(this.tabs[i].id == tabID) {
        tabIndex = i;
        break;
      }
    }
    return tabIndex;
  }

  private setTabIDs(tabID: number): void {
    /* adds hyphen-separated tabID to array of tab IDs,
      reassigns joined array to string of tabIDs,
      calls method to make observable update via behavior subject */ 
    let length = this.tabIDs.length;
    if(length != 0 && this.tabIDs[length - 1] != "-") this.tabIDs.push("-");
    this.tabIDs.push(tabID.toString());
    this.tabIDsString = this.tabIDs.join('');
    this.updateTabIDSubject();
    return;
  }


  /* PRIVATE BEHAVIOUR SUBJECT / OBSERVABLE SETTERS */

  private setTabOpen(): void {
    /* sets status of tabOpen property and sends observable update via behaviour subject */ 
    if(this.tabs.length > 0) this.tabOpen = true;
    else this.tabOpen = false;
    this.tabOpenSubject.next(this.tabOpen);
    return;
  }

  private updateTabIDSubject(): void {
    /* if over 1 tabID listed in tabID string, oberservable update made via behaviour subject */ 
    if(this.tabIDsString.length > 2) {
      this.tabIDsSubject.next(this.tabIDsString);
    }
    return;
  }


  /* PUBLIC METHODS */

  public addTab(clickedPage: Page): void {
    /* adds clicked page to open tabs, if not added
      && applies text styling, if not done
      && sets clicked page as selected tab + updates tabOpen property/observable */ 
      if (clickedPage.contentFormatted === false) {
        clickedPage.contentLineCount = this.countLines(clickedPage.content);
      }
      if (this.tabs.length === 0) {
        this.terminalService.pushLogEntry(clickedPage, true, false, this.tabs.length);
        this.tabs.push(clickedPage);
        this.setTabIDs(clickedPage.id);
        // this.addTabScrollSetting(clickedPage.id);
      }
      else {
        let pageAdded: boolean = false;
        for (let i: number = 0; i < this.tabs.length; i++){
          if(this.tabs[i].id === clickedPage.id) {
            pageAdded = true;
          }
        }
        if (pageAdded === false) {
          this.tabs.push(clickedPage);
          this.setTabIDs(clickedPage.id);
          // this.addTabScrollSetting(clickedPage.id);
        }
        this.setTerminalLog(clickedPage);
      }
      this.setSelectedTab(clickedPage);
      this.formatContent(clickedPage);
      this.setTabOpen();
      return;
  }

  public openFolder(page: string, subPageSelected: boolean): void {
    /* if provided page is a folder,
        it is deselected/selected if it's subPage is selected/deselected */ 
    if(this.getPageByName(page).folder) { 
      for(let i: number = 0; i < this.allPages.length; i++) {
        if(this.allPages[i].name == page) {
          this.allPages[i].iconClass = 'fa fa-folder-open';
          if(subPageSelected) this.allPages[i].selected = false;
          else this.allPages[i].selected = true;
        }
      }
      this.projectsFolderSubject.next(true);
    };
    return;
  }

  public removeTab(closedTab: Page): void {
    /* removes provided tab from array of tabs + tabIDs && tab's scroll position settings
      && calls terminalService to log relevant destruction
      if provided tab was selected, calls methods to
        - reset selected tab
        - toggle folder selection (if reselected tab is subPage)
        - updates tabOpen property and observable via observables */ 
  this.resetRequired = closedTab.selected;
  for(let i: number = 0; i < this.tabs.length; i++) {
    if(this.tabs[i].id === closedTab.id) {
      this.tabs[i].selected = false;
      this.tabs.splice(i, 1);
      this.removeTabID(closedTab.id);
    }
  }
  this.terminalService.pushLogEntry(closedTab, false, false, this.tabs.length);
  if(this.resetRequired) {
    this.resetSelectedTab();
    this.scrollToTabScrollSettings();
  }
  this.toggleFolderSelection(closedTab);
  this.setTabOpen();
  setTimeout(() => this.removeTabScrollSetting(closedTab.id), 2); // delayed to not interfere with call to scrollTabSettings, if reselection required
  return;
  }

  public toggleFolderSelection(clickedPage: Page): void {
    /* toggles folder selection, to highlight it in menu */
    /* if clicked page is a folder &&
        if it is closed, set clicked page as selected, to highlight it in menu
        else deselect it */ 
    if (clickedPage.folder) {
      if (clickedPage.folderClosed) {
        if(this.getSelectedTab().parentFolderId == clickedPage.id) {
          clickedPage.selected = true;
        }
      }
      else {
        clickedPage.selected = false;
      }
    }
    /* if clicked page is not a folder
        - loop through all pages
          - for all folder pages,
            - if page is selected, deselect it if subPage not selected
            - if page is not selected, select it if subPage is selected*/
    else if (clickedPage.folder == false) {
      for (let i: number = 0; i < this.allPages.length; i++) {
        if (this.allPages[i].folder) {
          if (this.allPages[i].selected) {
            let subPageSelected: boolean = false;
            if(this.getSelectedTab().parentFolderId > 0
            || this.getSelectedTab().parentFolderId == clickedPage.id) {
              subPageSelected = true;
            }
            if(subPageSelected === false) this.allPages[i].selected = false;
          }
        }
      }
    }
    return;
  }

  public toggleFolder(page: Page): void {
    /* toggles folder open/closed to expand/collapse subPages in menu */ 
    for (let i: number = 0; i < this.allPages.length; i++) {
      if(page.id === this.allPages[i].id) {
        if(this.allPages[i].folderClosed === true) {
          this.allPages[i].folderClosed = false;
          this.allPages[i].iconClass = 'fa fa-folder-open';
        }
        else {
          this.allPages[i].folderClosed = true;
          this.allPages[i].iconClass = 'fa fa-folder';
        }
      }
    }
    this.toggleFolderSelection(page);
    return;
  }

  public countLines(text: String): number {
    /* loop through text string (array of characters) 
    if character in text matches punctuation used for line breaks, 
    or ends with comment closure
    increment line count */
    this.counter = 0;
    let linkOpen: boolean = false;
    let commentOpen: boolean = false;
    for (let i: number = 0; i < text.length; i++) {
      if(text[i] == "<" && text[i + 1] == "a") linkOpen = true;
      if(text[i] == "<"
      && text[i + 1] == "/"
      && text[i + 2] == "a"
      && text[i + 3] == ">") linkOpen = false;
      if(text[i] == "/" && text[i + 1] == "*") commentOpen = true;
      if(text[i] == "*" && text[i + 1] == "/") commentOpen = false;
      if((text.charAt(i).match(/[.,;{}\\]/))
          && !linkOpen
          && !commentOpen
      ) {
        this.counter++;
      }
      if(commentOpen && text.charAt(i).match(/[\\]/)) this.counter++;
    }
    if(this.counter > 0) this.counter++;
    return this.counter;
  }

  public btnToggleLeft(): void { 
    /* toggles preview component options button to the left */  
    for (let i: number = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].selected) {
        this.tabs[i].previewToggle = '0';
        break;
      }
    }    
  }

  public btnToggleRight(): void {  
    /* toggles preview component options button to the right */  
    for (let i: number = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].selected) {
        this.tabs[i].previewToggle = '110px';
        break;
      }
    } 
  }

  public assignComponent(component: string): void {
    /* calls button toggle left/right, depending on input component */ 
    if (component === 'contact-email') {
      this.btnToggleRight();
    }
    if (component === 'contact-linkedin') {
      this.btnToggleLeft();
    }
  }

  public scrollIntoView(id: number): void {
    /* calls element.scrollIntoView() with a minimal delay to resolve non-function */ 
    setTimeout(() => {
      document.getElementById(id.toString())?.scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "nearest"
      });
    }, 1);
    return;
  }

  public repositionTab(draggedTabID: number, droppedOnTabID: number, droppedToEnd?: boolean): void {
    /* either pushes dragged tab to end of array of tabs, 
      or splice adds tab into array of tabs at index of dropped on tab,
      then splice removes dragged tab from array of tabs */ 
    let draggedTabIndex: number = this.getTabIndexByID(draggedTabID);
    if(droppedToEnd) {
      this.tabs.push(this.getPageByID(draggedTabID));
    }
    else if(droppedOnTabID > 0){
      let droppedToIndex: number = this.getTabIndexByID(droppedOnTabID);
      this.tabs.splice(droppedToIndex, 0, this.getPageByID(draggedTabID));
      if(draggedTabIndex > droppedToIndex) draggedTabIndex++;
    }    
    this.tabs.splice(draggedTabIndex, 1);
    return;
  }

  public initializeTabScrollSetting(): void {
    /* creates new TabScrollSetting object for provided tabID
      && adds to array of tabScrollSettings */ 
    // let targetTabID!: number;
    // if(!id) {
    //   let selectedTabID: number = this.getSelectedTab().id;
    //   targetTabID = selectedTabID; 
    // }
    // else targetTabID = id;
    let selectedTabID: number = this.getSelectedTab().id;
    if(this.getTabScrollSettingIndex(selectedTabID) < 0){
      let newTabScrollSetting: TabScrollSetting = {
        tabID:  selectedTabID,
        bodyTop: 0,
        bodyLeft: 0,
        previewTop: 0,
        previewLeft: 0
      }
      this.tabScrollSettings.push(newTabScrollSetting);
    }
  }
  
  public scrollToTabScrollSettings(): void {
    /* retrieves stored x and y scroll positions of selected tab's text/content
    && scrolls to these coordinates, smoothly */
    let selectedTabID: number;
    let settingIndex: number;
    setTimeout(() => { // setTimeout required as getSelectedTab() caused tab closure issues
      selectedTabID= this.getSelectedTab().id;
      settingIndex = this.getTabScrollSettingIndex(selectedTabID);  
    }, 1);
    setTimeout(() => {
      if(settingIndex >= 0) {
        let contentX: number = this.tabScrollSettings[settingIndex].bodyLeft;
        let contentY: number = this.tabScrollSettings[settingIndex].bodyTop;
        // let previewX: number = this.tabScrollSettings[settingIndex].previewLeft; // disabled for now
        // let previewY: number = this.tabScrollSettings[settingIndex].previewTop;  // disabled for now
          document.getElementById("content")?.scrollTo({
            top: contentY,
            left: contentX,
            behavior: 'smooth'
          });
          document.getElementById("previewcontainer")?.scrollTo(0, 0);
      }
      else {
        document.getElementById("content")?.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        document.getElementById("previewcontainer")?.scrollTo(0, 0);
      }
    }, 2);
    return;
  }

  public removeTabScrollSetting(tabID: number): void {
    /* removes tab scroll setting from array of tab scroll settings, if present */ 
    let removeIndex: number = this.getTabScrollSettingIndex(tabID);
    if(removeIndex >= 0) this.tabScrollSettings.splice(removeIndex, 1);
  }

  public isPageValid(pagePath: string): boolean {
    /* checks if provided route event param path is a valid page
    && returns true/false outcome */
    let isValid: boolean = false;
    pagePath = pagePath.toLocaleUpperCase();
    this.allPages.forEach(element => {
      let elementFilepath: string = element.filepath.toLocaleUpperCase();
      if(pagePath == elementFilepath && !element.folder) {
        isValid = true;
      }
      if(element.folder) {
        element.subPages.forEach(subElement => {
          let subElementFilepath: string = subElement.filepath.toLocaleUpperCase();
          if(pagePath === subElementFilepath && !subElement.folder) isValid = true;
        });
      }
    });
    return isValid;
  }

  public validateTabIDs(tabIDs: string, selectedPagePath: string): void {
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
        this.addTab(this.getPageByID(element));
      });
      this.setTerminalLog(this.getPageByPath(selectedPagePath));
      this.setSelectedTab(this.getPageByPath(selectedPagePath));
      this.scrollIntoView(this.getPageByPath(selectedPagePath).id);
    }
    if(!this.isSelectedTabListed(arrayOfTabIDs, selectedPagePath)) {
      this.location.replaceState('');  
    }
  }

  private isTabIDValid(tabID: number): boolean {
    /* loops through every page && checks if provided number is a valid page ID
    returns outcome */
    let isTabIDValid: boolean = false;

    for(let i: number = 0; i < this.allPages.length; i++) {
      if(this.allPages[i].id == tabID) {
        isTabIDValid = true;
        break;
      }
      if(this.allPages[i].folder) {
        for(let j: number = 0; j < this.allPages[i].subPages.length; j++) {
          if(this.allPages[i].subPages[j].id == tabID) {
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


  /* PUBLIC GETTERS */

  public getAllPages(): Page[] {
    /* returns all pages */ 
    return this.allPages;
  }

  public getTabs(): Page[] {
    /* returns array of tabs */  
    return this.tabs;
  }

  public getSelectedTab(): any {
    /* returns currently selected tab */ 
    for (let i: number = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].selected) {
        return this.tabs[i];
      }
    }
    return;
  }

  public getSelectedTabIndex(): number {
    let index: number = 1;
    for(let i: number = 0; i < this.tabs.length; i++) {
      if(this.tabs[i].selected){
        index += i;
        break;
      }
    }
    return index;
  }

  public getPageByName(page: string): any {
    /* returns page matching name of provided string */ 
    for(let i: number = 0; i < this.allPages.length; i++) {
      if(page == this.allPages[i].name) return this.allPages[i];
      if(this.allPages[i].folder) {
        for(let j: number = 0; j < this.allPages[i].subPages.length; j++) {
          if(page == this.allPages[i].subPages[j].name) return this.allPages[i].subPages[j];
        }
      }
    }
    return;
  }

  public getPageByID(id: number): any {
    /* returns page matching ID of provided number */ 
    for(let i: number = 0; i < this.allPages.length; i++) {
      if(id == this.allPages[i].id) return this.allPages[i];
      if(this.allPages[i].folder) {
        for(let j: number = 0; j < this.allPages[i].subPages.length; j++) {
          if(id == this.allPages[i].subPages[j].id) return this.allPages[i].subPages[j];
        }
      }
    }
    return;
  }

  public getPageByPath(pagePathProvided: string): any {
    /* returns page match provided filepath value */
    pagePathProvided = pagePathProvided.toLocaleUpperCase();
    for(let i: number = 0; i < this.allPages.length; i++) {
      let pageFilePath = this.allPages[i].filepath.toLocaleUpperCase();
      if(pagePathProvided == pageFilePath) {
        return this.allPages[i];
      }
      if(this.allPages[i].folder) {
        for(let j: number = 0; j < this.allPages[i].subPages.length; j++) {
          let subPageFilePath = this.allPages[i].subPages[j].filepath.toLocaleUpperCase();
          if(pagePathProvided == subPageFilePath) {
            return this.allPages[i].subPages[j];
          }
        }
      }
    }
    return;
  }

  public getActiveComponent(page: Page): string {
    /* returns string of provided page's currently active component
      (for pages with component options, e.g. contact page) */ 
    let position: string = "";
    let activeComponent: string = "";
    this.tabs.forEach(element => {
      if(element.id == page.id) {
        position = element.previewToggle;
        if(position == "0") activeComponent = element.previewComponents[0];
        else activeComponent = element.previewComponents[1];
      }
    });
    return activeComponent;
  }

  public getTabIDsString(): string {
    return this.tabIDsString;
  }

  public getTabScrollSettingIndex(tabID: number): number {
    /* returns index of provided tabID's scroll settings, in array of tabScrollSettings */ 
    let index: number = -1;
    for(let i: number = 0; i < this.tabScrollSettings.length; i++) {
      if(this.tabScrollSettings[i].tabID == tabID) return i;
    }
    return index;
  }

  /* PUBLIC SETTER METHODS */

  public setSelectedTab(clickedPage: Page): void {
    /* store scroll positions of last tab, 
        if at least 2 tabs are open,
          before new tab is selected */
    let selectedTabID: number = 0;
    if(this.tabs.length > 1) selectedTabID = this.getSelectedTab().id;
    if(this.tabs.length > 1 && clickedPage.id != selectedTabID) {
      // this.setTabScrollSettings();
    } 
    /* loops through all tabs,
        - if one matches provided page's ID, tab is selected
        - else tab is deselected */
    for (let i: number = 0; i < this.tabs.length; i++){
      if(this.tabs[i].id === clickedPage.id) {
        this.tabs[i].selected = true;
      }
      else {
        this.tabs[i].selected = false;
      }
    }
    /* methods call to toggle folder, if necessary
    && scroll to newly selected tab's scroll settings */
    this.toggleFolderSelection(clickedPage);
    // this.scrollToTabScrollSettings();
    return;
  }

  public setTerminalLog(clickedPage: Page): void {
    /* if clicked page is not selected tab,
        - calls terminal service methods twice
          - firstly, to push destruction logs of currently selected tab,
          - secondly, to push construction logs of newly selected tab */ 
    let selectedTab = this.getSelectedTab();
    if(clickedPage.id != selectedTab.id) {
      this.terminalService.pushLogEntry(selectedTab, false, false, this.tabs.length);
      this.terminalService.pushLogEntry(clickedPage, true, false, this.tabs.length);
    }
    return;
  }

  public setTabDraggedOver(tabID: number, resetAll: boolean): void {
    /* sets provided tab's dragged over value to true
    && resets all other tab's dragged over values to false */ 
    if(resetAll == false) {
      for(let i: number = 0; i < this.tabs.length; i++) {
        if(this.tabs[i].id == tabID) this.tabs[i].draggedOver = true;
        else this.tabs[i].draggedOver = false;
      }  
    }
    else if(resetAll == true) {
      for(let i: number = 0; i < this.tabs.length; i++) {
        this.tabs[i].draggedOver = false;
      }  
    }
    return;
  }

  public setTabScrollSettings(): void {
    /* retrieves current x and y scroll positions of content and preview sections
    && assigns coordinates to associated tab in scroll settings array, if tab's settings have been initialized */
    
    let selectedTabID: number = this.getSelectedTab().id;
    let settingIndex = this.getTabScrollSettingIndex(selectedTabID);
    if(settingIndex >= 0) {
      let bodyTop: any = document.getElementById("content")?.scrollTop;
      let bodyLeft: any = document.getElementById("content")?.scrollLeft;
      let previewTop: any = document.getElementById("previewcontainer")?.scrollTop;
      let previewLeft: any = document.getElementById("previewcontainer")?.scrollLeft;
      // assigns retrieved scroll positions to settings object linked to current tab's ID
      this.tabScrollSettings[settingIndex].bodyTop = bodyTop;
      this.tabScrollSettings[settingIndex].bodyLeft = bodyLeft;
      this.tabScrollSettings[settingIndex].previewTop = previewTop;
      this.tabScrollSettings[settingIndex].previewLeft = previewLeft;
    }

    

    return;
  }


/* PUBLIC BEHAVIOUR SUBJECT / OBSERVABLE SETTERS */

  private removeTabID(tabID: number): void {
    /* removes provided tabID from array of tab IDs,
    && updates string of tab IDs
    && calls method to send updated tab IDs via behaviour subject / observable */ 
    for(let i: number = 0; i < this.tabIDs.length; i++) {
      if(tabID.toString() == this.tabIDs[i]) {
        let removeCount = 1;
        if(this.tabIDs.length > 1) removeCount++;
        if(i == this.tabIDs.length - 1) i--;
        this.tabIDs.splice(i, removeCount);
        this.tabIDsString = this.tabIDs.join('');
        this.updateTabIDSubject();
        break;
      }
    }
    return;
  }

  public refreshTabIDs(): void {
    /* resets array/string of tab IDs using array of tabs
    && calls method to send updated string of tab IDs via behaviour subject / observable */ 
    let length = this.tabs.length;
    this.tabIDs = [];
    for(let i: number = 0; i < length; i++) {
      this.tabIDs.push(this.tabs[i].id.toString())
      if(i < length - 1) this.tabIDs.push("-");
    }
    this.tabIDsString = this.tabIDs.join('');
    this.updateTabIDSubject();
    return;
  }

  public toggleSidebarExpanded(): void {
    /* toggles status of sidebarExpanded property 
    && sends property via behaviour subject/observable */ 
    this.sidebarExpanded = !this.sidebarExpanded;
    this.sidebarExpandedSubject.next(this.sidebarExpanded);
    return;
  }

  public collapseSidebar(): void {
    /* sets sidebarExpanded property to false
    && sends property via behaviour subject/observable */ 
    this.sidebarExpanded = false;
    this.sidebarExpandedSubject.next(this.sidebarExpanded);
    return;
  }

  public expandSidebar(): void {
    /* sets sidebarExpanded property to true
    && sends property via behaviour subject/observable */ 
    this.sidebarExpanded = true;
    this.sidebarExpandedSubject.next(this.sidebarExpanded);
    return;
  }

  public setViewPosition(): void {
    /* increments viewPosition property up to 2, then resets back to zero
    && sends property via behaviour subject/observable */ 
    if(this.viewPosition <= 1) {
      this.viewPosition++;
    } 
    else {
      this.viewPosition = 0;
    } 
    this.viewToggleSubject.next(this.viewPosition);
    return;
  }

}  