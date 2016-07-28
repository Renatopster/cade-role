import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/events/events.html'
})
export class EventsPage {
  constructor(private navCtrl: NavController) {
    events = this.getEvents();
  }
}
