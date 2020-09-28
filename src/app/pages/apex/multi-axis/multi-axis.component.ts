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
  selector: 'ngx-multi-axis',
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
export class MultiAxisComponent {
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
          type: "line",
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
       colors: ["#FF1654", "#247BA0"],
        series: [
          {
            name: "Series A",
            data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
          },
          {
            name: "Series B",
            data: [20, 29, 37, 36, 44, 45, 50, 58]
          }
        ],
        stroke: {
          width: [4, 4]
        },
        plotOptions: {
          bar: {
            columnWidth: "20%"
          }
        },
        xaxis: {
          categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
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
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#FF1654"
            },
            labels: {
              style: {
                colors: "#FF1654"
              }
            },
            title: {
              text: "Series A",
              style: {
                color: "#FF1654"
              }
            }
          },
          {
            opposite: true,
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#247BA0"
            },
            labels: {
              style: {
                colors: "#247BA0"
              }
            },
            title: {
              text: "Series B",
              style: {
                color: "#247BA0"
              }
            }
          }
        ],
       
      
       

      }
    });

  }
}
