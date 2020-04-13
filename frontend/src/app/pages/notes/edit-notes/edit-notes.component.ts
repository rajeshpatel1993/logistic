import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as uuid from 'uuid';
import { Subscription } from 'rxjs';
import { VehicleService } from '../../vehicles/vehicles.service';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';
import { NoteService } from '../note.service';

@Component({
  selector: 'ngx-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnInit {

  public vehicleIssueStatusData:any[] = [];
  public notesForm: FormGroup;
  public noteId : string;
  public vehicleData:any[] = [];
  public vehicleTypesData:any[] = [];
  public vehicleNamesData:any[] = [];
  public expenseTypesData:any[] = [];
  public employeesData:any[]=[];
  public vehicleType:String;
  public vehicleName:String;
  public vehicleRegNo:String;
  public vehicleCode: String;
  public vehicleImage: String;
  public selectedFiles: any[] = [];
  public barCode: String;
  public vehicleDetail:String;
  public workLocationsList: any[] = [];
  public projectTypeList: any[] = [];
  public projectsList: any[] = [];
  public employeeLists:any = [];
  public msgObj ={};
  public dialogBox : boolean = false;
  public submitted = false;
  public expenseSubscription: Subscription;

  keyword = 'name';
  constructor(private vehicleService: VehicleService, private vehicleservService: VehicleservService,private noteService : NoteService, private fb: FormBuilder, private activeRoute: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.noteId = this.activeRoute.snapshot.params.id;
    this.createForm(this.noteId);

    this.loadNote(this.noteId);

  }

  getMsg(val){
    this.dialogBox = false;
    console.log(val);
  }


  get f() { return this.notesForm.controls; }

  createForm(noteId) {
    let group = {
      vehicle: ['', Validators.required],
      noteId:[noteId, Validators.required],
      note: ['']

    }
    this.notesForm = this.fb.group(group);
  }






  
  
  updateNote(){
    console.log(this.notesForm.value);
     this.submitted = true;
    if (this.notesForm.invalid) {
      alert("Please fill all required field");
      return;
    }
    
    this.noteService.updateNote(this.notesForm.value).subscribe((data)=>{
      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Updated";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/notes/list');
    }, 2000);



    },(error)=>{});
  
  }


  selectEventVehicle(item) {
    this.vehicleService.loadVehicle(item).subscribe((vehData) => {
      let veData = vehData["data"][0];
      this.vehicleRegNo = veData.regNo;
      this.vehicleCode = veData.vehicle_code;
      this.vehicleImage = veData.vehicleImage;
      this.vehicleDetail = veData.vehicleDetailsArray[0].vehicleDetails;    },
    (error)=>{
      console.log(error);
    });

  }


  loadNote(noteId){

    this.noteService.loadNote(noteId).subscribe((d)=>{
      let noteData = d['data'][0];

      this.vehicleName = noteData.vehicleData[0].name;
      this.vehicleRegNo = noteData.vehicleData[0].regNo;
      this.vehicleCode = noteData.vehicleData[0].vehicle_code;
      this.vehicleImage = noteData.vehicleData[0].vehicleImage;
      this.notesForm.get("vehicle").patchValue(noteData.vehicle);
      this.notesForm.get("note").patchValue(noteData.note);
     

    }, (error)=>{
      console.log(error);
    });

  }



}
