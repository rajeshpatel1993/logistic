import { Component, OnInit } from '@angular/core';
import { VehicleservService } from '../vehicleserv.service';
import {VehicleService} from '../../vehicles/vehicles.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as uuid from 'uuid';

@Component({
  selector: 'ngx-vehicle-service-details',
  templateUrl: './vehicle-service-details.component.html',
  styleUrls: ['./vehicle-service-details.component.scss']
})
export class VehicleServiceDetailsComponent implements OnInit {

  public vehicleServiceForm: FormGroup;
  public vehicleId : string;
  public vehicleData:any[] = [];
  public vehicleTypesData:any[] = [];
  public vehicleNamesData:any[] = [];
  public serviceTypesData:any[] = [];
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


  keyword = 'name';
  public billfileuniqueid = uuid.v4();
  public imageuniqueid = uuid.v4();

  constructor(private vehicleService: VehicleService, private vehicleservService: VehicleservService, private fb: FormBuilder, private activeRoute: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.vehicleId = this.activeRoute.snapshot.params.id;
    this.loadVehiclesTypes();
    this.createForm();
    this.loadEmployee();
    this.loadWorkLocations();
    this.loadServiceType();
  }

  getMsg(val){
    this.dialogBox = false;
    //console.log(val);
  }





  selectServiceType(evt){
    
  }

  loadWorkLocations(){
    this.vehicleService.loadWorkLocation().subscribe((workLocations)=>{
      let workLocationsData = workLocations["data"];
      workLocationsData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.workLocation;
        this.workLocationsList.push(tmpObj);
       

      });


    },
    (error) => {
      
    });
  }


  loadProjectType(){
    this.vehicleService.loadProjectType().subscribe((projectTypesData)=>{
      let projectTypeData = projectTypesData["data"];
      projectTypeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = +item.projectTypeId;
        tmpObj["name"] = item.projectTypeName;
        this.projectTypeList.push(tmpObj);
       

      });


    },
    (error) => {
      
    });
  }

  




  get f() { return this.vehicleServiceForm.controls; }

  createForm() {
    let group = {
      vehicle_type: ['', Validators.required],
      vehicle: ['', Validators.required],
      service_type: ['', Validators.required],
      odometer: [''],
      completion_date_time: ['', Validators.required],
      start_date: [''],
      vendor: [''],
      reference: [''],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      attachments : [this.billfileuniqueid],
      images: [this.imageuniqueid],
      in_charge: ['', Validators.required],
      comment: ['']

    }
    this.vehicleServiceForm = this.fb.group(group);
  }


  uploadBills(){
    // console.log(this.selectedFiles);

   let formD = new FormData();
   formD.append('fileId', this.billfileuniqueid);
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
   formD.append('fileId', this.billfileuniqueid);
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

  loadEmployee(){
    this.vehicleService.loadEmployee().subscribe((employeesData:any) => {
      let employeeData = employeesData.data;
      employeeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.firstName;
        this.employeeLists.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
  }


  loadServiceType(){
    this.vehicleservService.loadServiceType().subscribe((serviceTyData:any) => {
      let serviceTypeData = serviceTyData.data;
      serviceTypeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.serviceTaskName;
        this.serviceTypesData.push(tmpObj);
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
  
  
  addService(){
    this.submitted = true;
    if (this.vehicleServiceForm.invalid) {
      alert("Please fill all required field");
      return;
    }
    
    // console.log(this.vehicleServiceForm.value);
    this.vehicleservService.addService(this.vehicleServiceForm.value).subscribe((data)=>{
      //  console.log(data);
      // alert("Saved successfully");

      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Added";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/services/list');
    }, 2000);



    },(error)=>{});
  
  }

}
