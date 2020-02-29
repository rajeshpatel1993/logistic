import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { VehicleService } from '../../vehicles/vehicles.service';
import { Subscription } from 'rxjs';

import * as Highcharts from 'highcharts';
import { ReportsService } from '../reports.service';
import { ActivatedRoute } from '@angular/router';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Component({
  selector: 'ngx-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.scss']
})
export class ExpenseSummaryComponent implements OnInit {

  public startDateVehicle ;
  public endDateVehicle ;
  public vehicleId;
  public showNoDataFound:boolean = false;
  dateforvehiclelist;

  alwaysShowCalendars: boolean;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];


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
    text: 'Total Expense for Vehicle'
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
    name: 'Total Amount',
    colorByPoint: true,
    data: this.chartData
}]
};






  constructor(public reportService: ReportsService,  private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.vehicleId = this.activeRoute.snapshot.params.vehicleId;

    this.loadExpenseTypeAmount(this.vehicleId);
  }


  dateRangeChange(event){

    this.startDateVehicle = event.startDate?event.startDate.toISOString():null;
    this.endDateVehicle = event.endDate?event.endDate.toISOString():null;

    if(this.startDateVehicle && this.endDateVehicle){
      this.chartData = [];
     this.loadExpenseTypeAmount(this.vehicleId);
    }
   


    // console.log(this.startDateVehicle);
    // console.log(this.endDateVehicle);
  }


  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }



  public loadExpenseTypeAmount(vehicleId){
    this.chartData = [];
    let tmpData = {};
    tmpData["vehicleId"] = vehicleId;
    tmpData["startDate"] = this.startDateVehicle;
    tmpData["endDate"] = this.endDateVehicle;
    this.assignedVehicleChartSubscription = this.reportService.loadExpenseSummaryChartData(tmpData).subscribe((d)=>{
        let dat = d["data"];

        for(let i=0;i<dat.length;i++){
            let tmpObj = {};
            tmpObj["name"]=dat[i]["expensesTypes"].expenseType;
            tmpObj["y"] = dat[i]["total"];
            this.chartData.push(tmpObj);
        }
        // console.log(this.chartData);
        // console.log(this.options);
        this.options["series"][0]["data"] = this.chartData;
        Highcharts.chart('container', this.options);
    },(err)=>{
        console.log(err);
    });
  }


}
