import { Component, OnInit } from '@angular/core';

import { VehicleService } from '../../vehicles/vehicles.service';
import { Subscription } from 'rxjs';

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
  selector: 'ngx-assign-vehicle-chart',
  templateUrl: './assign-vehicle-chart.component.html',
  styleUrls: ['./assign-vehicle-chart.component.scss']
})
export class AssignVehicleChartComponent implements OnInit {

    public chartData:any[] = [];
    public assignedVehicleChartSubscription : Subscription;
    public options: any = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Assigned Vehicle based on Project Type'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'No of Vehicle',
        colorByPoint: true,
        data: this.chartData
    }]
};


  constructor(public vehicleService: VehicleService) { }

  ngOnInit() {
    this.loadAssignedVehicleChartData();
    
    
  }

  public loadAssignedVehicleChartData(){
    this.assignedVehicleChartSubscription = this.vehicleService.loadAssignedVehicleChartData().subscribe((d)=>{
        let dat = d["data"];
        for(let i=0;i<dat.length;i++){
            let tmpObj = {};
            tmpObj["name"]=dat[i]["projectTypeName"];
            tmpObj["y"] = dat[i]["totalno"];
            this.chartData.push(tmpObj);
        }
        Highcharts.chart('container', this.options);
    },(err)=>{
        console.log(err);
    });
  }

}
