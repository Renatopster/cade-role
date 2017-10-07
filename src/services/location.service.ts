import {Injectable} from '@angular/core';
import {ReplaySubject, Observable} from 'rxjs';
import {googlemaps} from 'googlemaps'
import LatLng = google.maps.LatLng;
import {Geolocation} from '@ionic-native/geolocation';

@Injectable()
export class LocationService {

  private center = new ReplaySubject<LatLng>();
  center$: Observable<LatLng> = this.center.asObservable();

  constructor(private geolocation: Geolocation) {
  }

  init() {
    this.grabUserLocation().then(location => this.updateCenter(location));
  }

  updateCenter(center) {
    this.center.next(center);
  }

  grabUserLocation(): Promise<LatLng> {
    const options = {timeout: 3000, enableHighAccuracy: true};
    return this.geolocation.getCurrentPosition(options)
      .then(position => new LatLng(position.coords.latitude, position.coords.longitude))
  }
}
