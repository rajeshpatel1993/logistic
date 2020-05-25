import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';


import * as jsPDF from 'jspdf';

import 'jspdf-autotable';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ReportsService } from '../reports.service';
import { VehicleService } from '../../vehicles/vehicles.service';



@Component({
  selector: 'ngx-assign-vehicle-reports',
  templateUrl: './assign-vehicle-reports.component.html',
  styleUrls: ['./assign-vehicle-reports.component.scss']
})
export class AssignVehicleReportsComponent implements OnInit, OnDestroy {

  public currentPage:String;
  public selectedVehicleType;
  public filterQueryString = "";
  public vehicleTypes = [];
  keyword = 'name';
  public vehicleStatusList: any = [];
  public workLocationsList: any[] = [];

  public selectedVehicleDetail;
  public selectedVehicleReg;
  public vehicleDetails = [];

  public totalItems: any;
  public pager = {};
  public pageOfItems = [];
  public dropDownAction = false;
  public selectedItem = '';
  public selectedPage = '';

  selectEvent(item, typeofautoselect) {
    switch (typeofautoselect) {
      case "vehicletype":
        this.selectedVehicleType = item.id;
        this.filterQueryString += "vehicleType="+this.selectedVehicleType;
        this.loadVehicleDetails(item.id);
        break;
      case "vehicledetails":
        this.selectedVehicleDetail = item.id;
        this.filterQueryString += "&vehicleDetail="+this.selectedVehicleDetail;

        break;
      case "vehiclereg":
        this.selectedVehicleReg = item.name;
        this.filterQueryString += "&vehicleReg="+this.selectedVehicleReg;

      default:
        // this.selectedVehicleType = item.id;
    }
  }


  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }


  onFocused(e) {
    // do something
  }


  filterData(){
    this.currentPage = this.activeRoute.snapshot.queryParams.page || 1;
    this.vehicleService.loadFiltereddata(this.filterQueryString, this.currentPage).subscribe((filterData:any) => {
      this.vehiclesList = filterData.data;
      this.totalItems, this.pageOfItems = filterData.data; 
      this.pager = filterData.page;
      // console.log(filterData);
    });
  }

  public startDateVehicle ;
  public endDateVehicle ;
  public assignedVehicles = [];
  assignvehicledatepicker;
  public vehicleRegistrations = [];


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



  constructor(private router:Router, private dialogService: NbDialogService,private activeRoute: ActivatedRoute, private vehicleService: VehicleService,  private reportService: ReportsService) { }

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
    let reportTitle = "Assign Vehicle Report";
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



    this.reportService.downloadPdfFile(reportTitle, "assign_vehicle_report.pdf",columns,bodyData);


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



  public loadVehicleDetails(vehicleTypeId){
    this.vehicleService.loadVehicleDetails(vehicleTypeId).subscribe((vehicleDetails:any) => {
      let vehicleDetailData = vehicleDetails.data;
      vehicleDetailData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.vehicleDetailsId;
        tmpObj["name"] = item.vehicleDetails;
        this.vehicleDetails.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });

  }

  open(dialog:any) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }



}
