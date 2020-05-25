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
  selector: 'ngx-contact-report',
  templateUrl: './contact-report.component.html',
  styleUrls: ['./contact-report.component.scss']
})
export class ContactReportComponent implements OnInit {

  public contactList : any[]= [];
  public jsonData = [];


  dtOptions: any = {};

  dtTrigger: any = new Subject();


  constructor(private router:Router, private vehicleService: VehicleService,private dialogService: NbDialogService,private activeRoute: ActivatedRoute, private reportService: ReportsService) { }

  ngOnInit() {

    this.loadContacts();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  }


  exportToPdf(){

    let reportTitle = "Contact Report";
    let bodyData = [];
    let tmpArr = [];
    let columns = ['Name', 'Designation', 'Work Location','Emp code', 'Phone number', 'Vehicle assigned'];
    

  
    
    for(let i=0;i<this.contactList.length;i++){
      
  
      tmpArr.push(this.contactList[i].firstName + this.contactList[i].middleName + this.contactList[i].lastName);     
      tmpArr.push(this.contactList[i].jobTitleData.jobTitle);
      tmpArr.push(this.contactList[i].workLocationData.workLocation);
      tmpArr.push(this.contactList[i].employeeCode);
      tmpArr.push(this.contactList[i].primaryContact);

      if(this.contactList[i].assignVehicleData.length > 0){
        tmpArr.push(this.contactList[i].assignVehicleData[0].vehicledata.name);

      }else{
        tmpArr.push("N.A.");


      }
 
      bodyData.push(tmpArr);
      tmpArr = [];

    }

    this.reportService.downloadPdfFile(reportTitle, "contact_report.pdf",columns,bodyData);



  }

  exportToExcel(){

    this.jsonData = [];
    let columns = ['Name', 'Designation', 'Work Location','Emp code', 'Phone number', 'Vehicle assigned'];
    for(let i=0;i<this.contactList.length;i++){
      
      // let  driver  = (this.issueList[i].hasOwnProperty("employeeData") && this.fuelList[i].employeeData) ? this.fuelList[i].employeeData[0].firstName : 'Not Assigned';

      let tmpObj = {};
      tmpObj["Name"] = this.contactList[i].firstName + this.contactList[i].middleName + this.contactList[i].lastName;
      tmpObj["Designation"] = this.contactList[i].jobTitleData.jobTitle;
      tmpObj["Work Location"] = this.contactList[i].workLocationData.workLocation;
      tmpObj["Emp code"] = this.contactList[i].employeeCode;
      tmpObj["Phone number"] = this.contactList[i].primaryContact;

      if( this.contactList[i].assignVehicleData.length > 0){
        tmpObj["Vehicle assigned"] = this.contactList[i].assignVehicleData[0].vehicledata.name;
      }else{
        tmpObj["Vehicle assigned"] = "N.A.";


      }




      this.jsonData.push(tmpObj);

    }

    this.reportService.downloadFile(this.jsonData, 'issue_report', columns);


  }


  public loadContacts(){
    this.reportService.loadContacts().subscribe((contactData:any)=>{
     this.contactList = contactData.data;
     console.log(this.contactList);
    this.dtTrigger.next();

    },(error)=>{

    });
  }




  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
