import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import * as moment from 'moment';

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
  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
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
}
