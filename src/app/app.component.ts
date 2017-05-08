import {Component, ViewChild} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {TabsPage} from '../tabs/tabs';
import {NavController, Platform} from "ionic-angular";

@Component({
  templateUrl: 'app.html'
})
export class CadeRoleApp {

  @ViewChild('nav') nav: NavController;

  private rootPage;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }

}

moment.locale('pt-br');
