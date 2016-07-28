import {Component} from '@angular/core';
import {EventsPage} from '../events/events';
import {MapPage} from '../map/map';
import {SearchPage} from '../search/search';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = EventsPage;
    this.tab2Root = MapPage;
    this.tab3Root = SearchPage;
  }
}
