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
  selector: 'ngx-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.scss']
})
export class ServiceReportComponent implements OnInit, OnDestroy {

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




  public serviceReportData = [];

  public startDateVehicle ;
  public endDateVehicle ;
  public assignedVehicles = [];
  public serviceCalled:boolean = false;

  vehiclesList: any[] = [];


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

    this.loadServiceReportData();

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
  exportToPdfService(){

    let reportTitle = "Service Report";
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



    this.reportService.downloadPdfFile(reportTitle, "service_report.pdf",columns,bodyData);

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



  public loadServiceReportData(){

    // console.log('calling services');
    this.reportService.loadServiceTaskData().subscribe((serviceTaskData: any) => {
      this.serviceReportData = serviceTaskData.data;

      this.dtTrigger.next();

      // console.log(this.assignedVehicles);
    },
    (error) => {

    }
    );
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
