import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'ngx-remainders-list',
  templateUrl: './remainders-list.component.html',
  styleUrls: ['./remainders-list.component.scss']
})
export class RemaindersListComponent implements OnInit {

  public vehicleTypes = [];

  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
  }

  open(dialog:any) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }
  selectEvent(){}
  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onFocused(e) {
    // do something
  }
  filterData(){}
}
