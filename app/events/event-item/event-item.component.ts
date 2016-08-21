import {Component, Input} from '@angular/core';
import {CalendarPipe} from "angular2-moment";
import {EventDetailPage} from "../event-detail/event-detail.component";
import {NavController} from "ionic-angular";

@Component({
  selector: 'event-item',
  templateUrl: 'build/events/event-item/event-item.component.html',
  pipes: [CalendarPipe]
})

export class EventItem {
  @Input()
  event;

  constructor(private navCtrl: NavController) {

  }

  onSelect(event) {
    this.navCtrl.push(EventDetailPage, {
      event: event
    });
  }
}
