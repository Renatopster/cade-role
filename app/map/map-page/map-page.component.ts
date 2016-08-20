import {Component, ViewChild, ElementRef} from '@angular/core';
import {LocationService} from "../../services/location.service";

@Component({
  templateUrl: 'build/map/map-page/map-page.component.html'
})
export class MapPage {
  map;
  location;
  @ViewChild('map') mapElement: ElementRef;

  constructor(private locationService: LocationService) {
  }

  ionViewDidEnter() {
    this.resizeMap();
  }

  ionViewLoaded() {
    this.locationService.location$.subscribe(location => {
      this.location = location;
      this.loadMap();
    });
  }

  private resizeMap(): void {
    if (this.map) {
      google.maps.event.trigger(this.map, 'resize');
    }
  }

  loadMap() {
    let mapOptions = {
      center: this.location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
