import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import * as L from 'leaflet';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
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
  private map;
  @Input('latlong') latlong: number[] = [
    45.51877834815366, -122.67981871962547,
  ];
  @ViewChild('mapContainer') mapContainer: ElementRef;
  sensUrl = 'http://34.218.20.24:5000/curb/sens';

  data: any;
  // data: any = {
  //   type: 'FeatureCollection',
  //   features: [
  //     {
  //       id: '0',
  //       type: 'Feature',
  //       properties: {
  //         'asset-class': 'camera',
  //         'asset-date': '11/04/2021',
  //         'asset-id': '12321',
  //         'asset-parameters': {
  //           model: 'AXIS Q6045-E Mk II',
  //           date: '_',
  //           resolution: '1080p',
  //           zoom: '30x',
  //           focusRange: '_',
  //           storage: 'None',
  //           dimension: '_',
  //           latency: '14ms',
  //           network: 'Ethernet',
  //           power: 'PoE',
  //           link: 'http://192.168.4.25:8080/video',
  //           owner: 'Admin',
  //         },
  //         'asset-usage': 'public',
  //         fill: null,
  //         'fill-opacity': null,
  //         'marker-color': '#00d9ff',
  //         'marker-size': 'medium',
  //         'marker-symbol': 'camera',
  //         stroke: null,
  //         'stroke-opacity': null,
  //         'stroke-width': null,
  //       },
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [-122.67981871962547, 45.51877834815366],
  //       },
  //     },
  //     {
  //       id: '1',
  //       type: 'Feature',
  //       properties: {
  //         'asset-class': 'camera-fov',
  //         'asset-date': '11/04/2021',
  //         'asset-id': '12321',
  //         'asset-parameters': {
  //           owner: 'Admin',
  //         },
  //         'asset-usage': 'limited',
  //         fill: '#f3c7ff',
  //         'fill-opacity': 0.2,
  //         'marker-color': null,
  //         'marker-size': null,
  //         'marker-symbol': null,
  //         stroke: '#ce85ff',
  //         'stroke-opacity': 1,
  //         'stroke-width': 2,
  //       },
  //       geometry: {
  //         type: 'Polygon',
  //         coordinates: [
  //           [
  //             [-122.680002450943, 45.5189324553022],
  //             [-122.67979323863985, 45.51877271007923],
  //             [-122.67958939075469, 45.51870505314222],
  //             [-122.67870426177977, 45.519110993544096],
  //             [-122.6797905564308, 45.519421084933576],
  //             [-122.680002450943, 45.5189324553022],
  //           ],
  //         ],
  //       },
  //     },
  //     {
  //       id: '2',
  //       type: 'Feature',
  //       properties: {
  //         'asset-class': 'camera',
  //         'asset-date': '11/04/2021',
  //         'asset-id': '12322',
  //         'asset-parameters': {
  //           model: 'AXIS Q6045-E Mk II',
  //           date: '_',
  //           resolution: '1080p',
  //           zoom: '30x',
  //           focusRange: '_',
  //           storage: 'None',
  //           dimension: '_',
  //           latency: '14ms',
  //           network: 'Ethernet',
  //           power: 'PoE',
  //           link: 'http://192.168.4.26:8080/video',
  //           owner: 'Admin',
  //         },
  //         'asset-usage': 'public',
  //         fill: null,
  //         'fill-opacity': null,
  //         'marker-color': '#00d9ff',
  //         'marker-size': 'medium',
  //         'marker-symbol': 'camera',
  //         stroke: null,
  //         'stroke-opacity': null,
  //         'stroke-width': null,
  //       },
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [-122.6787257194519, 45.518509599311614],
  //       },
  //     },
  //     {
  //       id: '3',
  //       type: 'Feature',
  //       properties: {
  //         'asset-class': 'camera-fov',
  //         'asset-date': '11/04/2021',
  //         'asset-id': '12322',
  //         'asset-parameters': {
  //           owner: 'Admin',
  //         },
  //         'asset-usage': 'limited',
  //         fill: '#f3c7ff',
  //         'fill-opacity': 0.2,
  //         'marker-color': null,
  //         'marker-size': null,
  //         'marker-symbol': null,
  //         stroke: '#ce85ff',
  //         'stroke-opacity': 1,
  //         'stroke-width': 2,
  //       },
  //       geometry: {
  //         type: 'Polygon',
  //         coordinates: [
  //           [
  //             [-122.67873108386992, 45.518509599311614],
  //             [-122.67862111330031, 45.519084682680884],
  //             [-122.67925947904585, 45.51927261714823],
  //             [-122.67962425947188, 45.518511478678604],
  //             [-122.67892152070999, 45.518295351063436],
  //             [-122.67873108386992, 45.518509599311614],
  //           ],
  //         ],
  //       },
  //     },
  //   ],
  // };

  ngOnInit() {
    this.getJSON(this.sensUrl).subscribe((data) => {
      this.data = data;
      this.initMap(this.latlong);
    });
  }

  private initMap(latlong): void {
    // const myCenter = new L.LatLng(45.51877834815366, -122.67981871962547);
    this.map = L.map('map', {
      center: latlong,
      zoom: 16.5,
    });
    //.setView([45.51877834815366, -122.67981871962547]);
    // const tiles = L.tileLayer(
    //   'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //   {
    //     maxZoom: 18,
    //     minZoom: 3,
    //     attribution:
    //       '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    //   }
    // );

    // L.mapbox.accessToken = environment.mapboxAccessToken;
    // Help from Heat map
    const tiles = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: environment.mapboxAccessToken,
      }
    );
    tiles.addTo(this.map);

    function onEachFeature(feature, layer) {
      layer.on('click', function (e) {
        // alert(feature.properties.popupContent);
        //or
        console.log(',,,,,,', feature.id, feature.properties);
        
      });

      const params = feature.properties['asset-parameters'];
        console.log('BBB ', params);
        const rowsData = Object.keys(params).map((paramKey) => {
          return `<tr>
            <td> ${paramKey} </td>
            <td> ${params[paramKey]} </td>
          </tr>`;
        })
        const tableData = `<div class="table">
                            <table>
                              <thead>
                                  <tr>
                                    <th width="40%">Currency</th>
                                    <th width="60%">Value</th>
                                  </tr>
                              </thead>
                              <tbody>
                                ${rowsData.join(" ")}
                              </tbody>
                            </table>
                          </div>`;
        console.log('tableData ', tableData);
        layer.bindPopup(tableData, { width: 200 });
    }

    // create your custom icon
    const cameraIcon = L.icon({
      iconUrl: '/assets/image/camera.png',
      iconSize: [31, 71],
      iconAnchor: [16, 37],
      popupAnchor: [0, -28],
    });

    L.geoJSON(this.data, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: cameraIcon });
      },
      onEachFeature: onEachFeature,
    }).addTo(this.map);

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

  constructor(private http: HttpClient) {}

  getLatLongsFromMarkers(coords) {}

  ngAfterViewInit(): void {
    this.subscribeResize();
    // if (this.latlong) this.initMap(this.latlong);
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

  public getJSON(url): Observable<any> {
    return this.http.get(url);
  }
}
