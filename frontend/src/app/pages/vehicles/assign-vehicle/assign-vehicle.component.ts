import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-assign-vehicle',
  templateUrl: './assign-vehicle.component.html',
  styleUrls: ['./assign-vehicle.component.scss']
})
export class AssignVehicleComponent implements OnInit {

  public vehicleTypes = [];
  keyword = 'name';
  constructor() { }

  ngOnInit() {
  }

  selectEvent(){}
  onChangeSearch(){}
  onFocused(){}

}
