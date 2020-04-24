import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintService } from '../complaint.service';

@Component({
  selector: 'ngx-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
})
export class ComplaintListComponent implements OnInit {

  public dateforvehiclelist: any;
  public complainDataList;
  public norecord : boolean = false;
  public totalItems: any;
  public pager = {};
  public showNoRecord : boolean = false;
  public pageOfItems = [];
  public filterQueryString = "";
  constructor(private activeRoute: ActivatedRoute,  private router: Router, private complaintService: ComplaintService ) { }

  ngOnInit() {

    this.activeRoute.queryParams.subscribe(queryParams => {
      let lentgthoffilterQueryString = this.filterQueryString.trim();
      if(lentgthoffilterQueryString.length > 0){
        this.filterData();
      }else{
        this.loadComplaintList(queryParams.page);

      }
      // console.log(lentgthoffilterQueryString.length);
    });

  }


  filterData(){}

  public loadComplaintList(page?){
    let p = page || 1;
    this.complaintService.loadComplains(p).subscribe((vehicleData:any)=>{
     this.complainDataList = vehicleData.data;
     if(this.complainDataList.length > 0){
      this.totalItems, this.pageOfItems = vehicleData.data; 
      this.pager = vehicleData.page;
      this.showNoRecord = false;

      if(this.pager["totalPages"] < p){
        this.router.navigateByUrl('/pages/complaint/list?page='+(p-1));

      }


     }else{
       this.showNoRecord = true;
     }
     
    },(error)=>{

    });
  }




}
