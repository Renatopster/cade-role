import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";
import LatLng = google.maps.LatLng;
import {Geolocation} from 'ionic-native';
import LatLngBounds = google.maps.LatLngBounds;
import {TimerWrapper} from "@angular/core/src/facade/async";

@Injectable()
export class LocationService {

  private userLocation = new ReplaySubject<LatLng>();
  userLocation$ = this.userLocation.asObservable();

  private center = new ReplaySubject<LatLng>();
  center$ = this.center.asObservable();

  constructor() {
    this.grabUserLocation().then(location => this.center.next(location));
    TimerWrapper.setInterval(() => this.grabUserLocation(), 5000);
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
          this.userLocation.next(location);
          resolve(location);
        },
        (error) => {
          console.log(error);
        }
      );
    })
  }
}
