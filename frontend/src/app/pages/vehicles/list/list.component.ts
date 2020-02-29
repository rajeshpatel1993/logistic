import { Component, ElementRef, HostListener } from '@angular/core';
import { VehicleService } from '../vehicles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import * as moment from 'moment';

@Component({
  selector: 'ngx-vehicle-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent {
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
  public norecord : boolean = false;
  public totalItems: any;
  public pager = {};
  public pageOfItems = [];
  public dropDownAction = false;

  constructor(private vehicleService: VehicleService, private activeRoute: ActivatedRoute, private eRef: ElementRef, private router:Router,private dialogService: NbDialogService ) {

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


  // selectVehicleType(evt){
  //   this.loadVehicleDetails(evt.id);
  // }

  filterData(){
    this.currentPage = this.activeRoute.snapshot.queryParams.page || 1;
    this.vehicleService.loadFiltereddata(this.filterQueryString, this.currentPage).subscribe((filterData:any) => {
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
  ngOnInit() {
    this.loadVehiclesTypes();
    this.loadVehicleRegistration();
    this.activeRoute.queryParams.subscribe(queryParams => {
      let lentgthoffilterQueryString = this.filterQueryString.trim();
      if(lentgthoffilterQueryString.length > 0){
        this.filterData();
      }else{
        this.loadVehicles(queryParams.page);

      }
      // console.log(lentgthoffilterQueryString.length);
    });
    
  }

  public loadVehicles(page?){
    let p = page || 1;
    this.vehicleService.loadVehicles(p).subscribe((vehicleData:any)=>{
     this.vehiclesList = vehicleData.data;
    //  console.log(this.vehiclesList);
     
     this.totalItems, this.pageOfItems = vehicleData.data; 
     this.pager = vehicleData.page;
    //  this.pageOfItems = vehicleData.data;

    },(error)=>{

    });
  }


  deleteVehicle(vehicleId){
    this.vehicleService.deleteVehicle({id:vehicleId}).subscribe((d) =>{
      this.activeRoute.queryParams.subscribe(queryParams => {
        this.loadVehicles(queryParams.page);
      });

     
    },(error) => {
      console.log(error);
    }
    );
  }

  editVehicle(vehicleId){
    
    this.router.navigateByUrl('/pages/vehicles/edit-vehicle/'+vehicleId);
    console.log(vehicleId);
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

  onChangePage(pageOfItems: any) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  ngOnDestroy() {}

  toggleAtion() {
    this.dropDownAction = !this.dropDownAction;
  }
 
  open(dialog:any) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }
}
