import {EventService} from "../../services/event.service";
import {Component} from '@angular/core';
import {EventItem} from "../event-item/event-item.component";
import {EventsSettings} from "../events-settings/events-settings";

@Component({
  templateUrl: 'build/events/events-page/events-page.component.html',
  directives: [EventItem],
  providers: [EventsSettings]
})

export class EventsPage {

  events = [];

  constructor(private eventService: EventService,
              private eventsSettings: EventsSettings) {
    eventService.events$.subscribe(events => this.events = events)
  }

  doRefresh(refresher) {
    this.eventService.refreshEvents().then(complete => refresher.complete());
  }

}
