import {Injectable} from '@angular/core';
import {ReplaySubject} from "rxjs";
import LatLng = google.maps.LatLng;

@Injectable()
export class LocationService {

  private location = new ReplaySubject<LatLng>();
  location$ = this.location.asObservable();

  constructor() {
    this.initLocation();
  }

  updateLocation(location) {
    this.location.next(location);
  }

  initLocation() {
    let options = {timeout: 10000, enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.updateLocation(new LatLng(position.coords.latitude, position.coords.longitude));
      },

      (error) => {
        console.log(error);
      }, options
    );
  }
}