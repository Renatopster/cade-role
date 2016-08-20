import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ReplaySubject} from "rxjs";
import LatLng = google.maps.LatLng;
import {LocationService} from "./location.service";

@Injectable()
export class EventService {

  private events = new ReplaySubject();
  events$ = this.events.asObservable();

  since: Date;
  until: Date;

  updateEvents(events) {
    this.events.next(events);
  }

  constructor(private http: Http, private locationService: LocationService) {
    this.since = new Date();
    this.until = new Date();
    this.until.setDate(this.until.getDate() + 2);

    locationService.location$.subscribe(location => {
      this.getEvents(location).then(events => this.updateEvents(events))
    });
  }

  getEvents(location) {
    var lat = location.lat();
    var lng = location.lng();
    var distance = 500;

    return new Promise(resolve => {
      this.http.get('http://cade-role.renatogripp.com.br:3000/events?lat=' + lat + '&lng=' + lng + '&distance=' + distance + '&sort=popularity&since=' + this.since.toISOString() + '&until=' + this.until.toISOString())
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.events);
        });
    });
  }
}
