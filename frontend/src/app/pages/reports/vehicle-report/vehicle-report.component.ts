import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';


import * as jsPDF from 'jspdf';

import 'jspdf-autotable';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ReportsService } from '../reports.service';


@Component({
  selector: 'ngx-vehicle-report',
  templateUrl: './vehicle-report.component.html',
  styleUrls: ['./vehicle-report.component.scss']
})
export class VehicleReportComponent implements OnInit, OnDestroy {


  public startDateVehicle ;
  public endDateVehicle ;

  vehiclesList: any[] = [];
  jsonData = [];


  dtOptions: any = {};

  dtTrigger: any = new Subject();


  dateforvehiclelist: any;
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



  constructor(private router:Router, private dialogService: NbDialogService, private reportService: ReportsService) { }

  ngOnInit() {

    this.loadVehicles();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  }



  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }



  
  dateRangeChange(event){

    this.startDateVehicle = event.startDate?event.startDate.toISOString():null;
    this.endDateVehicle = event.endDate?event.endDate.toISOString():null;

  }
  exportToPdf(){
    const doc = new jsPDF()
    doc.autoTable({ html: '#my-table' });
    let bodyData = [];
    let tmpArr = [];

    
    for(let i=0;i<this.vehiclesList.length;i++){
      
  
      tmpArr.push(this.vehiclesList[i].name);

      let  employeefirstname  = (this.vehiclesList[i].hasOwnProperty("assign_data") && this.vehiclesList[i].assign_data) ? this.vehiclesList[i].assign_data.employee.firstName : 'Not Assigned';
     
      tmpArr.push(employeefirstname);
      tmpArr.push(this.vehiclesList[i].workLocationArray[0].workLocation);
      tmpArr.push(this.vehiclesList[i].vehicleTypesArray[0].vehicleType);
      tmpArr.push(this.vehiclesList[i].vehicleStatusArray[0].vehicleStatus);
      tmpArr.push(this.vehiclesList[i].regNo);
      let roadTaxValid = this.vehiclesList[i].hasOwnProperty("roadTaxValid") ? this.vehiclesList[i].roadTaxValid: 'N.A.';
      tmpArr.push(roadTaxValid);
      let insuranceDue = this.vehiclesList[i].hasOwnProperty("insuranceValid") ? this.vehiclesList[i].insuranceValid: 'N.A.';
      tmpArr.push(insuranceDue);

      let  projectName  = (this.vehiclesList[i].hasOwnProperty("assign_data") && this.vehiclesList[i].assign_data )? this.vehiclesList[i].assign_data.projects.projectName : 'Not Assigned';
      tmpArr.push(projectName);

      let overallExpense = this.vehiclesList[i].total_expense.length > 0 ? this.vehiclesList[i].total_expense[0].total : 'No Expense';
      tmpArr.push(overallExpense);

      let lastExpense = this.vehiclesList[i].last_expense.length > 0 ? this.vehiclesList[i].last_expense[0].expense_type.expenseType : 'No Expense';

      tmpArr.push(lastExpense);

      bodyData.push(tmpArr);
      tmpArr = [];

    }

    let optData = {
      head: [['Name', 'Driver', 'Location','Vehicle Type', 'Status', 'Reg No', 'Road Tax Due','Insurance Due','Project Name','Overall Expense','Recent Expense']],
      body: bodyData,
    };

  //  console.log(optData);

  doc.autoTable(optData)

  doc.save('vehicle-report.pdf');

  }

  exportToExcel(){
    this.jsonData = [];
    let columns = ['name', 'driver', 'location','vehicletype', 'status', 'regno', 'roadtaxdue','insurancedue','projectname','overallexpense','recentexpense'];
    for(let i=0;i<this.vehiclesList.length;i++){
      
  

      let  employeefirstname  = (this.vehiclesList[i].hasOwnProperty("assign_data") && this.vehiclesList[i].assign_data) ? this.vehiclesList[i].assign_data.employee.firstName : 'Not Assigned';
      let roadTaxValid = this.vehiclesList[i].hasOwnProperty("roadTaxValid") ? this.vehiclesList[i].roadTaxValid: 'N.A.';
      let insuranceDue = this.vehiclesList[i].hasOwnProperty("insuranceValid") ? this.vehiclesList[i].insuranceValid: 'N.A.';

      let  projectName  = (this.vehiclesList[i].hasOwnProperty("assign_data") && this.vehiclesList[i].assign_data )? this.vehiclesList[i].assign_data.projects.projectName : 'Not Assigned';

      let overallExpense = this.vehiclesList[i].total_expense.length > 0 ? this.vehiclesList[i].total_expense[0].total : 'No Expense';

      let lastExpense = this.vehiclesList[i].last_expense.length > 0 ? this.vehiclesList[i].last_expense[0].expense_type.expenseType : 'No Expense';




      let tmpObj = {};
      tmpObj["name"] = this.vehiclesList[i].name;
      tmpObj["driver"] = employeefirstname;
      tmpObj["location"] = this.vehiclesList[i].workLocationArray[0].workLocation;
      tmpObj["vehicletype"] = this.vehiclesList[i].vehicleTypesArray[0].vehicleType;
      tmpObj["status"] = this.vehiclesList[i].vehicleStatusArray[0].vehicleStatus;
      tmpObj["regno"] = this.vehiclesList[i].regNo;


      tmpObj["roadtaxdue"] = roadTaxValid;
      tmpObj["insurancedue"] = insuranceDue;
      tmpObj["projectname"] = projectName;
      tmpObj["overallexpense"] = overallExpense;
      tmpObj["recentexpense"] = lastExpense;

      this.jsonData.push(tmpObj);

    }

    this.reportService.downloadFile(this.jsonData, 'vehicle', columns);


  }


  public loadVehicles(){
    this.reportService.loadVehicles().subscribe((vehicleData:any)=>{
     this.vehiclesList = vehicleData.data;
    //  console.log(this.vehiclesList);
    this.dtTrigger.next();

    },(error)=>{

    });
  }


  public getProgressBarValu(expDate){
    let today = moment();
    let exp = moment(expDate);
    let noofdays = exp.diff(today, 'days');
    let progress = 100 - (noofdays *100 / 365);
    return progress;


  }

  public getDateDifference(expDate){
    let expDatemM = moment(expDate).fromNow();
    return expDatemM;
  };


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }




}
