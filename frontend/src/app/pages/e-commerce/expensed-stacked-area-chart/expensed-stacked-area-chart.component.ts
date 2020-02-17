import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { VehicleService } from '../../vehicles/vehicles.service';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'ngx-expensed-stacked-area-chart',
  templateUrl: './expensed-stacked-area-chart.component.html',
  styleUrls: ['./expensed-stacked-area-chart.component.scss']
})
export class ExpensedStackedAreaChartComponent implements OnInit {

  public chartData:any[] = [];
  public expenseTypeData: any[] = [];
  public assignedVehicleChartSubscription : Subscription;
  public expenseTypeDataSubscription:Subscription;

  public options: any = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Stacked column chart'
    },
    xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: 'John',
        data: [5, 3, 4, 7, 2]
    }, {
        name: 'Jane',
        data: [2, 2, 3, 2, 1]
    }, {
        name: 'Joe',
        data: [3, 4, 4, 2, 5]
    }]
}


constructor(public vehicleService: VehicleService, public vehicleServService: VehicleservService) { }

ngOnInit() {
  this.loadExpenseTypeData();

  Highcharts.chart('container-stacked', this.options);
  // console.log(this.options);
  // this.loadExpenseVehicleChartData();
  
  
}

public loadExpenseTypeData(){
  this.expenseTypeDataSubscription = this.vehicleServService.loadExpenseType().subscribe((d)=>{
    let dat = d["data"];
    for(let i=0;i<dat.length;i++){
      this.expenseTypeData.push(dat[i].expenseType);
    }

    console.log(this.expenseTypeData);
  }, (error)=>{
    console.log(error);
  });

}
public loadExpenseVehicleChartData(){
  this.assignedVehicleChartSubscription = this.vehicleService.loadAssignedVehicleChartData().subscribe((d)=>{
      let dat = d["data"];
      for(let i=0;i<dat.length;i++){
          let tmpObj = {};
          tmpObj["name"]=dat[i]["projectTypeName"];
          tmpObj["y"] = dat[i]["totalno"];
          this.chartData.push(tmpObj);
      }
      console.log(this.chartData);
      // Highcharts.chart('container', this.options);
  },(err)=>{
      console.log(err);
  });
}

}
