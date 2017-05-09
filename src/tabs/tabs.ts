import {Component} from '@angular/core';
import {EventsPage} from '../events/events-page/events-page.component';
import {MapPage} from '../map/map-page/map-page.component';
import {LocationService} from "../services/location.service";
import {EventService} from "../services/event.service";
import {LoadingController} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = EventsPage;
  tab2Root: any = MapPage;

  private loader;

  constructor(private locationService: LocationService,
              private eventService: EventService,
              public loadingCtrl: LoadingController) {
    locationService.init()
    eventService.loading$.subscribe(loading => {
      if (loading) {
        this.loader = this.loadingCtrl.create({
          content: "Carregando eventos...",
        });
        this.loader.present()
      } else {
        this.loader.dismiss()
      }
    })
  }
}
