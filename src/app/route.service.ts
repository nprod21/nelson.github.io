import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { TabService } from './tab.service';

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

  /* TODO REFACTOR/MIGRATE METHODS TO HANDLE ROUTE PARAMS FROM ROUTER EVENT,
  CURRENTLY ACTIVE IN SideNavbarComponent, AFTER COMPONENT'S RETRIEVAL - REPLACE W/ THIS()'s */
}
