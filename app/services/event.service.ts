import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ReplaySubject} from "rxjs";
import LatLng = google.maps.LatLng;
import {LocationService} from "./location.service";
import {DateInterval} from "../shared/DateInterval";

@Injectable()
export class EventService {

  center: LatLng;

  private events = new ReplaySubject();
  events$ = this.events.asObservable();

  private dateInterval: DateInterval;

  constructor(private http: Http, private locationService: LocationService) {
    var since = new Date();
    var until = new Date();
    until.setDate(until.getDate() + 2);

    this.dateInterval = {since: since, until: until};
    this.subscribeToMapCenter();
  }

  private subscribeToMapCenter() {
    this.locationService.center$.subscribe(center => {
      this.center = center;
      this.refreshEvents();
    });
  }

  public updateDateInterval(dateInterval: DateInterval) {
    this.dateInterval = dateInterval;
    this.refreshEvents();
  }

  refreshEvents() {
    var since = this.dateInterval.since;
    var until = this.dateInterval.until;
    var center = this.center;
    var distance = 1000;

    var lat = center.lat();
    var lng = center.lng();

    return new Promise(resolve => {
      this.http.get('http://cade-role.renatogripp.com.br:3000/events?lat=' + lat + '&lng=' + lng + '&distance=' + distance + '&sort=popularity&since=' + since.toISOString() + '&until=' + until.toISOString())
        .map(res => res.json())
        .subscribe(data => {
          this.events.next(data.events);
          resolve(true);
        });
    });
  }
}
