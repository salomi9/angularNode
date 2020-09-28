import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';

import { PlotlyRoutingModule } from './plotly-routing.module';
import { PlotlyComponent } from './plotly.component';
import { LineComponent } from './line/line.component';
import { NbCardModule } from '@nebular/theme';
import { BarComponent } from './bar/bar.component';
import { BubbleComponent } from './bubble/bubble.component';
import { AreaFilledComponent } from './area-filled/area-filled.component';
import { PieComponent } from './pie/pie.component';
import { DonutComponent } from './donut/donut.component';
import { StackedBarComponent } from './stacked-bar/stacked-bar.component';
import { FunnelComponent } from './funnel/funnel.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { WaterfallComponent } from './waterfall/waterfall.component';


@NgModule({
 
  imports: [
    CommonModule,
    PlotlyRoutingModule,
    NbCardModule,
    NgxSpinnerModule
  ],
  declarations: [
    PlotlyComponent, 
    LineComponent, 
    BarComponent, 
    BubbleComponent, 
    AreaFilledComponent, 
    PieComponent, 
    DonutComponent, 
    StackedBarComponent, 
    FunnelComponent, 
    HeatmapComponent, 
    WaterfallComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlotlyModule { }
