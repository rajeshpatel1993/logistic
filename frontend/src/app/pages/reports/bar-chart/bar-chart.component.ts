import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ReportsService } from '../reports.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);



@Component({
  selector: 'ngx-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterViewInit {

  public chartData =      [
    
];
  public options:any =  {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Top Service Task by Usage'
    },
    // subtitle: {
    //     text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    // },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total Count of Service Task'
        }
  
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y}'
            }
        }
    },
  
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}<br/>'
    },
  
    series: [
        {
            name: "Service Task",
            colorByPoint: true,
            data:this.chartData
        
        }
    ]
  }

  constructor(private reportService: ReportsService) { }

  ngOnInit() {
    this.loadGraphData();

  }

  public loadGraphData(){
    this.reportService.loadServiceReportGraphData().subscribe((d)=>{
      let tmpdata = d["data"];
      
      for(let i=0;i<tmpdata.length;i++){
        let tmpObj = {};
        tmpObj["name"] = tmpdata[i].serviceTypeData[0].serviceTaskName;
        tmpObj["y"] = tmpdata[i].countA;
        this.chartData.push(tmpObj);


      }

      setTimeout(()=>{
        //console.log(this.options);
        Highcharts.chart('bar-chart-container', this.options);

      },1000);
      // console.log(tmpdata);
    },(error)=>{

    });
  }

  ngAfterViewInit(){

   

      // Highcharts.chart('bar-chart-container', this.options);
   

  }

}
