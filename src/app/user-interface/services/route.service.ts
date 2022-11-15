import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { TabService } from './tab.service';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private location: Location, private tabService: TabService) { }

  public setRoutePath(): void {
    /* updates URL/location filepath/state, 
    if parent folder name does not precede subPage route param,
    or if no pages/tabs are open */
    if(this.tabService.getTabs().length > 0) {
      let tabIDs = "";
      if(this.tabService.tabIDsString.length > 2) tabIDs = this.tabService.tabIDsString;
      let newFilepath = this.tabService.getSelectedTab().filepath + "/" + tabIDs;
      if(this.tabService.getSelectedTab().parentFolderId > 0) {
        let parentFolderID = this.tabService.getSelectedTab().parentFolderId;
        let parentFilepath = ""
        this.tabService.allPages.forEach(element => {
          if(element.id == parentFolderID) parentFilepath = element.filepath;
        });
        newFilepath = parentFilepath + "/" + this.tabService.getSelectedTab().filepath + "/" + tabIDs;
      }
      this.location.replaceState(newFilepath);
    }
    else this.location.replaceState('');
    return;
  }

  public manageRouteParams(params: Params): void {
    /*
    interprets provided route params, opens the intended tab + any additional tabs 
    && updates URL/location state, if necessary, 
                                to prefix any parent folder ommissions
                              or replaces with an empty string, if params not valid
    */

          // if first param only
          if(params['first'] && !params['second'] && !params['third']) {
            let pageIsValid = this.tabService.isPageValid(params['first']);
            if(pageIsValid) {
              this.tabService.addTab(this.tabService.getPageByPath(params['first']));
              if(this.tabService.getPageByPath(params['first']).parentFolderId > 0) {
                let parentFolderID = this.tabService.getPageByPath(params['first']).parentFolderId;
                let parentFilepath = ""
                this.tabService.allPages.forEach(element => {
                  if(element.id == parentFolderID) parentFilepath = element.filepath;
                });
                let newFilepath = parentFilepath + "/" + this.tabService.getPageByPath(params['first']).filepath;
                this.location.replaceState(newFilepath);
                this.tabService.openFolder("projects", true);   
              }
            }
            else { // if only param is a folder path, folder's list item in nav sidebar menu will be expanded 
              if(this.tabService.getPageByPath(params['first']).folder) {
                this.tabService.openFolder(params['first'], false)
              }
              else this.location.replaceState('');
            }            
          }

          // if first and second params
          if(params['first'] && params['second'] && !params['third']) {
            let pageIsValid = this.tabService.isPageValid(params['first']);
            let subPageIsValid = this.tabService.isPageValid(params['second']);
            let firstIsFolder = false;
            if(this.tabService.getPageByPath(params['first']).folder) firstIsFolder = true;
            
            // for folder + subpage
            if(firstIsFolder && subPageIsValid) {
              let parentFolderID = this.tabService.getPageByPath(params['second']).parentFolderId;
              let parentFilepath = ""
              this.tabService.allPages.forEach(element => {
                if(element.id == parentFolderID) parentFilepath = element.filepath;
              });
              let newFilepath = parentFilepath + "/" + this.tabService.getPageByPath(params['second']).filepath;
              this.location.replaceState(newFilepath);
              this.tabService.addTab(this.tabService.getPageByPath(params['second']));
              this.tabService.openFolder("projects", true);
            }            
            // for page + no subpage (second param expected to be other tabIDs)
            if(pageIsValid && !subPageIsValid) {
              this.tabService.validateTabIDs(params['second'], params['first']);
              if(this.tabService.getPageByPath(params['first']).parentFolderId > 0) {
                let parentFolderID = this.tabService.getPageByPath(params['first']).parentFolderId;
                let parentFilepath = ""
                this.tabService.allPages.forEach(element => {
                  if(element.id == parentFolderID) parentFilepath = element.filepath;
                });
                let newFilepath = parentFilepath 
                  + "/" + this.tabService.getPageByPath(params['first']).filepath
                  + "/" + params['second'];
                this.location.replaceState(newFilepath);
                this.tabService.openFolder("projects", true);
              }
            }
          }

          // if first, second and third params
          if(params['first'] && params['second'] && params['third']) {
            let pageIsValid = this.tabService.isPageValid(params['first']);
            let subPageIsValid = this.tabService.isPageValid(params['second']);
            // for expected folder + subpage + tabIDs
            if(!pageIsValid && subPageIsValid) {
              if(this.tabService.getPageByPath(params['first']).folder) {
                this.tabService.validateTabIDs(params['third'], params['second']);
                if(this.tabService.getPageByPath(params['second']).parentFolderId > 0) {
                  let parentFolderID = this.tabService.getPageByPath(params['second']).parentFolderId;
                  let parentFilepath = ""
                  this.tabService.allPages.forEach(element => {
                    if(element.id == parentFolderID) parentFilepath = element.filepath;
                  });
                  let newFilepath = parentFilepath 
                  + "/" + this.tabService.getPageByPath(params['second']).filepath
                  + "/" + params['third'];
                  this.location.replaceState(newFilepath);
                  this.tabService.openFolder("projects", true);
                }
              }
              else this.location.replaceState('');
            }
          }
  }

  /* TODO REFACTOR/MIGRATE METHODS TO HANDLE ROUTE PARAMS FROM ROUTER EVENT,
  CURRENTLY ACTIVE IN SideNavbarComponent, AFTER COMPONENT'S RETRIEVAL - REPLACE W/ THIS()'s */
}
