import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintService } from '../complaint.service';
import { VehicleServiceModule } from '../../vehicle-service/vehicles-service.module';
import { VehicleService } from '../../vehicles/vehicles.service';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';

@Component({
  selector: 'ngx-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {

  public dateforvehiclelist: any;
  public complainDataList;
  public norecord : boolean = false;
  public totalItems: any;
  public listVehicles:any[] = [];
  public pager = {};
  public vehicleDetails = [];
  public showNoRecord : boolean = false;
  public pageOfItems = [];
  public filterQueryString = "";
  keyword = 'name';
  public vehicleIssueStatusData:any[] = [];
  public vehicleRegistrations = [];
  public selectedVehicleType;
  public selectedVehicleDetail;
  public selectedVehicleReg;
  public priorityData:any[] = [];


  constructor(private activeRoute: ActivatedRoute,  private router: Router, private complaintService: ComplaintService, private vehicleService : VehicleService, private vehicleservService: VehicleservService ) { }

  ngOnInit() {

    this.listVehiclesData();
    this.loadVehicleRegistration();
    this.loadvehicleIssueStatus();
    this.loadPriorityStatus();
    this.activeRoute.queryParams.subscribe(queryParams => {
      let lentgthoffilterQueryString = this.filterQueryString.trim();
      if(lentgthoffilterQueryString.length > 0){
        this.filterData();
      }else{
        this.loadComplaintList(queryParams.page);

      }
      // console.log(lentgthoffilterQueryString.length);
    });

  }


  filterData(){}


  public loadPriorityStatus(){
    this.complaintService.loadPriorityStatus().subscribe((prData:any) => {
      let priorityListData = prData.data;
      priorityListData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.priorityStatus;
        this.priorityData.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
  }



  public loadComplaintList(page?){
    let p = page || 1;
    this.complaintService.loadComplains(p).subscribe((vehicleData:any)=>{
     this.complainDataList = vehicleData.data;
     if(this.complainDataList.length > 0){
      this.totalItems, this.pageOfItems = vehicleData.data; 
      this.pager = vehicleData.page;
      this.showNoRecord = false;

      if(this.pager["totalPages"] < p){
        this.router.navigateByUrl('/pages/complaint/list?page='+(p-1));

      }


     }else{
       this.showNoRecord = true;
     }
     
    },(error)=>{

    });
  }


  deleteIssue(id){
    this.complaintService.deleteComplaint({id:id}).subscribe((d) =>{
      this.activeRoute.queryParams.subscribe(queryParams => {
        this.loadComplaintList(queryParams.page);
      });

     
    },(error) => {
      console.log(error);
    }
    );
  }


  public editIssues(id){
    this.router.navigateByUrl('/pages/complaint/edit-issue/'+id);

  }



  updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
      var hash =  '';
      if( uri.indexOf('#') !== -1 ){
          hash = uri.replace(/.*#/, '#');
          uri = uri.replace(/#.*/, '');
      }
      var separator = uri.indexOf('?') !== -1 ? "&" : "?";    
      return uri + separator + key + "=" + value + hash;
    }
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



  loadvehicleIssueStatus(){
    this.vehicleservService.loadVehicleIssueStatus().subscribe((issueTyData:any) => {
      let issueTypeData = issueTyData.data;
      issueTypeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.vehicleIssueStatus;
        this.vehicleIssueStatusData.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
  }

  

  selectEvent(item, typeofautoselect) {
    switch (typeofautoselect) {
      case "vehicletype":
        this.selectedVehicleType = item.id;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "vehicleType",this.selectedVehicleType);
        // if(!this.filterQueryString.includes('vehicleType') ){
        //   this.filterQueryString += "vehicleType="+this.selectedVehicleType;
        // }
        this.loadVehicleDetails(item.id);
        break;
      case "vehicledetails":
        this.selectedVehicleDetail = item.id;
        // this.filterQueryString += "&vehicleDetail="+this.selectedVehicleDetail;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "vehicleDetail",this.selectedVehicleDetail);

        break;
      case "vehiclereg":
        this.selectedVehicleReg = item.name;
        // this.filterQueryString += "&vehicleReg="+this.selectedVehicleReg;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "vehicleReg",this.selectedVehicleReg);


      default:
        // this.selectedVehicleType = item.id;
    }
  }



  public listVehiclesData(){
    this.vehicleService.listVehicles().subscribe((vehData:any) => {
      let vehicleData = vehData.data;
      vehicleData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.name;
        this.listVehicles.push(tmpObj);
      });
       console.log(this.listVehicles);
    });
  }


  public loadVehicleRegistration(){
    this.vehicleService.loadVehicleRegistrations().subscribe((vehicleRegs:any) => {
      let vehicleRegsData = vehicleRegs.data;
      vehicleRegsData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = index;
        tmpObj["name"] = item;
        this.vehicleRegistrations.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });

  }




}
