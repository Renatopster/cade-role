import {Component} from '@angular/core';
import {LocationService} from "../../services/location.service";

@Component({
  templateUrl: 'build/map/map-page/map-page.component.html'
})
export class MapPage {
  map;
  location;

  constructor(private locationService: LocationService) {

  }

  ngOnInit() {
    this.locationService.location$.subscribe(location => this.location = location);
    this.loadMap();
  }

  loadMap() {
    let mapOptions = {
      center: this.location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }

}
