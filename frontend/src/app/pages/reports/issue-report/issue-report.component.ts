import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';


import * as jsPDF from 'jspdf';

import 'jspdf-autotable';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ReportsService } from '../reports.service';
import { VehicleService } from '../../vehicles/vehicles.service';


@Component({
  selector: 'ngx-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.scss']
})
export class IssueReportComponent implements OnInit {

  public currentPage:String;
  public selectedVehicleType;
  public filterQueryString = "";
  public vehicleTypes = [];
  keyword = 'name';
  public vehicleStatusList: any = [];
  public workLocationsList: any[] = [];
  public issueList : any[]= [];
  public organizationData;
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
  listVehicles = [];
  vehicleIssueStatusData=[];
  priorityData=[];


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


  constructor(private router:Router, private vehicleService: VehicleService,private dialogService: NbDialogService,private activeRoute: ActivatedRoute, private reportService: ReportsService) { }

  ngOnInit() {

    this.loadIssues();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  }


  exportToPdf(){

    let reportTitle = "Issue Report";
    let bodyData = [];
    let tmpArr = [];
    let columns = ['Vehicle_name', 'Issue', 'Status','Priority', 'Employee Assign To', 'Employee Reported To'];
    

  
    
    for(let i=0;i<this.issueList.length;i++){
      
  
      tmpArr.push(this.issueList[i]["vehicleData"][0].name);     
      tmpArr.push(this.issueList[i].description);
      tmpArr.push(this.issueList[i].issueStatusData[0].vehicleIssueStatus);
      tmpArr.push(this.issueList[i].priorityData[0].priorityStatus);
      tmpArr.push(this.issueList[i].employeedataAssignTo[0].firstName + this.issueList[i].employeedataAssignTo[0].middleName + this.issueList[i].employeedataAssignTo[0].lastName);
      tmpArr.push(this.issueList[i].employeedataReported[0].firstName + this.issueList[i].employeedataReported[0].middleName + this.issueList[i].employeedataReported[0].lastName);
 
      bodyData.push(tmpArr);
      tmpArr = [];

    }

    this.reportService.downloadPdfFile(reportTitle, "issue_report.pdf",columns,bodyData);



  }

  exportToExcel(){
    this.jsonData = [];
    let columns = ['Vehicle_name', 'Issue', 'Status','Priority', 'Employee Assign To', 'Employee Reported To'];
    for(let i=0;i<this.issueList.length;i++){
      
      // let  driver  = (this.issueList[i].hasOwnProperty("employeeData") && this.fuelList[i].employeeData) ? this.fuelList[i].employeeData[0].firstName : 'Not Assigned';

      let tmpObj = {};
      tmpObj["Vehicle_name"] = this.issueList[i]["vehicleData"][0].name;
      tmpObj["Issue"] = this.issueList[i].description;
      tmpObj["Status"] = this.issueList[i].issueStatusData[0].vehicleIssueStatus;
      tmpObj["Priority"] =this.issueList[i].priorityData[0].priorityStatus;
      tmpObj["Employee Assign To"] = this.issueList[i].employeedataAssignTo[0].firstName + this.issueList[i].employeedataAssignTo[0].middleName + this.issueList[i].employeedataAssignTo[0].lastName;
      tmpObj["Employee Reported To"] = this.issueList[i].employeedataReported[0].firstName + this.issueList[i].employeedataReported[0].middleName + this.issueList[i].employeedataReported[0].lastName;


      this.jsonData.push(tmpObj);

    }

    this.reportService.downloadFile(this.jsonData, 'issue_report', columns);


  }


  public loadIssues(){
    this.reportService.loadIssues().subscribe((issueData:any)=>{
     this.issueList = issueData.data;
    this.dtTrigger.next();

    },(error)=>{

    });
  }




  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }



}
