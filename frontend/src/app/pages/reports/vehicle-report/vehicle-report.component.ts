import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import {formatDate} from '@angular/common';

import * as jsPDF from 'jspdf';

import 'jspdf-autotable';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ReportsService } from '../reports.service';
import { VehicleService } from '../../vehicles/vehicles.service';


@Component({
  selector: 'ngx-vehicle-report',
  templateUrl: './vehicle-report.component.html',
  styleUrls: ['./vehicle-report.component.scss']
})
export class VehicleReportComponent implements OnInit, OnDestroy {

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
  public jsonData = [];

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

  vehiclesList: any[] = [];


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



  constructor(private router:Router, private vehicleService: VehicleService,private dialogService: NbDialogService,private activeRoute: ActivatedRoute, private reportService: ReportsService) { }

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


    let reportTitle = "Vehicle Report";
    let bodyData = [];
    let tmpArr = [];
    let columns = ['Vehicle', 'Driver', 'Location','Vehicle Type', 'Status', 'Reg No','Current Issue Date','Fuel Consumption', 'Road Tax Due','Insurance Due','Driver License Due','Project Name','Overall Expense','Recent Expense'];
    console.log(this.vehiclesList);
    for(let i=0;i<this.vehiclesList.length;i++){
      
      
      tmpArr.push(this.vehiclesList[i].name);

      let  employeefirstname  = (this.vehiclesList[i].hasOwnProperty("assign_data") && this.vehiclesList[i].assign_data) ? this.vehiclesList[i].assign_data.employee.firstName : 'Not Assigned';
      let currIssueDate;
      let fuelConsumption;
      let driverLicenseDue;

      if(this.vehiclesList[i].issueData.length > 0){
        currIssueDate = formatDate(this.vehiclesList[i].issueData[0].createdDate, 'mediumDate','en-US');
      }else{
        currIssueDate = "N.A.";
      }

      if(this.vehiclesList[i].fuelData.length > 0){
        fuelConsumption = this.vehiclesList[i].fuelData[0].total;
      }else{
        fuelConsumption = "N.A.";
      }


      if(this.vehiclesList[i].assignMentStatus == 1){
        driverLicenseDue = formatDate(this.vehiclesList[i].assign_data.driving_license_valid, 'mediumDate','en-US');
      }else{
        driverLicenseDue = "N.A.";
      }

      tmpArr.push(employeefirstname);
      tmpArr.push(this.vehiclesList[i].workLocationArray[0].workLocation);
      tmpArr.push(this.vehiclesList[i].vehicleTypesArray[0].vehicleType);
      tmpArr.push(this.vehiclesList[i].vehicleStatusArray[0].vehicleStatus);
      tmpArr.push(this.vehiclesList[i].regNo);
      tmpArr.push(currIssueDate);
      tmpArr.push(fuelConsumption);
      let roadTaxValid = this.vehiclesList[i].hasOwnProperty("roadTaxValid") ? formatDate(this.vehiclesList[i].roadTaxValid,"mediumDate","en-US"): 'N.A.';
      tmpArr.push(roadTaxValid);
      let insuranceDue = this.vehiclesList[i].hasOwnProperty("insuranceValid") ? formatDate(this.vehiclesList[i].insuranceValid,"mediumDate","en-US"): 'N.A.';
      tmpArr.push(insuranceDue);
      tmpArr.push(driverLicenseDue);

      let  projectName  = (this.vehiclesList[i].hasOwnProperty("assign_data") && this.vehiclesList[i].assign_data )? this.vehiclesList[i].assign_data.projects.projectName : 'Not Assigned';
      tmpArr.push(projectName);

      let overallExpense = this.vehiclesList[i].total_expense.length > 0 ? this.vehiclesList[i].total_expense[0].total : 'No Expense';
      tmpArr.push(overallExpense);

      let lastExpense = this.vehiclesList[i].last_expense.length > 0 ? this.vehiclesList[i].last_expense[0].expense_type.expenseType : 'No Expense';

      tmpArr.push(lastExpense);

      bodyData.push(tmpArr);
      tmpArr = [];

    }

    this.reportService.downloadPdfFile(reportTitle, "vehicle_report.pdf",columns,bodyData);


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



}
