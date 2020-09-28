import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-heatmap',
  template: `
  <div #myDiv echart style="height: 30vh; width: 100%" class="echart"></div>
  `,
  styles: [
  ]
})
export class HeatmapComponent implements AfterViewInit {

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

      var xValues = ['A', 'B', 'C', 'D', 'E'];

      var yValues = ['W', 'X', 'Y', 'Z'];

      var zValues = [
        [0.00, 0.00, 0.75, 0.75, 0.00],
        [0.00, 0.00, 0.75, 0.75, 0.00],
        [0.75, 0.75, 0.75, 0.75, 0.75],
        [0.00, 0.00, 0.00, 0.75, 0.00]
      ];

      var colorscaleValue = [
        [0, '#3D9970'],
        [1, '#001f3f']
      ];

      var trace1 = {
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'heatmap',
        colorscale: colorscaleValue,
        showscale: false
      }

      this.data = [trace1];

      var layout = {
        margin: { t: 0, r: 5, l: 25, b: 35 },
        // height: 400,
        plot_bgcolor: echarts.bg,
        paper_bgcolor: echarts.bg,
        annotations: [],
        xaxis: {
          ticks: '',
          // side: 'top',
          color: echarts.axisLineColor,
        },
        yaxis: {
          ticks: '',
          ticksuffix: ' ',
          width: 700,
          height: 700,
          autosize: false,
          color: echarts.axisLineColor,
        },
        title: {

          font: {
            family: 'Courier New, monospace',
            size: 14,
            color: echarts.textColor,
          },
        },
       
      };

      for ( var i = 0; i < yValues.length; i++ ) {
        for ( var j = 0; j < xValues.length; j++ ) {
          var currentValue = zValues[i][j];
          if (currentValue != 0.0) {
            var textColor = 'white';
          }else{
            var textColor = 'black';
          }
          var result = {
            xref: 'x1',
            yref: 'y1',
            x: xValues[j],
            y: yValues[i],
            text: zValues[i][j],
            font: {
              family: 'Arial',
              size: 12,
              color: 'white'
            },
            showarrow: false,
            // font: {
            //   color: textColor
            // }
          };
         layout.annotations.push(result);
        }
      }

      Plotly.newPlot(this.myDiv.nativeElement, this.data, layout, this.config, this.style, this.useResizeHandler);

    });
  }
}
