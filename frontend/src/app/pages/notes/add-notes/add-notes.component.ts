import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../../vehicles/vehicles.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';

import * as uuid from 'uuid';
import { NoteService } from '../note.service';

@Component({
  selector: 'ngx-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {

  public notesForm: FormGroup;
  public vehicleId : string;
  public vehicleData:any[] = [];
  public vehicleTypesData:any[] = [];
  public vehicleNamesData:any[] = [];
  public expenseTypesData:any[] = [];
  public vehicleIssueStatusData:any[] = [];
  public vehicleType:String;
  public vehicleName:String;
  public vehicleRegNo:String;
  public vehicleCode: String;
  public vehicleImage: String;
  public selectedFiles: any[] = [];
  public vehicleDetail:String;
  public msgObj ={};
  public dialogBox : boolean = false;
  public submitted = false;


  keyword = 'name';

  
  constructor(private vehicleService: VehicleService, private vehicleservService: VehicleservService, private fb: FormBuilder, private activeRoute: ActivatedRoute,  private router: Router, private noteService: NoteService) { }

  ngOnInit() {
    this.loadVehiclesTypes();
    this.createForm();
    this.loadvehicleIssueStatus();
  }

  getMsg(val){
    this.dialogBox = false;
    //console.log(val);
  }


  get f() { return this.notesForm.controls; }

  createForm() {
    let group = {
      vehicle: ['', Validators.required],
      note: ['']

    }
    this.notesForm = this.fb.group(group);
  }






  selectEventVehicle(item) {
    this.vehicleService.loadVehicle(item.id).subscribe((vehData) => {
      let veData = vehData["data"][0];
      this.vehicleRegNo = veData.regNo;
      this.vehicleCode = veData.vehicle_code;
      this.vehicleImage = veData.vehicleImage;
      this.vehicleDetail = veData.vehicleDetailsArray[0].vehicleDetails;    },
    (error)=>{
      console.log(error);
    });

  }

  selectVehicleType(item){
    let vehicleTypeId = item.id;
    this.vehicleservService.loadVehiclesByTypeId(vehicleTypeId).subscribe((vehicleData)=>{
      let vehcilesData = vehicleData["data"];
      vehcilesData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.name;
        this.vehicleNamesData.push(tmpObj);
      });
    },
    (error) => {
      console.log(error);
    }
    );
    
  }
 
  onChangeSearch(val: string) {
  }
  
  onFocused(e){
  }



  loadvehicleIssueStatus(){
    this.vehicleservService.loadVehicleIssueStatus().subscribe((issueTyData:any) => {
      let issueTypeData = issueTyData.data;
      issueTypeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.vehicleIssueStatus;
        this.vehicleIssueStatusData.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
  }


  selectEvent($event){

  }



  public loadVehiclesTypes(){
    this.vehicleService.loadVehiclesTypes().subscribe((vehicleType:any) => {
      let vehicleTypeData = vehicleType.data;
      vehicleTypeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.vehicleTypeId;
        tmpObj["name"] = item.vehicleType;
         tmpObj["code"] = item.vehicleTypeCode;
         tmpObj["_id"] = item._id;
        this.vehicleTypesData.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
  }
  
  
  addNotes(){
    //console.log(this.notesForm.value);
    this.submitted = true;
    if (this.notesForm.invalid) {
      alert("Please fill all required field");
      return;
    }
    
    // console.log(this.vehicleServiceForm.value);
    this.noteService.addNote(this.notesForm.value).subscribe((data)=>{
      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Added";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/notes/list');
    }, 2000);



    },(error)=>{});
  
  }




  
}
