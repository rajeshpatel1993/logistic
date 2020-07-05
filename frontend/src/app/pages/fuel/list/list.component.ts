import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import { FuelService } from '../fuel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../vehicles/vehicles.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public keyword = 'name';
  public vehicleTypes = [];
  public vehicleDetails = [];
  public vehicleRegistrations = [];
  public fuelTypesData = [];
  public driveName = [];
  public dateforvehiclelist: any;
  public fuelEntryDataList;
  public norecord : boolean = false;
  public totalItems: any;
  public pager = {};
  public showNoRecord : boolean = false;
  public pageOfItems = [];
  public currentPage:String;
  public filterQueryString = "";
  public selectedVehicleType;
  public selectedVehicleDetail;
  public selectedVehicleReg;
  public selectedFuelType;
  public selectedDriver;
  public selectedStartDate;
  public selectedEndDate;
  

  public alwaysShowCalendars: boolean;
  public ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  public invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  public startDateVehicle ;
  public endDateVehicle ;
  constructor(private dialogService: NbDialogService, private activeRoute: ActivatedRoute, private fuelService : FuelService, private router: Router, private vehicleService: VehicleService) { }

  updateQueryStringParameter(uri, key, value) {
    console.log("called");
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

  ngOnInit() {

    this.loadVehiclesTypes();
    this.loadVehicleRegistration();
    this.loadFuelTypes();
    this.loadEmployee();
    this.activeRoute.queryParams.subscribe(queryParams => {
      let lentgthoffilterQueryString = this.filterQueryString.trim();
      if(lentgthoffilterQueryString.length > 0 ){
        this.filterData();
      }else{
        this.loadFuelEntry(queryParams.page);

      }
      // console.log(lentgthoffilterQueryString.length);
    });
  }

 

  selectEvent(item, typeofautoselect){

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

      case "fueltype":
          this.selectedFuelType = item.id;
          this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "fuelType",this.selectedFuelType);
          break;
      case "drivernm":
          this.selectedDriver = item.id;
          this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "driverName",this.selectedDriver);
          break;
  


      default:
        // this.selectedVehicleType = item.id;
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

  public loadVehicleRegistration(){
    this.vehicleService.loadVehicleRegistrations().subscribe((vehicleRegs:any) => {
      let vehicleRegsData = vehicleRegs.data;
      console.log(vehicleRegsData);
      vehicleRegsData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = index;
        tmpObj["name"] = item;
        this.vehicleRegistrations.push(tmpObj);
      });
      // console.log(vehicleTypeData);
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


  public loadFuelTypes(){
    this.fuelService.loadFuelTypes().subscribe((fuelTypeData:any) => {
      let fTypeData = fuelTypeData.data;
      fTypeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.fuelTypeName;
        this.fuelTypesData.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
  }


  loadEmployee(){
    this.vehicleService.loadEmployee().subscribe((employeesData:any) => {
      let employeeData = employeesData.data;
      employeeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.firstName;
        this.driveName.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
  }


  onChangeSearch(search:string){}
  onFocused(e){}
  filterData(){
   // console.log(this.filterQueryString);
    this.currentPage = this.activeRoute.snapshot.queryParams.page || 1;
    this.fuelService.loadFiltereddata(this.filterQueryString, this.currentPage).subscribe((filterData:any) => {
      this.fuelEntryDataList = filterData.data;
      if(filterData.page.totalItems == 0){
        this.norecord = true;
      }else{
        this.norecord = false;
      }
      this.totalItems, this.pageOfItems = filterData.data; 
      this.pager = filterData.page;
     // console.log(this.norecord);
      // console.log(filterData);
    });


  }
  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }
  dateRangeChange(event){
    this.startDateVehicle = event.startDate?event.startDate.toISOString():null;
    this.endDateVehicle = event.endDate?event.endDate.toISOString():null;
    if(this.startDateVehicle || this.endDateVehicle){
      this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "startDate",this.startDateVehicle);
      this.filterQueryString = this.updateQueryStringParameter(this.filterQueryString, "endDate",this.endDateVehicle);
    }

  }
  open(dialog:any) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }


  public loadFuelEntry(page?){
    let p = page || 1;
    this.fuelService.loadFuelEntries(p).subscribe((vehicleData:any)=>{
     this.fuelEntryDataList = vehicleData.data;
     if(this.fuelEntryDataList.length > 0){
      this.totalItems, this.pageOfItems = vehicleData.data; 
      this.pager = vehicleData.page;
      this.showNoRecord = false;

      if(this.pager["totalPages"] < p){
        this.router.navigateByUrl('/pages/fuel/list?page='+(p-1));

      }


     }else{
       this.showNoRecord = true;
     }
     
    },(error)=>{

    });
  }

  deleteFuel(id){
    this.fuelService.deleteFuelEntry({id:id}).subscribe((d) =>{
      this.activeRoute.queryParams.subscribe(queryParams => {
        this.loadFuelEntry(queryParams.page);
      });

     
    },(error) => {
      console.log(error);
    }
    );
  }

  public editFuel(id){
    this.router.navigateByUrl('/pages/fuel/edit-fuel/'+id);

  }

}
