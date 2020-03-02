import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';


import * as jsPDF from 'jspdf';

import 'jspdf-autotable';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ReportsService } from '../reports.service';


@Component({
  selector: 'ngx-assign-vehicle-reports',
  templateUrl: './assign-vehicle-reports.component.html',
  styleUrls: ['./assign-vehicle-reports.component.scss']
})
export class AssignVehicleReportsComponent implements OnInit, OnDestroy {

  

  public startDateVehicle ;
  public endDateVehicle ;
  public assignedVehicles = [];

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

    this.loadAssignedVehicles();

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
  exportToExcelAssignVehicle(){
    this.jsonData = [];

    let columns = ['vehiclename', 'vehiclecode', 'currentdrivername','previousdrivername', 'driverlicenseno', 'driverlicensedue', 'location','status','astartdate','aenddate','duration','start_meter','end_meter','distance_in_Kms'];

    for(let i=0;i<this.assignedVehicles.length;i++){
      
      let vehicleName = this.assignedVehicles[i].vehicle.name;
      let vehiclecode = this.assignedVehicles[i].vehicle.vehicle_code;
      let currentDrivername = this.assignedVehicles[i].employee.firstName;
      let previousDrivername = this.assignedVehicles[i].previousDriver ? this.assignedVehicles[i].previousDriver.employee.firstName : 'N. A.';
      let driverLicenseNo = 'N. A.';
      let driverLicenseDue = this.assignedVehicles[i].driving_license_valid;
      let location = this.assignedVehicles[i].workLocations.workLocation;
      let status = 'N.A.';
      let assignmentStartDate = this.assignedVehicles[i].assignmentStartDate;
      let assignmentEndDate = this.assignedVehicles[i].assignmentEndDate;
      let duration = 'N.A.';
      let startMeter = 'N.A.';
      let endMeter = 'N.A.';
      let distanceinkms = 'N.A.';

      let tmpObj = {};
      tmpObj["vehiclename"] = vehicleName;
      tmpObj["vehiclecode"] = vehiclecode;
      tmpObj["currentdrivername"] = currentDrivername;
      tmpObj["previousdrivername"] = previousDrivername;
      tmpObj["driverlicenseno"] = driverLicenseNo;
      tmpObj["driverlicensedue"] = driverLicenseDue;
      tmpObj["location"] = location;

      tmpObj["status"] = status;
      tmpObj["astartdate"] = assignmentStartDate;
      tmpObj["aenddate"] = assignmentEndDate;
      tmpObj["duration"] = duration;
      tmpObj["start_meter"] = startMeter;
      tmpObj["end_meter"] = endMeter;

      tmpObj["distance_in_Kms"] = distanceinkms;


      this.jsonData.push(tmpObj);

    }

    this.reportService.downloadFile(this.jsonData, 'vehicle', columns);


  }



  exportToPdfAssignVehicle(){
    const doc = new jsPDF()
    doc.autoTable({ html: '#my-table' });
    let bodyData = [];
    let tmpArr = [];

    let columns = ['vehiclename', 'vehiclecode', 'currentdrivername', 'driverlicenseno', 'location','astartdate','aenddate','start_meter','end_meter'];


    for(let i=0;i<this.assignedVehicles.length;i++){
      
      let vehicleName = this.assignedVehicles[i].vehicle.name;
      let vehiclecode = this.assignedVehicles[i].vehicle.vehicle_code;
      let currentDrivername = this.assignedVehicles[i].employee.firstName;
      let previousDrivername = this.assignedVehicles[i].previousDriver ? this.assignedVehicles[i].previousDriver.employee.firstName : 'N. A.';
      let driverLicenseNo = 'N. A.';
      let driverLicenseDue = this.assignedVehicles[i].driving_license_valid;
      let location = this.assignedVehicles[i].workLocations.workLocation;
      let status = 'N.A.';
      let assignmentStartDate = this.assignedVehicles[i].assignmentStartDate;
      let assignmentEndDate = this.assignedVehicles[i].assignmentEndDate;
      let duration = 'N.A.';
      let startMeter = 'N.A.';
      let endMeter = 'N.A.';
      let distanceinkms = 'N.A.';

      tmpArr.push(vehicleName);
      tmpArr.push(vehiclecode);
      tmpArr.push(currentDrivername);
      tmpArr.push(driverLicenseNo);
      tmpArr.push(location);
      tmpArr.push(assignmentStartDate);
      tmpArr.push(assignmentEndDate);
      tmpArr.push(startMeter);
      tmpArr.push(endMeter);

      bodyData.push(tmpArr);
      tmpArr = [];


    }



    let optData = {
      head: [columns],
      body: bodyData,
    };


  //  console.log(optData);

  doc.autoTable(optData)

  doc.save('assignvehicle.pdf');

  }



  public loadAssignedVehicles(){
    this.reportService.loadAssignVehicles().subscribe((assignedVehicleData: any) => {
      this.assignedVehicles = assignedVehicleData.data;

      this.dtTrigger.next();

      // console.log(this.assignedVehicles);
    },
    (error) => {

    }
    );
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
