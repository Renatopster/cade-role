import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ReplaySubject, Observable} from 'rxjs';
import LatLng = google.maps.LatLng;
import {LocationService} from './location.service';
import {DateInterval} from '../shared/DateInterval';
import {Event} from '../events/Event';

@Injectable()
export class EventService {

  center: LatLng;

  private loading = new ReplaySubject<boolean>();
  loading$: Observable<boolean> = this.loading.asObservable();

  private events = new ReplaySubject<Event[]>();
  events$: Observable<Event[]> = this.events.asObservable();

  private dateInterval: DateInterval;

  constructor(private http: Http, private locationService: LocationService) {
    var since = new Date();
    var until = new Date();
    until.setDate(until.getDate() + 2);

    this.dateInterval = {since: since, until: until};
    this.subscribeToMapCenter();
  }

  private subscribeToMapCenter() {
    this.locationService.center$
      .distinctUntilChanged((x, y) => x.lat() == y.lat() && x.lng() == y.lng())
      .subscribe(center => {
        this.center = center;
        this.refreshEvents();
      });
  }

  public updateDateInterval(dateInterval: DateInterval) {
    this.dateInterval = dateInterval;
    this.refreshEvents();
  }

  public getDateInterval() {
    return this.dateInterval
  }

  refreshEvents() {
    var since = this.dateInterval.since;
    var until = this.dateInterval.until;
    var center = this.center;
    var distance = 1000;

    var lat = center.lat();
    var lng = center.lng();

    return new Promise<Event[]>(resolve => {
      this.loading.next(true);
      this.http.get('http://cade-role.rgchaves.com.br/events?lat=' + lat + '&lng=' + lng + '&distance=' + distance + '&sort=popularity&since=' + since.toISOString() + '&until=' + until.toISOString())
        .map(res => res.json().events.map((data) => {
          return <Event>{
            id: data.id,
            name: data.name,
            description: data.description,
            profilePictureUrl: data.profilePicture,
            coverPictureUrl: data.coverPicture,
            attendingCount: data.stats.attending,
            maybeCount: data.stats.maybe,
            startTime: data.startTime,
            endTime: data.endTime,
            venueName: data.venue.name,
            venueAddress: (data.venue.location ? data.venue.location.street + ' - ' + data.venue.location.city + '/' + data.venue.location.state : null),
            latitude: data.venue.location.latitude,
            longitude: data.venue.location.longitude
          };
        }))
        .subscribe(events => {
          this.loading.next(false);
          events = events.sort(function (a, b) {
            if (a.attendingCount < b.attendingCount) {
              return 1;
            } else if (a.attendingCount > b.attendingCount) {
              return -1;
            }
            return 0;
          });
          this.events.next(events);
          resolve(events);
        });
    });
  }
}
