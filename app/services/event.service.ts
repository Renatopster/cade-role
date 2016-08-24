import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ReplaySubject} from "rxjs";
import LatLng = google.maps.LatLng;
import {LocationService} from "./location.service";
import spherical = google.maps.geometry.spherical;

@Injectable()
export class EventService {

  center: LatLng;

  private events = new ReplaySubject();
  events$ = this.events.asObservable();

  since: Date;
  until: Date;


  constructor(private http: Http, private locationService: LocationService) {
    this.since = new Date();
    this.until = new Date();
    this.until.setDate(this.until.getDate() + 2);

    this.subscribeToMapCenter();
  }

  private subscribeToMapCenter() {
    this.locationService.center$.subscribe(center => {
      this.center = center;
      this.refreshEvents();
    });
  }

  refreshEvents() {
    var center = this.center;
    // var distance = Math.ceil(spherical.computeDistanceBetween(center, bounds.getSouthWest()));
    var distance = 1000;

    var lat = center.lat();
    var lng = center.lng();

    return new Promise(resolve => {
      this.http.get('http://cade-role.renatogripp.com.br:3000/events?lat=' + lat + '&lng=' + lng + '&distance=' + distance + '&sort=popularity&since=' + this.since.toISOString() + '&until=' + this.until.toISOString())
        .map(res => res.json())
        .subscribe(data => {
          this.events.next(data.events);
          resolve(true);
        });
    });
  }
}
