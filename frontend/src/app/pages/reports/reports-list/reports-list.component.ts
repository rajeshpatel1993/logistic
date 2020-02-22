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

  dtOptions: any = {};
  dtTrigger: any = new Subject();


  selected: any;
  alwaysShowCalendars: boolean;
  showRangeLabelOnInput: boolean;
  keepCalendarOpeningWithRange: boolean;
  maxDate: moment.Moment;
  minDate: moment.Moment;
  invalidDates: moment.Moment[] = [];
  ranges: any = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [
      moment()
        .subtract(1, 'month')
        .startOf('month'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
    ],
    'Last 3 Month': [
      moment()
        .subtract(3, 'month')
        .startOf('month'),
      moment()
        .subtract(1, 'month')
        .endOf('month')
    ]
  };

  constructor(private vehicleService: VehicleService, private vehicleservService: VehicleservService, private activeRoute: ActivatedRoute, private eRef: ElementRef, private router:Router, private dialogService: NbDialogService, private reportService: ReportsService) { 
    this.maxDate = moment().add(2,  'weeks');
    this.minDate = moment().subtract(3, 'days');

    this.alwaysShowCalendars = true;
    this.keepCalendarOpeningWithRange = true;
    this.showRangeLabelOnInput = true;
    this.selected = {startDate: moment().subtract(1, 'days'), endDate: moment().subtract(1, 'days')};
    setTimeout(() => {
      this.invalidDates = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
    }, 5000);
  }

  ngOnInit() {
    this.loadVehicles();
    this.activeRoute.queryParams.subscribe(queryParams => {
      // this.loadExpensesData(queryParams.page);
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

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

      console.log(this.vehiclesList[i]);

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

   console.log(optData);

  doc.autoTable(optData)

  doc.save('Test.pdf');

  }

  exportToExcel(){
    alert("excel");

  }


  public loadVehicles(){
    this.reportService.loadVehicles().subscribe((vehicleData:any)=>{
     this.vehiclesList = vehicleData.data;
    //  console.log(this.vehiclesList);
    this.dtTrigger.next();

    },(error)=>{

    });
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





  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') );
  }

  rangeClicked(range) {
    console.log('[rangeClicked] range is : ', range);
  }
  datesUpdated(range) {
    console.log('[datesUpdated] range is : ', range);
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
