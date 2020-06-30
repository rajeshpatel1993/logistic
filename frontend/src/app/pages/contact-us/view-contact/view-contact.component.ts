import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {

  employeeId;
  empData;
  showEmpData:boolean = false;
  empDataSubscription : Subscription;
  constructor(private contactService : ContactService, private activeRoute: ActivatedRoute){

  }

  ngOnInit(){
      this.employeeId = this.activeRoute.snapshot.params.id;
      this.loadContactDetail(this.employeeId);
  }

  loadContactDetail(empId){
    this.empDataSubscription = this.contactService.getContactDetail(empId).subscribe((d)=>{

      this.empData = d["data"];
      this.showEmpData = true;
    },(error)=>{})
  }

}
