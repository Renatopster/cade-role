import {EventService} from "../shared/event.service";
import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {EventDetailPage} from "../event-detail/event-detail.component";
import {CalendarPipe} from "angular2-moment";

@Component({
  templateUrl: 'build/events/events-page/events-page.component.html',
  pipes: [CalendarPipe],
  providers: [EventService]
})

export class EventsPage {

  events;

  constructor(private eventService: EventService, private navCtrl: NavController) {
    eventService.getEvents().then(events => {
      this.events = events;
    });
  }

  onSelect(event) {
    this.navCtrl.push(EventDetailPage, {
      event: event
    });
  }


}
