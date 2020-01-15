import { Component } from '@angular/core';
import { VehicleService } from '../vehicles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-vehicle-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent {
  public vehiclesList: any[] = [];
  // array of all items to be paged
  totalItems: any;

  pager = {};
  pageOfItems = [];


  constructor(private vehicleService: VehicleService, private activeRoute: ActivatedRoute) {

  }

  

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(queryParams => {
      this.loadVehicles(queryParams.page);
    });
    
  }

  public loadVehicles(page?){
    let p = page || 1;
    this.vehicleService.loadVehicles(p).subscribe((vehicleData:any)=>{
     this.vehiclesList = vehicleData.data;
     this.totalItems, this.pageOfItems = vehicleData.data; 
     this.pager = vehicleData.page;
    //  this.pageOfItems = vehicleData.data;

    },(error)=>{

    });
  }

  onChangePage(pageOfItems: any) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  ngOnDestroy() {
    
  }

 
}
