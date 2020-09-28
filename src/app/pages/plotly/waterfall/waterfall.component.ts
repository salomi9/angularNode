import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-waterfall',
  template: `
  <div #myDiv echart style="height: 30vh; width: 100%" class="echart"></div>
  `,
  styles: [
  ]
})
export class WaterfallComponent implements AfterViewInit {

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
        type: "waterfall",
        x: [
          ["2016", "2017", "2017", "2017", "2017", "2018", "2018", "2018", "2018"],
          ["initial", "q1", "q2", "q3", "total", "q1", "q2", "q3", "total"]
        ],
        measure: ["absolute", "relative", "relative", "relative", "total", "relative", "relative", "relative", "total"],
        y: [10, 20, 30, -10, null, 10, 20, -40, null],
        base: 300,
        decreasing: { marker: { color: "Maroon", line: { color: "red", width: 2 } } },
        increasing: { marker: { color: "Teal" } },
        totals: { marker: { color: "deep sky blue", line: { color: 'blue', width: 3 } } }
      }

      this.data = [trace1];

      this.layout = {
        margin: { t: 0, r: 5, l: 25, b: 35 },
        // height: 400,
        plot_bgcolor: echarts.bg,
        paper_bgcolor: echarts.bg,
        showlegend: false,
        waterfallgap : 0.3,
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
