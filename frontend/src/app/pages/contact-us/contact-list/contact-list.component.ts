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
    this.activeRoute.queryParams.subscribe(queryParams => {
      let lentgthoffilterQueryString = this.filterQueryString.trim();
      this.loadEmployee(queryParams.page);

    });
  }

  public loadEmployee(page?){
    let p = page || 1;
    this.contactServices.loadContact(p).subscribe((contactData:any)=>{
     this.contactList = contactData.data;

     if(this.contactList.length > 0){
      this.totalItems, this.pageOfItems = contactData.data; 
      this.pager = contactData.page;
      this.showNoRecord = false;

      if(this.pager["totalPages"] < p){
        this.router.navigateByUrl('/pages/contacts/list?page='+(p-1));
      }
     }else{
       if(p > 1){
        this.router.navigateByUrl('/pages/contacts/list?page='+(p-1));
       }
       this.showNoRecord = true;
     }
    },(error)=>{
    });

  }

}
