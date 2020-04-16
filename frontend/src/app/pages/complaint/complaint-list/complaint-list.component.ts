import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {

  public showNoRecord : boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
