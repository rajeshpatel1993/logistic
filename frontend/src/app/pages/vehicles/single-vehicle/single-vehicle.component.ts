import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from '../vehicles.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-single-vehicle',
  templateUrl: './single-vehicle.component.html',
  styleUrls: ['./single-vehicle.component.scss']
})
export class SingleVehicleComponent implements OnInit {

  constructor(private vehicleService : VehicleService, private dialogService: NbDialogService) { }
  @Input() vehicleId ;
  showPage : boolean =false;



  vehicleData : any[] = [];

  ngOnInit() {

    this.loadVehicleDetail(this.vehicleId);
    
  }


  open(dialog:any) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  loadVehicleDetail(vehicleId){

    this.vehicleService.loadVehicle(this.vehicleId).subscribe((vehData)=>{
      // console.log(data);
       this.vehicleData = vehData["data"][0];
      this.showPage = true;
       //console.log("vehdata", this.vehicleData);
    },(error)=>{

    });

    //console.log(vehicleId);

  }

}
