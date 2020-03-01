import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { VehicleService } from '../../vehicles/vehicles.service';
import { Subscription } from 'rxjs';

import * as Highcharts from 'highcharts';
import { ReportsService } from '../reports.service';
import { ActivatedRoute } from '@angular/router';
import { VehicleExpenseService } from '../../vehicle-expense/vehicleexpense.service';
import { Subject } from 'rxjs';
import { NbDialogService } from '@nebular/theme';





@Component({
  selector: 'ngx-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.scss'],
  providers: [VehicleExpenseService]
})
export class ExpenseSummaryComponent implements OnInit {

  public startDateVehicle ;
  public endDateVehicle ;
  // public vehicleId;
  public showNoDataFound:boolean = false;
  dateforvehiclelist;

  

  dtOptions: any = {};
  dtTrigger: any = new Subject();
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
public expenseVehicleData;
public expenseVehicleSubscription : Subscription;
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






  constructor(public reportService: ReportsService, public expenseService: VehicleExpenseService, private activeRoute: ActivatedRoute, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    // this.vehicleId = this.activeRoute.snapshot.params.vehicleId;

    // this.loadExpenseTypeAmount(this.vehicleId);
    this.loadExpenseByVehicleList();
  }



  dateRangeChange(event){

    this.startDateVehicle = event.startDate?event.startDate.toISOString():null;
    this.endDateVehicle = event.endDate?event.endDate.toISOString():null;

    if(this.startDateVehicle && this.endDateVehicle){
      this.chartData = [];
    //  this.loadExpenseTypeAmount(this.vehicleId);
    }
   


    // console.log(this.startDateVehicle);
    // console.log(this.endDateVehicle);
  }


  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }




  loadExpenseByVehicleList(){
    this.expenseVehicleSubscription = this.expenseService.loadExpensesByVehicles().subscribe((res)=>{
      // console.log(data);
      this.expenseVehicleData = res["data"];
      this.dtTrigger.next();
    },
    (error)=>{
      console.log(error);
    });
  }


  open(dialog:any) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }
}
