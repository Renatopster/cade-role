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
  private bounds = new ReplaySubject<LatLngBounds>();
  bounds$ = this.bounds.asObservable();

  constructor() {
    this.monitorUserLocation();
    TimerWrapper.setInterval(() => this.monitorUserLocation(), 5000);
  }

  updateBounds(bounds) {
    this.bounds.next(bounds);
  }

  monitorUserLocation() {
    let options = {timeout: 3000, enableHighAccuracy: true};

    Geolocation.getCurrentPosition(options).then(
      (position) => {
        this.userLocation.next(new LatLng(position.coords.latitude, position.coords.longitude));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
