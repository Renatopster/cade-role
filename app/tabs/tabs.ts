import {Component} from '@angular/core';
import {EventsPage} from "../events/events-page/events-page.component";
import {MapPage} from "../map/map-page/map-page.component";

@Component({
  templateUrl: 'build/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = EventsPage;
  tab2Root: any = MapPage;

  constructor() {
  }
}
