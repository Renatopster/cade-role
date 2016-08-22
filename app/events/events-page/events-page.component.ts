import {EventService} from "../../services/event.service";
import {Component} from '@angular/core';
import {EventItem} from "../event-item/event-item.component";

@Component({
  templateUrl: 'build/events/events-page/events-page.component.html',
  directives: [EventItem]
})

export class EventsPage {

  events;

  constructor(private eventService: EventService) {
    eventService.events$.subscribe(events => this.events = events)
  }

  doRefresh(refresher) {
    this.eventService.getEvents().then(events => {
      this.events = events;
      refresher.complete();
    });
  }

}
