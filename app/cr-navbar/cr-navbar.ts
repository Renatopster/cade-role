import {PopoverController} from "ionic-angular";
import {Component} from "@angular/core";
import {EventsSettings} from "../events/events-settings/events-settings";

@Component({
  selector: "cr-navbar",
  templateUrl: "build/cr-navbar/cr-navbar.html"
})
export class CrNavbar {
  constructor(private popoverController: PopoverController) {
  }

  title = 'Eventos';

  show(clickEvent) {
    let popover = this.popoverController.create(EventsSettings);
    popover.present({
      ev: clickEvent
    });
  }

}
