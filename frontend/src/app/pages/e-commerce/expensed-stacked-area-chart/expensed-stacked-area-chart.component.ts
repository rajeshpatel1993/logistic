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
  public seriesData: any[] = [];

  public assignedVehicleChartSubscription : Subscription;
  public expenseTypeDataSubscription:Subscription;

  public options: any = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Vehicle Expense by Month Chart'
    },
    xAxis: {
        categories: this.expenseTypeData
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total vehicle expense amount by Month'
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
    series: this.seriesData
}


constructor(public vehicleService: VehicleService, public vehicleServService: VehicleservService) { }

ngOnInit() {
  this.loadExpenseTypeData();
  
}

public getLastMonths(n) {
    var m =['January','February','March','April','May','June','July','August','September','October','November','December'];
    var last_n_months =[]
    var d = new Date()
    for(var i=0;i<n;i++){
      last_n_months[i] = m[d.getMonth()];
      d.setMonth(d.getMonth()-1)
    }
    return last_n_months
}

public hasKeySetTo(obj,key,value)
{
    return obj.hasOwnProperty(key) && obj[key]==value;
}

public loadExpenseTypeData(){
    
    let tmpArrData = [];
    let lastmonths = this.getLastMonths(5);
    // console.log(lastmonths);
    for(let i=0;i<lastmonths.length;i++){
        let tmpObjM = {};
        let keyexists = this.hasKeySetTo(this.seriesData,"name",lastmonths[i]);
        if(!keyexists){
            tmpObjM["name"] = lastmonths[i];
            tmpObjM["data"] = [];
            this.seriesData.push(tmpObjM);
        }
    }
  
  this.expenseTypeDataSubscription = this.vehicleServService.loadExpenseType().subscribe((d)=>{
    let dat = d["data"];
    let tmpsedata = {};


    for(let i=0;i<dat.length;i++){
        let tmpdaa = [];
      this.expenseTypeData.push(dat[i].expenseType);

      this.vehicleServService.getStackChartDataByExpenseType(dat[i]._id).subscribe((da)=>{
          let dataa = da['data'];
            for(let j=0;j<dataa.length;j++){
                this.seriesData[j].data.push(dataa[j]);
            }

      }, (error)=>{
        console.log(error);
      });
    }
    // console.log(this.expenseTypeData);
    // console.log(JSON.stringify(this.seriesData));

    // console.log(this.options);

    setTimeout(()=>{

        Highcharts.chart('container-stacked', this.options);
    },10000)

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
