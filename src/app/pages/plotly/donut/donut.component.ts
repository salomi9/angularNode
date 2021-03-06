import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-donut',
  template: `
  <div #myDiv echart style="height: 30vh; width: 100%" class="echart"></div>
  `,
  styles: [
  ]
})
export class DonutComponent implements AfterViewInit {
  
  @ViewChild('myDiv') myDiv: ElementRef;

  themeSubscription: any;

  config: Object = {}

  data: Array<any> = []

  layout: Object = {}

  useResizeHandler: Boolean = true

  style: Object = {}

  constructor(private theme: NbThemeService) { }

  ngAfterViewInit(): void {
    console.log(this.myDiv.nativeElement.innerHTML);
    this.barChart();
  }

  barChart(): any {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.config = { displayModeBar: false };

      var trace1 = {
        values: [16, 15, 12, 6, 5, 4, 42],
        labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
        domain: {column: 0},
        name: 'GHG Emissions',
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
      }
  
      this.data = [trace1];

      this.layout = {
        margin: { t: 0, r: 5, l: 25, b: 35 },
        // height: 400,
        plot_bgcolor: echarts.bg,
        paper_bgcolor: echarts.bg,
        showlegend: true,
        legend: {
          // x: 0.4,
          // y: -0.3,
          font: {
            family: 'sans-serif',
            size: 12,
            color: echarts.textColor
          },
        },
        title: {

          font: {
            family: 'Courier New, monospace',
            size: 14,
            color: echarts.textColor,
          },
        },
        xaxis: {
          color: echarts.axisLineColor,
        },
        yaxis: {
          zeroline: false,
          color: echarts.axisLineColor,
        }
      };

      Plotly.newPlot(this.myDiv.nativeElement, this.data, this.layout, this.config, this.style, this.useResizeHandler);

    });
  }
}

