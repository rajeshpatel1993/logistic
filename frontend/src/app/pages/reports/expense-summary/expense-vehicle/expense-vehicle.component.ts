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
  public chartData:any[] = [];
  constructor(private reportService : ReportsService) { }

  ngOnInit() {

  }

  public options: any = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Monthly Average Rainfall'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
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
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

    }]
};

  // public options: any = {
  //   chart: {
  //       plotBackgroundColor: null,
  //       plotBorderWidth: null,
  //       plotShadow: false,
  //       type: 'pie'
  //   },
  //   title: {
  //       text: 'Total Expense for Vehicle'
  //   },
  //   tooltip: {
  //       pointFormat: '{series.name}: <b>{point.y}</b>'
  //   },
  //   accessibility: {
  //       point: {
  //           valueSuffix: '%'
  //       }
  //   },
  //   plotOptions: {
  //       pie: {
  //           allowPointSelect: true,
  //           cursor: 'pointer',
  //           dataLabels: {
  //               enabled: true,
  //               format: '<b>{point.name}</b>: {point.percentage:.1f} %'
  //           }
  //       }
  //   },
  //   series: [{
  //       name: 'Total Amount',
  //       colorByPoint: true,
  //       data: this.chartData
  //   }]
  //   };

  
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


  ngAfterViewInit() {
        this.loadExpenseTypeAmount(this.vehicleId)

  }




}
