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
  selector: 'ngx-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent implements OnInit {

  public vehicleRegistrations = [];
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

  expensedate;
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


  public vehicleExpenseData = [];


  public startDateVehicle ;
  public endDateVehicle ;
  public assignedVehicles = [];
  public expenseCalled:boolean = false;

  vehiclesList: any[] = [];
  jsonData = [];


  dtOptions: any = {};

  dtTrigger: any = new Subject();


  servicedatepicker: any;
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

    this.loadVehicleExpenseReport();

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


  loadVehicleExpenseReport(){
    this.reportService.loadVehicleExpenses().subscribe((d)=>{
      this.vehicleExpenseData = d["data"];
      this.dtTrigger.next();

    },(err)=>{

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
