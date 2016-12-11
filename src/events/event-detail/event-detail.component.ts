import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {Event} from '../Event';

@Component({
  templateUrl: 'event-detail.component.html'
})

export class EventDetailPage {

  event: Event;

  constructor(private navCtrl: NavController, navParams: NavParams) {
    this.event = navParams.get('event');
  }

}
