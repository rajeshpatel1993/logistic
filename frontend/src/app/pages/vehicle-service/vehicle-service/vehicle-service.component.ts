import { Component, OnInit, ElementRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { VehicleService } from '../../vehicles/vehicles.service';
import { VehicleservService } from '../vehicleserv.service';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'ngx-vehicle-service',
  templateUrl: './vehicle-service.component.html',
  styleUrls: ['./vehicle-service.component.scss']
})
export class VehicleServiceComponent implements OnInit {

  public vehicleTypes = [];
  public vehicleDetails = [];
  public vehicleRegistrations = [];
  public selectedVehicleType;
  public selectedVehicleDetail;
  public selectedVehicleReg;
  public currentPage:String;
  public norecord : boolean = false;
  keyword = 'name';

  public filterQueryString = "";

  public vehiclesList: any[] = [];
  public totalItems: any;
  public pager = {};
  public pageOfItems = [];
  public dropDownAction = false;


  constructor(private vehicleService: VehicleService, private vehicleservService: VehicleservService, private activeRoute: ActivatedRoute, private eRef: ElementRef, private router:Router, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.loadVehiclesTypes();
    this.loadVehicleRegistration();
    this.activeRoute.queryParams.subscribe(queryParams => {
      this.loadServicesData(queryParams.page);
    });

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

  selectEvent(item, typeofautoselect) {
    switch (typeofautoselect) {
      case "vehicletype":
        this.selectedVehicleType = item.id;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "vehicleType",this.selectedVehicleType);
        this.loadVehicleDetails(item.id);
        break;
      case "vehicledetails":
        this.selectedVehicleDetail = item.id;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "vehicleDetail",this.selectedVehicleDetail);

        break;
      case "vehiclereg":
        this.selectedVehicleReg = item.name;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "vehicleReg",this.selectedVehicleReg);

      default:
        // this.selectedVehicleType = item.id;
    }
  }


  clearEvent(item,typeofautoselect){
    switch (typeofautoselect) {
      case "vehicletype":
        this.selectedVehicleType = null;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "vehicleType",this.selectedVehicleType);
        break;
      case "vehicledetails":
        this.selectedVehicleDetail = null;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "vehicleDetail",this.selectedVehicleDetail);
        break;
      case "vehiclereg":
        this.selectedVehicleReg = null;
        this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "vehicleReg",this.selectedVehicleReg);

      default:
        // this.selectedVehicleType = item.id;
    }

  }



  public loadVehicles(page?){
    let p = page || 1;
    this.vehicleService.loadAssignVehicles(p).subscribe((vehicleData:any)=>{
     this.vehiclesList = vehicleData.data;     
     this.totalItems, this.pageOfItems = vehicleData.data; 
     this.pager = vehicleData.page;
    //  this.pageOfItems = vehicleData.data;

    },(error)=>{

    });
  }


  public loadServicesData(page?){

    let p = page || 1;
    this.vehicleservService.loadVehicleServices(p).subscribe((vehicleData:any)=>{
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

  filterData(){
    this.currentPage = this.activeRoute.snapshot.queryParams.page || 1;
    this.vehicleservService.loadServiceFilteredData(this.filterQueryString, this.currentPage).subscribe((filterData:any) => {
      this.vehiclesList = filterData.data;
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



  deleteVehicle(vehicleId){
    this.vehicleservService.deleteVehicle({id:vehicleId}).subscribe((d) =>{
      this.activeRoute.queryParams.subscribe(queryParams => {
        this.loadServicesData(queryParams.page);
      });

     
    },(error) => {
      console.log(error);
    }
    );
  }
  editService(vehicleId){
    
    this.router.navigateByUrl('/pages/services/edit-vehicle-service/'+vehicleId);
  }


}
