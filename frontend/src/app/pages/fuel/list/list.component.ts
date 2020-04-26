import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import { FuelService } from '../fuel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public keyword = 'name';
  public vehicleTypes = [{id:1,name:'Heavy Vehicle'}, {id:2,name:'Light Vehicle'}];
  public vehicleDetails = [{id:1,name:'Volvo'}, {id:2,name:'Baleno'}];
  public vehicleRegistrations = [{id:1,name:'31212'}, {id:2,name:'23131'}];
  public fuelType = [{id:1,name:'Petrol'}, {id:2,name:'Diesel'}];
  public driveName = [{id:1,name:'Driver 1'}, {id:2,name:'Driver 2'}];
  public dateforvehiclelist: any;
  public fuelEntryDataList;
  public norecord : boolean = false;
  public totalItems: any;
  public pager = {};
  public showNoRecord : boolean = false;
  public pageOfItems = [];
  public filterQueryString = "";
  

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
  constructor(private dialogService: NbDialogService, private activeRoute: ActivatedRoute, private fuelService : FuelService, private router: Router) { }

  ngOnInit() {


    this.activeRoute.queryParams.subscribe(queryParams => {
      let lentgthoffilterQueryString = this.filterQueryString.trim();
      if(lentgthoffilterQueryString.length > 0){
        this.filterData();
      }else{
        this.loadFuelEntry(queryParams.page);

      }
      // console.log(lentgthoffilterQueryString.length);
    });
  }

 

  selectEvent(item, typeofautoselect){}
  onChangeSearch(search:string){}
  onFocused(e){}
  filterData(){}
  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }
  dateRangeChange(event){
    this.startDateVehicle = event.startDate?event.startDate.toISOString():null;
    this.endDateVehicle = event.endDate?event.endDate.toISOString():null;
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
