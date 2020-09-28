import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgApexchartsModule} from 'ng-apexcharts';
import { NbCardModule } from '@nebular/theme';

import { ApexRoutingModule } from './apex-routing.module';
import { ApexComponent } from './apex.component';
import { BarComponent } from './bar/bar.component';
import { LineComponent } from './line/line.component';
import { AreaComponent } from './area/area.component';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { MultiAxisComponent } from './multi-axis/multi-axis.component';
import { RadarComponent } from './radar/radar.component';


@NgModule({
  declarations: [ApexComponent, BarComponent, LineComponent, AreaComponent, HeatMapComponent, MultiAxisComponent, RadarComponent],
  imports: [
    CommonModule,
    ApexRoutingModule,
    NgApexchartsModule,
    NbCardModule
  ]
})
export class ApexModule { }
