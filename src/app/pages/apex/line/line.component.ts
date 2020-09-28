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
  // colors: ApexC
};

@Component({
  selector: 'ngx-line',
  template: `
  <div style="text-align:center; height: 30vh; width: 100%">
  <apx-chart
    [series]="chartOptions.series"
    [chart]="chartOptions.chart"
    [xaxis]="chartOptions.xaxis"
    [yaxis]="chartOptions.yaxis"
    
    [colors] = "chartOptions.colors"
  ></apx-chart>
  </div>
  `,
  styles: [
  ]
})
export class LineComponent {
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
        series: [
          {
            name: "My-series",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }
        ],
        chart: {
          height: 220,
          type: "line"
        },
        // title: {
        //   text: "My First Angular Chart"
        // },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
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
        colors: [
          "#00FF00",
          "#0000FF"
        ],
        fill: {
          colors: ['#1A73E8', '#B32824'],
          opacity: 0.9,
          type: 'solid',
        }
      };

    })
  }
}
