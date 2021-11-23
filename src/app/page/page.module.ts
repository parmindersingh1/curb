import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { PageRoutingModule } from './page-routing.module';
import { SharedModule } from './../shared/shared.module';
import { CurbViewComponent } from './curb-view/curb-view.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CurbViewComponent
  ],
  imports: [
    SharedModule,
    PageRoutingModule
  ]
})
export class PageModule { }
