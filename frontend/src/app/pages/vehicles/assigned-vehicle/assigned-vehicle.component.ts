import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { VehicleService } from '../vehicles.service';
import { Subscription } from 'rxjs';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-assigned-vehicle',
  templateUrl: './assigned-vehicle.component.html',
  styleUrls: ['./assigned-vehicle.component.scss']
})
export class AssignedVehicleComponent implements OnInit {

  @Input() vehicleId: string;
  public vehicleEmpData;
  public isAssigned: boolean = false;
  public vehicleAssignedSubscription: Subscription;
  constructor(private vehicleService: VehicleService,private dialogService: NbDialogService) { }

  ngOnInit() {
    this.loadAssignedVehicle(this.vehicleId);
  

  }
  public loadAssignedVehicle(vehicleId){
    this.vehicleAssignedSubscription = this.vehicleService.loadAssignedVehicleDetail(vehicleId).subscribe((vehicleDetails:any) => {
      let vehicleDetailData = vehicleDetails.data;
      if(!vehicleDetailData){
        this.isAssigned = false;
      }else{
        this.isAssigned = true;
        this.vehicleEmpData = vehicleDetailData.employee;
        

      }
    });

  }

  open(dialog:any) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }


}
