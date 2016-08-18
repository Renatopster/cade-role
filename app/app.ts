import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './shared/tabs/tabs.component';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {LocationService} from "./services/location.service";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [LocationService]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform, private locationService: LocationService) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
moment.locale('pt-br');
