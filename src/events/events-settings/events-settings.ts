import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {EventService} from '../../services/event.service';
import {DatePicker} from '@ionic-native/date-picker';

@Component({
  templateUrl: 'events-settings.html'
})
export class EventsSettings {
  constructor(public viewCtrl: ViewController,
              private eventService: EventService,
              private datePicker: DatePicker) {
  }

  today() {
    var since = new Date();
    since.setHours(0, 0, 0, 0);
    var until = new Date(since.getTime());
    until.setDate(until.getDate() + 1);
    this.eventService.updateDateInterval({
      since: since,
      until: until
    });
    this.viewCtrl.dismiss();
  }

  tomorrow() {
    var since = new Date();
    since.setHours(0, 0, 0, 0);
    since.setDate(since.getDate() + 1);
    var until = new Date(since.getTime());
    until.setDate(until.getDate() + 1);
    this.eventService.updateDateInterval({
      since: since,
      until: until
    });
    this.viewCtrl.dismiss();
  }

  weekend() {
    var since = new Date();
    since.setHours(0, 0, 0, 0);
    since.setDate(since.getDate() + (12 - since.getDay()) % 7);
    var until = new Date(since.getTime());
    until.setDate(until.getDate() + 2);
    this.eventService.updateDateInterval({
      since: since,
      until: until
    });
    this.viewCtrl.dismiss();
  }

  pick() {
    this.datePicker.show({
      mode: 'date',
      date: this.eventService.getDateInterval().since
    })
      .then((since: Date) => {
        since.setHours(0, 0, 0, 0);
        var until = new Date(since.getTime());
        until.setDate(until.getDate() + 1);
        this.eventService.updateDateInterval({
          since: since,
          until: until
        });
      })
    this.viewCtrl.dismiss();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
