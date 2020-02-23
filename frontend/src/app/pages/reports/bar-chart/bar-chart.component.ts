import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

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
                format: '{point.y:.1f}%'
            }
        }
    },
  
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
  
    series: [
        {
            name: "Browsers",
            colorByPoint: true,
            data: [
                {
                    name: "Chrome",
                    y: 62.74
                },
                {
                    name: "Firefox",
                    y: 10.57
                },
                {
                    name: "Internet Explorer",
                    y: 7.23
                    
                },
                {
                    name: "Safari",
                    y: 5.58
                   
                },
                {
                    name: "Edge",
                    y: 4.02
                  
                },
                {
                    name: "Opera",
                    y: 1.92
                   
                },
                {
                    name: "Other",
                    y: 7.62
                   
                }
            ]
        }
    ]
  }

  constructor() { }

  ngOnInit() {


  }


  ngAfterViewInit(){

    setTimeout(()=>{

      Highcharts.chart('bar-chart-container', this.options);
    },20000);

  }

}
