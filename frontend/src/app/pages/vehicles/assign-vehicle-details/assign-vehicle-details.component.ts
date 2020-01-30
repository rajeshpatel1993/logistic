import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicles.service';

@Component({
  selector: 'ngx-assign-vehicle-details',
  templateUrl: './assign-vehicle-details.component.html',
  styleUrls: ['./assign-vehicle-details.component.scss']
})
export class AssignVehicleDetailsComponent implements OnInit {

  keyword = 'name';
  data = [
     {
       id: 1,
       name: 'Usa'
     },
     {
       id: 2,
       name: 'England'
     }
  ];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
  }

  public vehicleTypesData = [];
  public loadVehiclesTypes(){
    this.vehicleService.loadVehiclesTypes().subscribe((vehicleType:any) => {
      let vehicleTypeData = vehicleType.data;
      vehicleTypeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.vehicleTypeId;
        tmpObj["name"] = item.vehicleType;
         tmpObj["code"] = item.vehicleTypeCode;
        this.vehicleTypesData.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
  }

  selectEvent(item) {
  }
 
  onChangeSearch(val: string) {
  }
  
  onFocused(e){
  }

}
