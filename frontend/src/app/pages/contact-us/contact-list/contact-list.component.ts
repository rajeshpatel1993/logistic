import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service'

@Component({
  selector: 'ngx-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  public vehicleTypes = [];
  public contactList: any[] = [];
  public pager = {};
  public totalItems: any;
  public showNoRecord : boolean = false;
  public pageOfItems = [];
  public currentPage:String;
  public filterQueryString = "";

  constructor(private contactServices: ContactService, private router:Router,private activeRoute:ActivatedRoute) { }

  ngOnInit() {
  }

  public loadNotes(page?){
    let p = page || 1;
    this.contactServices.loadContact(p).subscribe((noteData:any)=>{
     this.contactList = noteData.data;

     if(this.contactList.length > 0){
      this.totalItems, this.pageOfItems = noteData.data; 
      this.pager = noteData.page;
      this.showNoRecord = false;

      if(this.pager["totalPages"] < p){
        this.router.navigateByUrl('/pages/notes/list?page='+(p-1));
      }
     }else{
       if(p > 1){
        this.router.navigateByUrl('/pages/notes/list?page='+(p-1));
       }
       this.showNoRecord = true;
     }
    },(error)=>{
    });

  }

}
