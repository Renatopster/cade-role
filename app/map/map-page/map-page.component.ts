import {Component} from '@angular/core';
import {LocationService} from "../../services/location.service";

@Component({
  templateUrl: 'build/map/map-page/map-page.component.html'
})
export class MapPage {
  map;

  constructor(private locationService: LocationService) {

  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(this.locationService.latitude, this.locationService.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }

}
