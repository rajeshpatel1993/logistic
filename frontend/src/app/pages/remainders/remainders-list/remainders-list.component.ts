import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { RemainderService } from '../remainder.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'ngx-remainders-list',
  templateUrl: './remainders-list.component.html',
  styleUrls: ['./remainders-list.component.scss']
})
export class RemaindersListComponent implements OnInit {
  remainderListSubscription: Subscription;
  remainderData : any = [];
  public totalItems: any;
  public pager = {};
  public filterQueryString = "";
  public pageOfItems = [];
  public showNoRecord : boolean = false;

  // constructor(private dialogService: NbDialogService,protected ref: NbDialogRef<RemaindersListComponent>) { }
     constructor(private router: Router,private dialogService: NbDialogService, private activeRoute: ActivatedRoute,private remainderService: RemainderService) { }


  ngOnInit() {
    this.activeRoute.queryParams.subscribe(queryParams => {
      let lentgthoffilterQueryString = this.filterQueryString.trim();
      if(lentgthoffilterQueryString.length > 0){
        this.filterData();
      }else{
        this.loadRemainders(queryParams.page);

      }
      // console.log(lentgthoffilterQueryString.length);
    });
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
  exportToPdf(){}
  // cancel() {
  //   this.ref.close();
  // }


  loadRemainders(page?){
    let p = page || 1;
    this.remainderListSubscription = this.remainderService.loadRemainders(p).subscribe((d)=>{
      this.remainderData = d["data"];


      if(this.remainderData.length > 0){
        this.totalItems, this.pageOfItems = d["data"]; 
        this.pager = d["page"];
  
        if(this.pager["totalPages"] < p){
          this.router.navigateByUrl('/pages/remainders/list?page='+(p-1));
  
        }
  
  
       }else{
         this.showNoRecord = true;
       }



      // console.log(this.pager);
    },(error) => {

    } );
  }

  deleteRemainder(remainderId){
    this.remainderService.deleteRemainder({id:remainderId}).subscribe((d) =>{
      this.activeRoute.queryParams.subscribe(queryParams => {
        this.loadRemainders(queryParams.page);
      });

     
    },(error) => {
      console.log(error);
    }
    );
  }

  editRemainder(remainderId){

    this.router.navigateByUrl('/pages/remainders/edit-remainders/'+remainderId);


  }

}
