import {EventService} from "../../services/event.service";
import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {EventDetailPage} from "../event-detail/event-detail.component";
import {EventItem} from "../event-item/event-item.component";

@Component({
  templateUrl: 'build/events/events-page/events-page.component.html',
  directives: [EventItem]
})

export class EventsPage {

  events;

  constructor(private eventService: EventService, private navCtrl: NavController) {
    eventService.events$.subscribe(events => this.events = events)
  }

}
