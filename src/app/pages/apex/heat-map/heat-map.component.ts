import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexFill
} from "ng-apexcharts";
import { NbThemeService } from '@nebular/theme';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill,

};

@Component({
  selector: 'ngx-heat-map',
  template: `
  <div style="text-align:center; height: 30vh; width: 100%">
  <apx-chart
    [series]="chartOptions.series"
    [chart]="chartOptions.chart"
    [xaxis]="chartOptions.xaxis"
    [yaxis]="chartOptions.yaxis"
    [fill]="chartOptions.fill"
    [colors] = "chartOptions.colors"
  ></apx-chart>
  </div>
  `,
  styles: [
  ]
})
export class HeatMapComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<any>;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.barChart();
  }

  // ngAfterViewInit(): void {
  //   this.barChart();
  // }

  barChart(): any {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.chartOptions = {
        chart: {
          height: 220,
          type: "heatmap"
        },
        dataLabels: {
          enabled: false
        },
        series: [
          {
            name: "Series 1",
            data: [{
              x: 'W1',
              y: 22
            }, {
              x: 'W2',
              y: 29
            }, {
              x: 'W3',
              y: 13
            }, {
              x: 'W4',
              y: 32
            }]
          },
          {
            name: "Series 2",
            data: [{
              x: 'W1',
              y: 43
            }, {
              x: 'W2',
              y: 43
            }, {
              x: 'W3',
              y: 43
            }, {
              x: 'W4',
              y: 43
            }]
          }
        ],
        xaxis: {
          labels: {
            show: true,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            style: {
                colors: echarts.axisLineColor,
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
            }
          }
        },
        yaxis : {
          labels: {
            show: true,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            style: {
                colors: echarts.axisLineColor,
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-xaxis-label',
            }
          }
        },
        colors: ["#008FFB"],
       

      }
    });

  }
}
