import {Injectable} from '@angular/core';

@Injectable()
export class LocationService {

  latitude: number;
  longitude: number;
  zoom: number;

  constructor() {
    this.initLocation();
  }

  initLocation() {
    let options = {timeout: 10000, enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      },

      (error) => {
        console.log(error);
      }, options
    );
  }
}
