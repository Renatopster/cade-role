import {Component, ViewChild, ElementRef} from '@angular/core';
import {LocationService} from "../../services/location.service";
import {EventService} from "../../services/event.service";
import {TimerWrapper} from "@angular/core/src/facade/async";
import {CrNavbar} from "../../cr-navbar/cr-navbar";

@Component({
  templateUrl: 'build/map/map-page/map-page.component.html',
  directives: [CrNavbar]
})
export class MapPage {
  private userMarker;
  private circleMarker;
  private eventsMarkers = [];
  private map;
  @ViewChild('map') mapElement: ElementRef;

  constructor(private locationService: LocationService,
              private eventService: EventService) {
    TimerWrapper.setInterval(() => locationService.grabUserLocation().then(location => this.refreshUserMarker(location)), 5000);
  }

  ionViewDidEnter() {
    this.resizeMap();
  }

  ionViewLoaded() {
    this.locationService.grabUserLocation().then(location => {
      if (!this.map) {
        this.loadMap(location);
      }
      this.refreshUserMarker(location);
    });

    this.loadMarkersWhenEventsChange();
  }

  private resizeMap(): void {
    if (this.map) {
      google.maps.event.trigger(this.map, 'resize');
    }
  }

  private notifyCenterChange() {
    this.locationService.updateCenter(this.map.getCenter());
    this.drawCentralCircleMarker();
  }

  private drawCentralCircleMarker() {
    if (this.circleMarker) {
      this.circleMarker.setMap(null);
    }
    this.circleMarker = new google.maps.Circle({
      strokeColor: '#FFFF00',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: '#FFFFCC',
      fillOpacity: 0.35,
      map: this.map,
      center: this.map.getCenter(),
      radius: 1000
    });
  }

  private loadMap(location) {
    let mapOptions = {
      center: location,
      zoom: 15,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.addUserLocationButton();
    this.map.addListener('idle', () => this.notifyCenterChange());
  }

  private addUserLocationButton() {
    var controlDiv = document.createElement('div');

    var firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0';
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = 'url(img/mylocation-sprite-1x.png)';
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0 0';
    secondChild.style.backgroundRepeat = 'no-repeat';
    firstChild.appendChild(secondChild);

    google.maps.event.addListener(this.map, 'center_changed', () => {
      secondChild.style['background-position'] = '0 0';
    });

    firstChild.addEventListener('click', () => {
      this.locationService.grabUserLocation().then(location => {
        this.map.panTo(location);
        this.notifyCenterChange();
      });
    });

    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
  }

  private refreshUserMarker(location) {
    if (this.userMarker) {
      this.userMarker.setMap(null);
    }
    this.userMarker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: 'img/bluecircle.png'
    });
  }

  private loadMarkersWhenEventsChange() {
    this.eventService.events$.subscribe(events => {
      for (var i in this.eventsMarkers) {
        this.eventsMarkers[i].setMap(null);
      }
      this.eventsMarkers = [];
      for (var i in events) {
        var event = events[i];
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(event.latitude, event.longitude),
          map: this.map,
          title: event.name,
          icon: {
            url: event.profilePictureUrl,
            scaledSize: new google.maps.Size(24, 24)
          }
        });
        this.eventsMarkers.push(marker);
      }

    });
  }


}
