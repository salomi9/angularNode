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
  selector: 'ngx-area',
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
export class AreaComponent {
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
          type: "area"
        },
        dataLabels: {
          enabled: false
        },
        series: [
          {
            name: "Series 1",
            data: [45, 52, 38, 45, 19, 23, 2]
          }
        ],
        fill: {
          type: "gradient",
          colors: colors.dangerLight,
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          categories: [
            "01 Jan",
            "02 Jan",
            "03 Jan",
            "04 Jan",
            "05 Jan",
            "06 Jan",
            "07 Jan"
          ],
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
        }
      };

    })
  }
}
