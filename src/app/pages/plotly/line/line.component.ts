import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
// import Plotly from 'plotly.js/dist/plotly';
import { NbThemeService } from '@nebular/theme';
import { PlotlyService } from '../../../service/plotly.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'ngx-line',
  template: `
  <div #myDiv echart style="height: 30vh; width: 100%" class="echart"></div>
  `,
  styles: [
  ]
})
export class LineComponent implements AfterViewInit, OnInit {
  @ViewChild('myDiv') myDiv: ElementRef;

  @Output() nodataText = new EventEmitter<string>();

  themeSubscription: any;

  config: Object = {}

  data: Array<any> = []

  layout: Object = {}

  useResizeHandler: Boolean = true

  checkBool: Boolean = true

  style: Object = {}


  constructor(private theme: NbThemeService, private plotlyService: PlotlyService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void{
    this.spinner.show('line');
  }

  ngAfterViewInit(): void {
    console.log(this.myDiv.nativeElement.innerHTML);
    this.lineChart();
  }

  lineChart(): any {
    let param = {}
    this.spinner.show('line');
    this.plotlyService.linePlotly(param).subscribe(data => {

      if(data && (data.axis.length > 0 || data.AvgArr.length > 0)){
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const echarts: any = config.variables.echarts;
          // console.log("After init", echarts.bg)
          this.config = { displayModeBar: false };
  
          var trace = {
            x: data.axis,
            y: data.AvgArr,
            type: 'scatter',
            name: 'line',
            line: {
              color: colors.primaryLight
            }
          };
  
          this.data = [trace];
  
          this.layout = {
            margin: { t: 0, r: 5, l: 25, b: 35 },
            // height: 400,
            plot_bgcolor: echarts.bg,
            paper_bgcolor: echarts.bg,
            showlegend: false,
            dtick: 50,
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
              // zeroline: false,
              color: echarts.axisLineColor,
            }
          };
  
          // console.log("color of plotly background", this.layout)
  
          Plotly.newPlot(this.myDiv.nativeElement, this.data, this.layout, this.config, this.style, this.useResizeHandler);
  
        })
      }
      else{
        this.myDiv.nativeElement.innerHTML = "No Data Available";
        this.myDiv.nativeElement.style.color = 'red';
        this.myDiv.nativeElement.style.display= "flex";
        this.myDiv.nativeElement.style.justifyContent= "center";
        this.myDiv.nativeElement.style.alignItems= "center";
        this.myDiv.nativeElement.style.color= "#3366ff";
        this.myDiv.nativeElement.style.fontWeight= "bolder";    
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
    });
  }


}
