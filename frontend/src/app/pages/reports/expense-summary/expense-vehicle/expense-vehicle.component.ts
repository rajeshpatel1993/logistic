import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import { ReportsService } from '../../reports.service';


declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'ngx-expense-vehicle',
  templateUrl: './expense-vehicle.component.html',
  styleUrls: ['./expense-vehicle.component.scss']
})
export class ExpenseVehicleComponent implements OnInit, AfterViewInit {
  @Input() vehicleId:String;
  @Input() startDateVehicle = null;
  @Input() endDateVehicle = null;
  @Input() indexOfVehicle=1;
  public chartData:any[] = [];
  public categories:any[] = [];

  constructor(private reportService : ReportsService) { }

  ngOnInit() {

  }

  public options: any = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Vehicle Expenses'
    },

    xAxis: {
        categories: [
           
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Expense Amount'
        }
    },
    tooltip: {
        // headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<table><tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Expense',
        data: []

    }]
};



  
  public assignedVehicleChartSubscription : Subscription;


  public loadExpenseTypeAmount(vehicleId){
    this.chartData = [];
    let tmpData = {};
    tmpData["vehicleId"] = vehicleId;
    tmpData["startDate"] = this.startDateVehicle;
    tmpData["endDate"] = this.endDateVehicle;
    this.assignedVehicleChartSubscription = this.reportService.loadExpenseSummaryChartData(tmpData).subscribe((d)=>{
        let dat = d["data"];

        for(let i=0;i<dat.length;i++){
            this.categories.push(dat[i]["expensesTypes"].expenseType);
            // let tmpObj = {};
            // tmpObj["name"]=dat[i]["expensesTypes"].expenseType;
            // tmpObj["y"] = dat[i]["total"];
             this.chartData.push(dat[i]["total"]);
        }
    
        this.options["series"][0]["data"] = this.chartData;
        this.options["xAxis"]["categories"] = this.categories;

        Highcharts.chart('container-'+this.indexOfVehicle, this.options);
    },(err)=>{
        console.log(err);
    });
  }


  ngAfterViewInit() {
        this.loadExpenseTypeAmount(this.vehicleId)

  }




}
