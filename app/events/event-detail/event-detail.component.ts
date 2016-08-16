import {Component} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";

@Component({
  templateUrl: 'build/events/event-detail/event-detail.component.html',
})

export class EventDetailPage {

  event;

  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.event = navParams.get('event');
  }

}
