import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-stacked-bar',
  template: `
  <div #myDiv echart style="height: 30vh; width: 100%" class="echart"></div>
  `,
  styles: [
  ]
})
export class StackedBarComponent implements AfterViewInit {
  
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

      var xValue = ['Product A', 'Product B', 'Product C'];

var yValue = [20, 14, 23];
var yValue2 = [24, 16, 20];

var trace1 = {
  x: xValue,
  y: yValue,
  type: 'bar',
  text: yValue.map(String),
  textposition: 'auto',
  hoverinfo: 'none',
  opacity: 0.5,
  marker: {
    color: 'rgb(158,202,225)',
    line: {
      color: 'rgb(8,48,107)',
      width: 1.5
    }
  }
};

var trace2 = {
  x: xValue,
  y: yValue2,
  type: 'bar',
  text: yValue2.map(String),
  textposition: 'auto',
  hoverinfo: 'none',
  marker: {
    color: 'rgba(58,200,225,.5)',
    line: {
      color: 'rgb(8,48,107)',
      width: 1.5
    }
  }
};

  
      this.data = [trace1, trace2];

      this.layout = {
        margin: { t: 0, r: 5, l: 25, b: 35 },
        // height: 400,
        plot_bgcolor: echarts.bg,
        paper_bgcolor: echarts.bg,
        showlegend: false,
        legend: {
          x: 0.4,
          y: -0.3,
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
