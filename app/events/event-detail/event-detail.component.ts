import {Component} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {CalendarPipe, DateFormatPipe} from "angular2-moment";
import {Event} from "../Event";

@Component({
  templateUrl: 'build/events/event-detail/event-detail.component.html',
  pipes: [CalendarPipe, DateFormatPipe],
})

export class EventDetailPage {

  event: Event;

  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.event = navParams.get('event');
  }

}
