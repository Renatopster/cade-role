import {Injectable} from '@angular/core';
import {ReplaySubject, Observable} from "rxjs";
import LatLng = google.maps.LatLng;
import {Geolocation} from 'ionic-native';

@Injectable()
export class LocationService {

  private center = new ReplaySubject<LatLng>();
  center$: Observable<LatLng> = this.center.asObservable();

  constructor() {
    this.grabUserLocation().then(location => this.updateCenter(location));
  }

  updateCenter(center) {
    this.center.next(center);
  }

  grabUserLocation(): Promise<LatLng> {
    return new Promise(resolve => {
      let options = {timeout: 3000, enableHighAccuracy: true};

      Geolocation.getCurrentPosition(options).then(
        (position) => {
          var location = new LatLng(position.coords.latitude, position.coords.longitude);
          resolve(location);
        },
        (error) => {
          console.log(error);
        }
      );
    })
  }
}
