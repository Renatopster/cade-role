import {EventService} from '../../services/event.service';
import {Component} from '@angular/core';

@Component({
  templateUrl: 'events-page.component.html'
})

export class EventsPage {

  events = [];

  constructor(private eventService: EventService) {
    eventService.events$.subscribe(events => this.events = events);
  }

  doRefresh(refresher) {
    this.eventService.refreshEvents().then(complete => refresher.complete());
  }

}
