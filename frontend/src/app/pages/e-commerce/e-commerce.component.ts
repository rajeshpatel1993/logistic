import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {

  public vehicleStatusWithCountData = [];
  public vehicleAssignCountData = [];

  constructor(private dashboardService: DashboardService){

  }
  public vehicleWithStatusCountSubscription : Subscription;
  public vehicleAssignCountSubscription : Subscription;
  ngOnInit() {
    
    this.loadVehicleWithStatusCount();
    this.loadVehicleAssignCount();
  }

  public loadVehicleWithStatusCount(){
    this.vehicleWithStatusCountSubscription = this.dashboardService.loadVehicleStatusByCount().subscribe((d)=>{
      this.vehicleStatusWithCountData = d["data"];

    },(error)=>{
      console.log(error);
    });
  }


  public loadVehicleAssignCount(){
    this.vehicleAssignCountSubscription = this.dashboardService.vehicleDataByAssign().subscribe((d)=>{
      this.vehicleAssignCountData = d["data"];
      
    },(error)=>{
      console.log(error);
    });
  }

}
