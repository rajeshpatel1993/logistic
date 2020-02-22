import { Component, OnInit, ElementRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { VehicleService } from '../../vehicles/vehicles.service';
import { VehicleExpenseService } from '../../vehicle-expense/vehicleexpense.service';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ReportsService } from '../reports.service';
import { Subject } from 'rxjs';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';


@Component({
  selector: 'ngx-vehicle-expense-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {

  public vehicleTypes = [];
  public vehicleDetails = [];
  public assignedVehicles = [];
  public vehicleRegistrations = [];
  public selectedVehicleType;
  public selectedVehicleDetail;
  public selectedVehicleReg;
  public currentPage:String;
  keyword = 'name';

  public filterQueryString = "";

  public vehiclesList: any[] = [];
  public totalItems: any;
  public pager = {};
  public pageOfItems = [];
  public dropDownAction = false;
  public selectedItem = '';
  public selectedPage = '';
  public jsonData = [];


  dtOptions: any = {};
  dtOptions1: any = {};

  dtTrigger: any = new Subject();
  dtTrigger1: any = new Subject();


  selected: any;
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


  constructor(private vehicleService: VehicleService, private vehicleservService: VehicleservService, private activeRoute: ActivatedRoute, private eRef: ElementRef, private router:Router, private dialogService: NbDialogService, private reportService: ReportsService) { 
    this.alwaysShowCalendars = true;

  }

  ngOnInit() {
    this.loadVehicles();
    this.loadAssignedVehicles();
    this.activeRoute.queryParams.subscribe(queryParams => {
      // this.loadExpensesData(queryParams.page);
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };



    this.dtOptions1 = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

  }

  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }
  
  dateRangeChange(event){
    console.log(event);
  }

  onChange(val){
    console.log(val);
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


      // let tmpObj = {};
      // tmpObj["name"] = this.vehiclesList[i].name;
      // tmpObj["driver"] = employeefirstname;
      // tmpObj["location"] = this.vehiclesList[i].workLocationArray[0].workLocation;
      // tmpObj["vehicletype"] = this.vehiclesList[i].vehicleTypesArray[0].vehicleType;
      // tmpObj["status"] = this.vehiclesList[i].vehicleStatusArray[0].vehicleStatus;
      // tmpObj["regno"] = this.vehiclesList[i].regNo;


      // tmpObj["roadtaxdue"] = roadTaxValid;
      // tmpObj["insurancedue"] = insuranceDue;
      // tmpObj["projectname"] = projectName;
      // tmpObj["overallexpense"] = overallExpense;
      // tmpObj["recentexpense"] = lastExpense;

      // this.jsonData.push(tmpObj);

    }

    let optData = {
      head: [['Name', 'Driver', 'Location','Vehicle Type', 'Status', 'Reg No', 'Road Tax Due','Insurance Due','Project Name','Overall Expense','Recent Expense']],
      body: bodyData,
    };

  //  console.log(optData);

  doc.autoTable(optData)

  doc.save('Test.pdf');

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

    this.reportService.downloadFile(this.jsonData, 'jsontocsv', columns);


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

    this.reportService.downloadFile(this.jsonData, 'jsontocsv', columns);


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

  doc.save('Test.pdf');

  }



  public loadVehicles(){
    this.reportService.loadVehicles().subscribe((vehicleData:any)=>{
     this.vehiclesList = vehicleData.data;
    //  console.log(this.vehiclesList);
    this.dtTrigger.next();

    },(error)=>{

    });
  }


  public loadAssignedVehicles(){
    this.reportService.loadAssignVehicles().subscribe((assignedVehicleData: any) => {
      this.assignedVehicles = assignedVehicleData.data;

      this.dtTrigger1.next();

      // console.log(this.assignedVehicles);
    },
    (error) => {

    }
    );
  }


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

  public loadExpensesData(page?){

    let p = page || 1;
    this.vehicleservService.loadVehicleExpenses(p).subscribe((vehicleData:any)=>{
     this.vehiclesList = vehicleData.data;
     
     this.totalItems, this.pageOfItems = vehicleData.data; 
     this.pager = vehicleData.page;
    //  this.pageOfItems = vehicleData.data;

    },(error)=>{

    });

  }







  public loadVehiclesTypes(){
    this.vehicleService.loadVehiclesTypes().subscribe((vehicleType:any) => {
      let vehicleTypeData = vehicleType.data;
      vehicleTypeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.vehicleTypeId;
        tmpObj["name"] = item.vehicleType;
        this.vehicleTypes.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
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


  filterData(){
    this.currentPage = this.activeRoute.snapshot.queryParams.page || 1;
    this.vehicleService.loadFiltereddata(this.filterQueryString, this.currentPage).subscribe((filterData:any) => {
      this.vehiclesList = filterData.data;
      this.totalItems, this.pageOfItems = filterData.data; 
      this.pager = filterData.page;
      // console.log(filterData);
    });
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

  open(dialog:any) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }





 

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  public getDateDifference(expDate){
    let expDatemM = moment(expDate).fromNow();
    return expDatemM;
  };

  public getProgressBarValu(expDate){
    let today = moment();
    let exp = moment(expDate);
    let noofdays = exp.diff(today, 'days');
    let progress = 100 - (noofdays *100 / 365);
    return progress;


  }


}
