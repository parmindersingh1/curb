import * as L from 'leaflet';

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map;
  @Input('latlong') latlong: number[] = [51.5, -0.09];
  @ViewChild('mapContainer') mapContainer: ElementRef;

  private initMap(latlong): void {
    this.map = L.map('map', {
      center: latlong,
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    // this.addControlPlaceholders(this.map);

    // // Change the position of the Zoom Control to a newly created placeholder.
    // this.map.zoomControl.setPosition('verticalcenterright');

    // // You can also put other controls in the same placeholder.
    // L.control
    //   .scale({
    //     position: 'verticalcenterright',
    //   })
    //   .addTo(this.map);

    // // this.map.createPane('labels');
  }

  constructor() {}

  getLatLongsFromMarkers(coords) {}

  ngAfterViewInit(): void {
    this.subscribeResize();
    if (this.latlong) this.initMap(this.latlong);
  }

  addControlPlaceholders(map) {
    var corners = map._controlCorners,
      l = 'leaflet-',
      container = map._controlContainer;

    function createCorner(vSide, hSide) {
      var className = l + vSide + ' ' + l + hSide;

      corners[vSide + hSide] = L.DomUtil.create('div', className, container);
    }

    createCorner('verticalcenter', 'left');
    createCorner('verticalcenter', 'right');
  }

  subscribeResize() {
    const resizeObserver = new ResizeObserver(() => {
      this.map.invalidateSize();
    });

    resizeObserver.observe(this.mapContainer.nativeElement);
  }
}
