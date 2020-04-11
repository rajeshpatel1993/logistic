import { Component, OnInit,ElementRef } from '@angular/core';
import { VehicleService } from '../../vehicles/vehicles.service';
import { NbDialogService } from '@nebular/theme';
import { VehicleExpenseService } from '../../vehicle-expense/vehicleexpense.service';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../note.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public vehicleTypes = [];
  public vehicleDetails = [];
  public vehicleRegistrations = [];
  public selectedVehicleType;
  public selectedVehicleDetail;
  public selectedVehicleReg;
  public currentPage:String;
  keyword = 'name';

  public filterQueryString = "";
  public showNoRecord : boolean = false;
  public noteList: any[] = [];
  public totalItems: any;
  public pager = {};
  public pageOfItems = [];
  public dropDownAction = false;

  constructor(private vehicleService: VehicleService, private vehicleservService: VehicleservService, private activeRoute: ActivatedRoute, private eRef: ElementRef, private router:Router, private dialogService: NbDialogService, private noteService: NoteService) { }

  ngOnInit() {
    this.loadVehiclesTypes();

    this.activeRoute.queryParams.subscribe(queryParams => {
      let lentgthoffilterQueryString = this.filterQueryString.trim();
      if(lentgthoffilterQueryString.length > 0){
        this.filterData();
      }else{
        this.loadNotes(queryParams.page);

      }
      // console.log(lentgthoffilterQueryString.length);
    });

   
  }

  selectEvent(item, typeofautoselect) {
    switch (typeofautoselect) {
      case "vehicletype":
        this.selectedVehicleType = item.id;
        this.filterQueryString += "vehicleType="+this.selectedVehicleType;
        this.loadVehicleDetails(item.id);
        break;
      case "vehicledetails":
        this.selectedVehicleDetail = item.id;
        this.filterQueryString += "&vehicleDetail="+this.selectedVehicleDetail;

        break;
      case "vehiclereg":
        this.selectedVehicleReg = item.name;
        this.filterQueryString += "&vehicleReg="+this.selectedVehicleReg;

      default:
        // this.selectedVehicleType = item.id;
    }
  }

  public loadNotes(page?){
    let p = page || 1;
    this.noteService.loadNotes(p).subscribe((noteData:any)=>{
     this.noteList = noteData.data;

     if(this.noteList.length > 0){
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

      // this.router.navigateByUrl('/pages/notes/list?page='+(p-1));
       this.showNoRecord = true;
     }
     
    },(error)=>{

    });

  }



  public loadVehiclesTypes(){
    this.vehicleService.loadVehiclesTypes().subscribe((vehicleType:any) => {
      let vehicleTypeData = vehicleType.data;
      vehicleTypeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.vehicleTypeId;
        tmpObj["name"] = item.vehicleType;
        this.vehicleTypes.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
  }

  public loadVehicleDetails(vehicleTypeId){
    this.vehicleService.loadVehicleDetails(vehicleTypeId).subscribe((vehicleDetails:any) => {
      let vehicleDetailData = vehicleDetails.data;
      vehicleDetailData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.vehicleDetailsId;
        tmpObj["name"] = item.vehicleDetails;
        this.vehicleDetails.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });

  }

  deleteNotes(notesId){
    this.noteService.deleteNote({id:notesId}).subscribe((d) =>{
      this.activeRoute.queryParams.subscribe(queryParams => {
        this.loadNotes(queryParams.page);

      });

     
    },(error) => {
      console.log(error);
    }
    );
  }


  filterData(){
    this.currentPage = this.activeRoute.snapshot.queryParams.page || 1;
    this.vehicleService.loadFiltereddata(this.filterQueryString, this.currentPage).subscribe((filterData:any) => {
      this.noteList = filterData.data;
      this.totalItems, this.pageOfItems = filterData.data; 
      this.pager = filterData.page;
      // console.log(filterData);
    });
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

  open(dialog:any) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  editNotes(notesId){
    
    this.router.navigateByUrl('/pages/notes/edit-notes/'+notesId);
  }

}
