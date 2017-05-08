import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {CadeRoleApp} from './app.component';
import {LocationService} from '../services/location.service';
import {EventService} from '../services/event.service';
import {TabsPage} from '../tabs/tabs';
import {CalendarPipe, DateFormatPipe} from 'angular2-moment';
import {EventsPage} from '../events/events-page/events-page.component';
import {CrNavbar} from '../cr-navbar/cr-navbar';
import {MapPage} from '../map/map-page/map-page.component';
import {EventItem} from '../events/event-item/event-item.component';
import {EventDetailPage} from '../events/event-detail/event-detail.component';
import {EventsSettings} from '../events/events-settings/events-settings';
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {Geolocation} from '@ionic-native/geolocation';

var config = {
  tabsHideOnSubPages: 'true'
};

@NgModule({
  declarations: [
    CadeRoleApp,
    TabsPage,
    CalendarPipe,
    DateFormatPipe,
    EventsPage,
    MapPage,
    CrNavbar,
    EventItem,
    EventDetailPage,
    EventsSettings
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(CadeRoleApp, config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CadeRoleApp,
    TabsPage,
    MapPage,
    EventsPage,
    EventDetailPage,
    EventsSettings
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationService,
    EventService,
    Geolocation
  ]
})
export class AppModule {
}
