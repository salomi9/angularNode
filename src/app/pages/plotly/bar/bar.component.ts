import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { PlotlyService } from '../../../service/plotly.service';
@Component({
  selector: 'ngx-bar',
  template: `
  <div #myDiv echart style="height: 30vh; width: 100%" class="echart"></div>
  `,
  styles: [
  ]
})
export class BarComponent implements AfterViewInit {

  @ViewChild('myDiv') myDiv: ElementRef;

  themeSubscription: any;

  config: Object = {}

  data: Array<any> = []

  layout: Object = {}

  useResizeHandler: Boolean = true

  style: Object = {}

  constructor(private theme: NbThemeService, private plotlyService: PlotlyService) { }

  ngAfterViewInit(): void {
    console.log(this.myDiv.nativeElement.innerHTML);
    this.barChart();
  }

  barChart(): any {

    let param = {}

    this.plotlyService.linePlotly(param).subscribe(data => {

      if (data && (data.axis.length > 0 || data.AvgArr.length > 0)) {

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const echarts: any = config.variables.echarts;

          this.config = { displayModeBar: false };

          var trace1 = {
            x: data.axis,
            y: data.AvgArr,
            type: 'bar',
            name: 'bar',
            marker: {
              color: 'rgb(142,124,195)'
            }
          };

          this.data = [trace1];

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
      else {
        this.myDiv.nativeElement.innerHTML = "No Data Available";
        this.myDiv.nativeElement.style.color = 'red';
        this.myDiv.nativeElement.style.display = "flex";
        this.myDiv.nativeElement.style.justifyContent = "center";
        this.myDiv.nativeElement.style.alignItems = "center";
        this.myDiv.nativeElement.style.color = "#3366ff";
        this.myDiv.nativeElement.style.fontWeight = "bolder";
      }
    },
    err => {
      this.myDiv.nativeElement.innerHTML = "No Data Available";
      this.myDiv.nativeElement.style.color = 'red';
      this.myDiv.nativeElement.style.display= "flex";
      this.myDiv.nativeElement.style.justifyContent= "center";
      this.myDiv.nativeElement.style.alignItems= "center";
      this.myDiv.nativeElement.style.color= "#3366ff";
      this.myDiv.nativeElement.style.fontWeight= "bolder";
   
      console.log("ERR in plotly/line", err)
    })

  }
}
