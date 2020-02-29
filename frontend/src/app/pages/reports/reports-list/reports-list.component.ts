import { Component, OnInit, ElementRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { VehicleService } from '../../vehicles/vehicles.service';
import { VehicleExpenseService } from '../../vehicle-expense/vehicleexpense.service';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ReportsService } from '../reports.service';
import { Subject } from 'rxjs';

import * as jsPDF from 'jspdf';

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
  public serviceReportData = [];
  public vehicleRegistrations = [];
  public vehicleExpenseData = [];
  public selectedVehicleType;
  public selectedVehicleDetail;
  public selectedVehicleReg;
  public workLocationsList: any[] = [];
  public currentPage:String;
  public vehicleStatusList: any = [];
  assignvehicledatepicker;
  servicedatepicker;
  expensedate;
  

  keyword = 'name';

  public serviceCalled:boolean = false;
  public expenseCalled:boolean = false;


  public filterQueryString = "";

  public vehiclesList: any[] = [];
  public totalItems: any;
  public pager = {};
  public pageOfItems = [];
  public dropDownAction = false;
  public selectedItem = '';
  public selectedPage = '';
  public jsonData = [];


  public startDateVehicle ;
  public endDateVehicle ;

  dtOptions: any = {};
  dtOptions1: any = {};
  dtOptions2: any = {};
  dtOptions3: any = {};


  dtTrigger: any = new Subject();
  dtTrigger1: any = new Subject();
  dtTrigger2: any = new Subject();
  dtTrigger3: any = new Subject();

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


  constructor(private vehicleService: VehicleService, private vehicleservService: VehicleservService, private activeRoute: ActivatedRoute, private eRef: ElementRef, private router:Router, private dialogService: NbDialogService, private reportService: ReportsService) { 
    this.alwaysShowCalendars = true;

  }

  ngOnInit() {
   
    this.loadVehiclesTypes();
    this.loadVehicleStatus();
    this.loadVehicles();
    this.loadAssignedVehicles();
    this.loadWorkLocations();
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

    this.dtOptions2 = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.dtOptions3 = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

  }

  onChangeTab(event){
    let tabTitle = event.tabTitle;
    if(tabTitle === "Service Management"){
      if(!this.serviceCalled){
        this.loadServiceReportData();
        this.loadGraphData();
        this.serviceCalled = true;
      }
      
    }else if(tabTitle === "Expense"){
      if(!this.expenseCalled){
        this.loadVehicleExpenseReport();
        this.expenseCalled = true;
      }
    }
    
  }

  loadGraphData(){
    this.reportService.loadServiceReportGraphData().subscribe((d)=>{
      console.log(d);

    }, (error) => {

    });
  }


  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }



  
  dateRangeChange(event){

    this.startDateVehicle = event.startDate?event.startDate.toISOString():null;
    this.endDateVehicle = event.endDate?event.endDate.toISOString():null;

    console.log(this.startDateVehicle);
    console.log(this.endDateVehicle);
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



  exportToPdfService(){

    const doc = new jsPDF()
    doc.autoTable({ html: '#my-table' });
    let bodyData = [];
    let tmpArr = [];

    let columns = ['vehiclename', 'vehiclecode', 'drivername', 'location','status','servicetype','lastperformeddate','lastservicecost'];


    for(let i=0;i<this.serviceReportData.length;i++){
      
      let vehicleName = this.serviceReportData[i].vehicle.name;
      let vehiclecode = this.serviceReportData[i].vehicle.vehicle_code;
      let drivername = this.serviceReportData[i].employee.firstName;  
      let location = 'N.A.';
      let status = 'N.A.';
      let servicetype = this.serviceReportData[i].serviceType.serviceTaskName;
      let lastperformeddate = this.serviceReportData[i].previousService[0].createdAt;
      let lastservicecost = this.serviceReportData[i].previousService[0].amount;


      tmpArr.push(vehicleName);
      tmpArr.push(vehiclecode);
      tmpArr.push(drivername);
      tmpArr.push(location);
      tmpArr.push(status);
      tmpArr.push(servicetype);
      tmpArr.push(lastperformeddate);
      tmpArr.push(lastservicecost);
 

      bodyData.push(tmpArr);
      tmpArr = [];


    }



    let optData = {
      head: [columns],
      body: bodyData,
    };


  //  console.log(optData);

    doc.autoTable(optData)

    doc.save('service.pdf');
  }

  exportToPdfExpense(){

    const doc = new jsPDF()
    doc.autoTable({ html: '#my-table' });
    let bodyData = [];
    let tmpArr = [];

    let columns = ['vehiclename', 'vehiclecode',  'status','expense_date','expense_type','description','amount','vendor_name','prev_expense','prev_expense_type'];


    for(let i=0;i<this.vehicleExpenseData.length;i++){
      
      let vehicleName = this.vehicleExpenseData[i].vehicle.name;
      let vehiclecode = this.vehicleExpenseData[i].vehicle.vehicle_code;
      let status = 'N.A.';
      let expense_date = this.vehicleExpenseData[i].expense_date;
      let expense_type = this.vehicleExpenseData[i].expense_type.expenseType;
      let description = this.vehicleExpenseData[i].details;
      let amount = this.vehicleExpenseData[i].amount;
      let vendor_name = this.vehicleExpenseData[i].vendor;
      let prev_expense = this.vehicleExpenseData[i].previousExpense[0].amount;
      let prev_expense_type = this.vehicleExpenseData[i].previousExpense[0].expense_type.expenseType;




      tmpArr.push(vehicleName);
      tmpArr.push(vehiclecode);
      tmpArr.push(status);
      tmpArr.push(expense_date);
      tmpArr.push(expense_type);
      tmpArr.push(description);
      tmpArr.push(amount);
      tmpArr.push(vendor_name);
      tmpArr.push(prev_expense);
      tmpArr.push(prev_expense_type);
 

      bodyData.push(tmpArr);
      tmpArr = [];


    }



    let optData = {
      head: [columns],
      body: bodyData,
    };


  //  console.log(optData);

    doc.autoTable(optData)

    doc.save('expense.pdf');

  }

  exportToExcelExpense(){

    this.jsonData = [];

    let columns = ['vehiclename', 'vehiclecode',  'status','expense_date','expense_type','description','amount','vendor_name','prev_expense','prev_expense_type'];
    for(let i=0;i<this.vehicleExpenseData.length;i++){
      
      let vehicleName = this.vehicleExpenseData[i].vehicle.name;
      let vehiclecode = this.vehicleExpenseData[i].vehicle.vehicle_code;
      let status = 'N.A.';
      let expense_date = this.vehicleExpenseData[i].expense_date;
      let expense_type = this.vehicleExpenseData[i].expense_type.expenseType;
      let description = this.vehicleExpenseData[i].details;
      let amount = this.vehicleExpenseData[i].amount;
      let vendor_name = this.vehicleExpenseData[i].vendor;
      let prev_expense = this.vehicleExpenseData[i].previousExpense[0].amount;
      let prev_expense_type = this.vehicleExpenseData[i].previousExpense[0].expense_type.expenseType;


      let tmpObj = {};
      tmpObj["vehiclename"]=vehicleName;
      tmpObj["vehiclecode"] = vehiclecode;
      tmpObj["status"] = status;
      tmpObj["expense_date"] = expense_date;
      tmpObj["expense_type"] = expense_type;
      tmpObj["description"] = description;
      tmpObj["amount"] = amount;
      tmpObj["vendor_name"] = vendor_name;
      tmpObj["prev_expense"] = prev_expense;
      tmpObj["prev_expense_type"] = prev_expense_type;
  
      this.jsonData.push(tmpObj);


    }

    this.reportService.downloadFile(this.jsonData, 'vehicle_expense', columns);
    this.jsonData = [];

  }

  exportToExcelService(){
    this.jsonData = [];

    let columns = ['vehiclename', 'vehiclecode', 'drivername', 'location','status','servicetype','lastperformeddate','lastservicecost'];
    for(let i=0;i<this.serviceReportData.length;i++){
      
      let vehicleName = this.serviceReportData[i].vehicle.name;
      let vehiclecode = this.serviceReportData[i].vehicle.vehicle_code;
      let drivername = this.serviceReportData[i].employee.firstName;  
      let location = 'N.A.';
      let status = 'N.A.';
      let servicetype = this.serviceReportData[i].serviceType.serviceTaskName;
      let lastperformeddate = this.serviceReportData[i].previousService[0].createdAt;
      let lastservicecost = this.serviceReportData[i].previousService[0].amount;

      let tmpObj = {};
      tmpObj["vehiclename"]=vehicleName;
      tmpObj["vehiclecode"] = vehiclecode;
      tmpObj["drivername"] = drivername;
      tmpObj["location"] = location;
      tmpObj["status"] = status;
      tmpObj["servicetype"] = servicetype;
      tmpObj["lastperformeddate"] = lastperformeddate;
      tmpObj["lastservicecost"] = lastservicecost;
  
      this.jsonData.push(tmpObj);


    }

    this.reportService.downloadFile(this.jsonData, 'service_report', columns);
    this.jsonData = [];

  }





  public loadVehicles(){
    this.reportService.loadVehicles().subscribe((vehicleData:any)=>{
     this.vehiclesList = vehicleData.data;
    //  console.log(this.vehiclesList);
    this.dtTrigger.next();

    },(error)=>{

    });
  }


  loadVehicleStatus(){
    this.vehicleService.loadVehicleStatus().subscribe((vehicleStatus)=>{
      let vehicleStatusData = vehicleStatus["data"];
      vehicleStatusData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = +item.vehicleStatusId;
        tmpObj["name"] = item.vehicleStatus;
        this.vehicleStatusList.push(tmpObj);
       

      });


      // console.log(this.vehicleStatusList);


    },
    (error) => {
      
    });
  }


  loadWorkLocations(){
    this.vehicleService.loadWorkLocation().subscribe((workLocations)=>{
      let workLocationsData = workLocations["data"];
      workLocationsData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = +item.workLocationId;
        tmpObj["name"] = item.workLocation;
        this.workLocationsList.push(tmpObj);
       

      });


    },
    (error) => {
      
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


  public loadServiceReportData(){

    // console.log('calling services');
    this.reportService.loadServiceTaskData().subscribe((serviceTaskData: any) => {
      this.serviceReportData = serviceTaskData.data;

      this.dtTrigger2.next();

      // console.log(this.assignedVehicles);
    },
    (error) => {

    }
    );
  }

  loadVehicleExpenseReport(){
    this.reportService.loadVehicleExpenses().subscribe((d)=>{
      this.vehicleExpenseData = d["data"];
      this.dtTrigger3.next();

    },(err)=>{

    });
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
