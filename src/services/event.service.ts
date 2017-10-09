import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable, ReplaySubject} from 'rxjs';
import {LocationService} from './location.service';
import {DateInterval} from '../shared/DateInterval';
import {Event} from '../events/Event';
import * as EventSearch from 'facebook-events-by-location-core'
import LatLng = google.maps.LatLng;

@Injectable()
export class EventService {

  center: LatLng;

  private loading = new ReplaySubject<boolean>();
  loading$: Observable<boolean> = this.loading.asObservable();

  private events = new ReplaySubject<Event[]>();
  events$: Observable<Event[]> = this.events.asObservable();

  private dateInterval: DateInterval;

  constructor(private http: Http,
              private locationService: LocationService) {
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

  async refreshEvents() {
    const since = this.dateInterval.since;
    const until = this.dateInterval.until;
    const center = this.center;
    const distance = 1000;

    const lat = center.lat();
    const lng = center.lng();

    const options = {
      accessToken: '861161564018485|37gRLbgrtmX_SFIbaqUzDzmbJd4',
      lat: lat,
      lng: lng,
      distance: distance,
      sort: 'popularity',
      since: since.toISOString(),
      until: until.toISOString(),
      categories: ['ARTS_ENTERTAINMENT'],
    };
    const es = new EventSearch()

    this.loading.next(true);
    const response = await es.search(options)
    this.loading.next(false);

    const events = response.events
      .map((data) => {
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
      }).sort(function (a, b) {
        if (a.attendingCount < b.attendingCount) {
          return 1;
        } else if (a.attendingCount > b.attendingCount) {
          return -1;
        }
        return 0;
      });
    this.events.next(events);
    return events
  }
}
