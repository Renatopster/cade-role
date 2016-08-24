import {ViewController} from "ionic-angular";
import {Component} from "@angular/core";

@Component({
  templateUrl: "build/events/events-settings/events-settings.html"
})
export class EventsSettings {
  constructor(public viewCtrl: ViewController) {
  }

  today() {
    console.log('today');
    this.viewCtrl.dismiss();
  }

  tomorrow() {
    console.log('tomorrow');
    this.viewCtrl.dismiss();
  }

  weekend() {
    console.log('weekend');
    this.viewCtrl.dismiss();
  }

  pick() {
    console.log('gonna pick');
    this.viewCtrl.dismiss();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
