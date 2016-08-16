import {Component} from '@angular/core';
import {EventsPage} from '../../events/events-page/events-page.component';
import {MapPage} from '../../map/map-page/map-page.component';

@Component({
  templateUrl: 'build/shared/tabs/tabs.component.html'
})
export class TabsPage {

  private eventsRoot = EventsPage;
  private mapRoot = MapPage;
}
