import { Component } from '@angular/core';
import { VehicleService } from '../vehicles.service';

@Component({
  selector: 'ngx-vehicle-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent {
  public vehiclesList: any[] = [];
  constructor(private vehicleService: VehicleService) {

  }

  ngOnInit() {
    this.loadVehicles();
  }

  public loadVehicles(){
    this.vehicleService.loadVehicles().subscribe((vehicleData:any)=>{
     this.vehiclesList = vehicleData.data;
    },(error)=>{

    });
  }
  ngOnDestroy() {
    
  }

 
}
