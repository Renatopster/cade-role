import {EventService} from "../../services/event.service";
import {Component} from '@angular/core';
import {NavController} from "ionic-angular";
import {EventDetailPage} from "../event-detail/event-detail.component";
import {CalendarPipe} from "angular2-moment";
import {LocationService} from "../../services/location.service";

@Component({
  templateUrl: 'build/events/events-page/events-page.component.html',
  pipes: [CalendarPipe],
  providers: [EventService]
})

export class EventsPage {

  events;

  constructor(private eventService: EventService, private locationService: LocationService, private navCtrl: NavController) {
    locationService.location$.subscribe(
      location => eventService.getEvents(location).then(
        events => this.events = events
      )
    );
  }

  onSelect(event) {
    this.navCtrl.push(EventDetailPage, {
      event: event
    });
  }


}
