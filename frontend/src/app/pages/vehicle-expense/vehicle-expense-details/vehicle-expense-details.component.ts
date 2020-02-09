import { Component, OnInit } from '@angular/core';
import { VehicleExpenseService } from '../vehicleexpense.service';
import {VehicleService} from '../../vehicles/vehicles.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';

import * as uuid from 'uuid';

@Component({
  selector: 'ngx-vehicle-expense-details',
  templateUrl: './vehicle-expense-details.component.html',
  styleUrls: ['./vehicle-expense-details.component.scss']
})
export class VehicleExpenseDetailsComponent implements OnInit {

  public vehicleExpenseForm: FormGroup;
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
  public billFileUniqueId = uuid.v4();
  public imageFileUniqueId = uuid.v4();

  constructor(private vehicleService: VehicleService, private vehicleservService: VehicleservService, private fb: FormBuilder, private activeRoute: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.vehicleId = this.activeRoute.snapshot.params.id;
    this.loadVehiclesTypes();
    this.createForm();
    this.loadExpenseType();
    this.loadvehicleIssueStatus();
  }

  getMsg(val){
    this.dialogBox = false;
    console.log(val);
  }


  get f() { return this.vehicleExpenseForm.controls; }

  createForm() {
    let group = {
      vehicle_type: ['', Validators.required],
      vehicle: ['', Validators.required],
      expense_type: ['', Validators.required],
      expense_date: ['', Validators.required],
      vendor: [''],
      details: ['', Validators.required],
      amount: ['', Validators.required],
      issue_status: ['', Validators.required],
      attachments : [this.billFileUniqueId],
      images: [this.imageFileUniqueId],
      note: ['']

    }
    this.vehicleExpenseForm = this.fb.group(group);
  }


  uploadBills(){
    // console.log(this.selectedFiles);

   let formD = new FormData();
   formD.append('fileId', this.billFileUniqueId);
   formD.append('typeoffile', "bills");
    if(this.selectedFiles.length){
      for(let i=0 ; i < this.selectedFiles.length ; i++){
        formD.append('files', this.selectedFiles[i],this.selectedFiles[i].name);
      }
    }

    this.vehicleService.uploadFile(formD).subscribe((data) => {
      // alert("successfully uploaded");

      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully uploaded";
      this.dialogBox = true;

    },(err)=>{
      console.log(err);
    });

  }


  uploadImages(){
    // console.log(this.selectedFiles);

   let formD = new FormData();
   formD.append('fileId', this.imageFileUniqueId);
   formD.append('typeoffile', "images");
    if(this.selectedFiles.length){
      for(let i=0 ; i < this.selectedFiles.length ; i++){
        formD.append('files', this.selectedFiles[i],this.selectedFiles[i].name);
      }
    }

    this.vehicleService.uploadFile(formD).subscribe((data) => {
      // alert("successfully uploaded");

      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully uploaded";
      this.dialogBox = true;

    },(err)=>{
      console.log(err);
    });

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


  loadExpenseType(){
    this.vehicleservService.loadExpenseType().subscribe((expenseTyData:any) => {
      let expenseTypeData = expenseTyData.data;
      expenseTypeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.expenseType;
        this.expenseTypesData.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
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

  fileAdded(event) {
    if(event.target.files.length){
      for(let i=0 ; i < event.target.files.length ;i++){ 
        this.selectedFiles.push(<File>event.target.files[i]);
      }
    }
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
  
  
  addExpense(){
    this.submitted = true;
    if (this.vehicleExpenseForm.invalid) {
      alert("Please fill all required field");
      return;
    }
    
    // console.log(this.vehicleServiceForm.value);
    this.vehicleservService.addExpense(this.vehicleExpenseForm.value).subscribe((data)=>{
      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Assigned";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/expenses/list');
    }, 2000);



    },(error)=>{});
  
  }

}
