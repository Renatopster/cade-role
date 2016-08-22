import {EventService} from "../../services/event.service";
import {Component} from '@angular/core';
import {EventItem} from "../event-item/event-item.component";
import {MapPage} from "../../map/map-page/map-page.component";
import {NavController} from "ionic-angular";

@Component({
  templateUrl: 'build/events/events-page/events-page.component.html',
  directives: [EventItem]
})

export class EventsPage {

  events;

  constructor(private navCtrl: NavController, private eventService: EventService) {
    eventService.events$.subscribe(events => this.events = events)
  }

  goToMap() {
    this.navCtrl.setRoot(MapPage);
  }

  changeDateModal() {
    console.log('coming soon');
  }

  doRefresh(refresher) {
    this.eventService.getEvents().then(events => {
      this.events = events;
      refresher.complete();
    });
  }

}
