import {Component, Input} from '@angular/core';
import {CalendarPipe} from 'angular2-moment';
import {EventDetailPage} from '../event-detail/event-detail.component';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'event-item',
  templateUrl: 'event-item.component.html'
})

export class EventItem {
  @Input()
  event: Event;

  constructor(private navCtrl: NavController) {

  }

  onSelect(event) {
    this.navCtrl.push(EventDetailPage, {
      event: event
    });
  }
}
