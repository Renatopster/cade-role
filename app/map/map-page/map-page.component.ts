import {Component, ViewChild, ElementRef} from '@angular/core';
import {LocationService} from "../../services/location.service";
import {EventService} from "../../services/event.service";

@Component({
  templateUrl: 'build/map/map-page/map-page.component.html'
})
export class MapPage {
  private userMarker;
  private eventsMarkers = [];
  private map;
  private bounds;
  @ViewChild('map') mapElement: ElementRef;

  constructor(private locationService: LocationService, private eventService: EventService) {
  }

  ionViewDidEnter() {
    this.resizeMap();
  }

  ionViewLoaded() {
    this.locationService.userLocation$.subscribe(location => {
      if (!this.map) {
        this.loadMap(location);
      }
      this.refreshUserMarker(location);
    });

    this.loadMarkers();
  }

  private resizeMap(): void {
    if (this.map) {
      google.maps.event.trigger(this.map, 'resize');
    }
  }

  private loadMap(location) {
    let mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.map.addListener('idle', () => {
      this.locationService.updateBounds(this.map.getBounds());
    });
  }

  private refreshUserMarker(location) {
    if (this.userMarker) {
      this.userMarker.setMap(null);
    }
    this.userMarker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: 'http://www.robotwoods.com/dev/misc/bluecircle.png'
    });
  }

  private loadMarkers() {
    this.eventService.events$.subscribe(events => {
      for (var i in this.eventsMarkers) {
        this.eventsMarkers[i].setMap(null);
      }
      this.eventsMarkers = [];
      for (var i in events) {
        var event = events[i];
        var location = event.venue.location;
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(location.latitude, location.longitude),
          map: this.map,
          title: event.name,
          icon: {
            url: event.profilePicture,
            size: new google.maps.Size(24, 24)
          }
        });
        this.eventsMarkers.push(marker);
      }

      this.eventsMarkers.push(new google.maps.Circle({
        strokeColor: '#FFFF00',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#FFFFCC',
        fillOpacity: 0.35,
        map: this.map,
        center: this.map.getCenter(),
        radius: 1000
      }));
    });
  }


}
