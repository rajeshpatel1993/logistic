import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintService } from '../complaint.service';
import { VehicleServiceModule } from '../../vehicle-service/vehicles-service.module';
import { VehicleService } from '../../vehicles/vehicles.service';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';
import { NbDialogService } from '@nebular/theme';

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
  public currentPage:String;

  public pageOfItems = [];
  public filterQueryString = "";
  keyword = 'name';
  public vehicleIssueStatusData:any[] = [];
  public vehicleRegistrations = [];
  public selectedVehicleName;
  public selectedVehicleIssueStatus;
  public selectedPriority;
  public priorityData:any[] = [];


  constructor(private activeRoute: ActivatedRoute,  private router: Router, private complaintService: ComplaintService, private vehicleService : VehicleService, private vehicleservService: VehicleservService,private dialogService: NbDialogService ) { }

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


  filterData(){

    this.currentPage = this.activeRoute.snapshot.queryParams.page || 1;
    this.complaintService.loadComplaintFilteredData(this.filterQueryString, this.currentPage).subscribe((filterData:any) => {
      this.complainDataList = filterData.data;
      if(filterData.page.totalItems == 0){
        this.norecord = true;
      }else{
        this.norecord = false;
      }
      this.totalItems, this.pageOfItems = filterData.data; 
      this.pager = filterData.page;
      // console.log(filterData);
    });

  }


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
      this.norecord = false;

      if(this.pager["totalPages"] < p){
        this.router.navigateByUrl('/pages/complaint/list?page='+(p-1));

      }


     }else{
       this.norecord = true;
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
      case "vehicleName":
        this.selectedVehicleName = item.id;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "vehicleName",this.selectedVehicleName);
        break;
      case "issuesStatus":
        this.selectedVehicleIssueStatus = item.id;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "issuesStatus",this.selectedVehicleIssueStatus);

        break;
      case "priority":
        this.selectedPriority = item.name;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "priority",this.selectedPriority);
      default:
        // this.selectedVehicleType = item.id;
    }
  }

  clearEvent(item,typeofautoselect){
    switch (typeofautoselect) {
      case "vehicleName":
        this.selectedVehicleName = null;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "vehicleName",this.selectedVehicleName);
        break;
      case "issuesStatus":
        this.selectedVehicleIssueStatus = null;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "issuesStatus",this.selectedVehicleIssueStatus);
        break;
      case "vehiclereg":
        this.selectedPriority = null;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "priority",this.selectedPriority);

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
       //console.log(this.listVehicles);
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


  open(dialog:any) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

}
