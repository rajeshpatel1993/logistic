import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-assign-vehicle',
  templateUrl: './assign-vehicle.component.html',
  styleUrls: ['./assign-vehicle.component.scss']
})
export class AssignVehicleComponent implements OnInit {

  public vehicleTypes = [];
  keyword = 'name';
  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
  }

  selectEvent(){}
  onChangeSearch(){}
  onFocused(){}

  open(dialog:any) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

}
