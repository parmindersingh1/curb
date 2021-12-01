import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-layer-two',
  templateUrl: './layer-two.component.html',
  styleUrls: ['./layer-two.component.css'],
})
export class LayerTwoComponent implements OnInit, AfterViewInit {
  @ViewChild('map') map: ElementRef;
  mapEl: any;
  data: any = {
    type: 'FeatureCollection',
    features: [
      {
        id: '0',
        type: 'Feature',
        properties: {
          'asset-class': 'camera',
          'asset-date': '11/04/2021',
          'asset-id': '12321',
          'asset-parameters': {
            model: 'AXIS Q6045-E Mk II',
            date: '_',
            resolution: '1080p',
            zoom: '30x',
            focusRange: '_',
            storage: 'None',
            dimension: '_',
            latency: '14ms',
            network: 'Ethernet',
            power: 'PoE',
            link: 'http://192.168.4.25:8080/video',
            owner: 'Admin',
          },
          'asset-usage': 'public',
          fill: null,
          'fill-opacity': null,
          'marker-color': '#00d9ff',
          'marker-size': 'medium',
          'marker-symbol': 'camera',
          stroke: null,
          'stroke-opacity': null,
          'stroke-width': null,
        },
        geometry: {
          type: 'Point',
          coordinates: [-122.67981871962547, 45.51877834815366],
        },
      },
      {
        id: '1',
        type: 'Feature',
        properties: {
          'asset-class': 'camera-fov',
          'asset-date': '11/04/2021',
          'asset-id': '12321',
          'asset-parameters': {
            owner: 'Admin',
          },
          'asset-usage': 'limited',
          fill: '#f3c7ff',
          'fill-opacity': 0.2,
          'marker-color': null,
          'marker-size': null,
          'marker-symbol': null,
          stroke: '#ce85ff',
          'stroke-opacity': 1,
          'stroke-width': 2,
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-122.680002450943, 45.5189324553022],
              [-122.67979323863985, 45.51877271007923],
              [-122.67958939075469, 45.51870505314222],
              [-122.67870426177977, 45.519110993544096],
              [-122.6797905564308, 45.519421084933576],
              [-122.680002450943, 45.5189324553022],
            ],
          ],
        },
      },
      {
        id: '2',
        type: 'Feature',
        properties: {
          'asset-class': 'camera',
          'asset-date': '11/04/2021',
          'asset-id': '12322',
          'asset-parameters': {
            model: 'AXIS Q6045-E Mk II',
            date: '_',
            resolution: '1080p',
            zoom: '30x',
            focusRange: '_',
            storage: 'None',
            dimension: '_',
            latency: '14ms',
            network: 'Ethernet',
            power: 'PoE',
            link: 'http://192.168.4.26:8080/video',
            owner: 'Admin',
          },
          'asset-usage': 'public',
          fill: null,
          'fill-opacity': null,
          'marker-color': '#00d9ff',
          'marker-size': 'medium',
          'marker-symbol': 'camera',
          stroke: null,
          'stroke-opacity': null,
          'stroke-width': null,
        },
        geometry: {
          type: 'Point',
          coordinates: [-122.6787257194519, 45.518509599311614],
        },
      },
      {
        id: '3',
        type: 'Feature',
        properties: {
          'asset-class': 'camera-fov',
          'asset-date': '11/04/2021',
          'asset-id': '12322',
          'asset-parameters': {
            owner: 'Admin',
          },
          'asset-usage': 'limited',
          fill: '#f3c7ff',
          'fill-opacity': 0.2,
          'marker-color': null,
          'marker-size': null,
          'marker-symbol': null,
          stroke: '#ce85ff',
          'stroke-opacity': 1,
          'stroke-width': 2,
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-122.67873108386992, 45.518509599311614],
              [-122.67862111330031, 45.519084682680884],
              [-122.67925947904585, 45.51927261714823],
              [-122.67962425947188, 45.518511478678604],
              [-122.67892152070999, 45.518295351063436],
              [-122.67873108386992, 45.518509599311614],
            ],
          ],
        },
      },
    ],
  };
  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {}

  _loadData(data) {
    let self = this;
  }

  ngAfterViewInit() {
    mapboxgl.accessToken = environment.mapboxAccessToken;
    this.mapEl = new mapboxgl.Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-122.67981871962547, 45.51877834815366],
      zoom: 17,
    });

    this.mapEl.on('load', () => {
      this.mapEl.addSource('curblrData', {
        type: 'geojson',
        data: this.data,
      });
      this.mapEl.addLayer({
        id: 'dataLayer',
        source: 'curblrData',
        type: 'line',
        interactive: true,
        paint: {
          'line-color': ['get', 'color'],
          'line-offset': ['get', 'offset'],
          // 'line-width': scaledWidth(6.8),
        },
      });
      this.mapEl.on('click', 'dataLayer', (e) => {
        console.log('CLICK');
      });
      this.mapEl.on('mouseenter', 'places', () => {
        this.mapEl.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      this.mapEl.on('mouseleave', 'places', () => {
        this.mapEl.getCanvas().style.cursor = '';
      });
    });
  }

  public getJSON(url): Observable<any> {
    return this.http.get(url);
  }
}
