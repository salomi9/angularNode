import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-funnel',
  template: `
  <div #myDiv echart style="height: 30vh; width: 100%" class="echart"></div>
  `,
  styles: [
  ]
})
export class FunnelComponent implements AfterViewInit {

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
        type: 'funnelarea', values: [5, 4, 3, 2, 1], text: ["The 1st", "The 2nd", "The 3rd", "The 4th", "The 5th"],
        marker: {
          colors: ["59D4E8", "DDB6C6", "A696C8", "67EACA", "94D2E6"],
          line: { color: ["3E4E88", "606470", "3E4E88", "606470", "3E4E88"], width: [2, 1, 5, 0, 3] }
        },
        textfont: { family: "Old Standard TT", size: 13, color: "black" }, opacity: 0.65
      }

      this.data = [trace1];

      this.layout = {
        margin: { t: 0, r: 5, l: 25, b: 35 },
        // height: 400,
        plot_bgcolor: echarts.bg,
        paper_bgcolor: echarts.bg,
        funnelmode: "stack",
        showlegend: false,
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