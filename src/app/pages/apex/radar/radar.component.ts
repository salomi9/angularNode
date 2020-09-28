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
  selector: 'ngx-radar',
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
export class RadarComponent {
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
          type: "radar"
        },
        dataLabels: {
          enabled: false
        },
      series: [
          {
            name: "Radar Series 1",
            data: [45, 52, 38, 24, 33, 10]
          },
          {
            name: "Radar Series 2",
            data: [26, 21, 20, 6, 8, 15]
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
