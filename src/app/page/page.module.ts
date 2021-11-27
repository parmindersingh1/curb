import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { PageRoutingModule } from './page-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CurbViewComponent } from './curb-view/curb-view.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  declarations: [
    DashboardComponent,
    CurbViewComponent
  ],
  imports: [
    SharedModule,
    PageRoutingModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoic2FhZGlxbSIsImEiOiJjamJpMXcxa3AyMG9zMzNyNmdxNDlneGRvIn0.wjlI8r1S_-xxtq2d-W5qPA', // Optional, can also be set per map (accessToken input of mgl-map)
      // geocoderAccessToken: 'TOKEN' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
  ]
})
export class PageModule { }
