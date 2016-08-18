import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {LocationService} from "./location.service";

@Injectable()
export class EventService {

  since: Date;
  until: Date;

  constructor(private http: Http) {
    this.since = new Date();
    this.until = new Date();
    this.until.setDate(this.until.getDate() + 2);
  }

  getEvents(location) {
    var lat = location.lat();
    var lng = location.lng();
    var distance = 500;

    return new Promise(resolve => {
      this.http.get('http://localhost:3000/events?lat=' + lat + '&lng=' + lng + '&distance=' + distance + '&sort=popularity&since=' + this.since.toISOString() + '&until=' + this.until.toISOString())
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.events);
        });
    });
  }
}
