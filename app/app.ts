import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {LocationService} from "./services/location.service";
import {EventsPage} from "./events/events-page/events-page.component";
import {MapPage} from "./map/map-page/map-page.component";

@Component({
  templateUrl: "build/app.html",
  providers: [LocationService, EventsPage, MapPage]
})
export class CadeRoleApp {

  @ViewChild('nav') nav: NavController;

  private rootPage;
  private pages;

  constructor(private platform: Platform, private mapPage: MapPage) {
    this.rootPage = EventsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    this.pages = {
      'map': MapPage,
      'events': EventsPage
    }
  }

  goToPage(page) {
    this.nav.setRoot(this.pages[page]);
  }
}

ionicBootstrap(CadeRoleApp);
moment.locale('pt-br');
