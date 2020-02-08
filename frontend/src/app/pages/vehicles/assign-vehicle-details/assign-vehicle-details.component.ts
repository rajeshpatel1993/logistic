import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicles.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as uuid from 'uuid';

@Component({
  selector: 'ngx-assign-vehicle-details',
  templateUrl: './assign-vehicle-details.component.html',
  styleUrls: ['./assign-vehicle-details.component.scss']
})
export class AssignVehicleDetailsComponent implements OnInit {

  public assignVehicleForm: FormGroup;
  public vehicleId : string;
  public vehicleData:any[] = [];
  public vehicleTypesData = [];
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

  constructor(private vehicleService: VehicleService, private fb: FormBuilder, private activeRoute: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.vehicleId = this.activeRoute.snapshot.params.id;
    this.loadVehicle();
    this.createForm();
    this.loadEmployee();
    this.loadWorkLocations();
    this.loadProjectType();
  }

  getMsg(val){
    this.dialogBox = false;
    console.log(val);
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

  


  loadVehicle(){
    this.vehicleService.loadAssignedVehiclesById(this.vehicleId).subscribe((d) => {
      this.vehicleData = d['data'][0];
      this.vehicleType = this.vehicleData["vehicleTypes"][0].vehicleType;
      this.vehicleName = this.vehicleData["name"];
      this.vehicleRegNo = this.vehicleData["regNo"];
      this.vehicleCode = this.vehicleData["vehicle_code"];
      this.vehicleImage = this.vehicleData["vehicleImage"];
      this.barCode = this.vehicleData["qrCode"];
      this.vehicleDetail = this.vehicleData["vehicleDetailsArray"][0].vehicleDetails;



    }, (error) => {
  
    });
  }

  get f() { return this.assignVehicleForm.controls; }

  createForm() {
    let group = {
      employee_name: ['', Validators.required],
      assignment_start_date: ['', Validators.required],
      assignment_end_date: [''],
      work_location: ['',Validators.required],
      project_type: [''],
      project: [''],
      fuel_limit_per_month: ['', Validators.required],
      driving_license_valid: ['', Validators.required],
      note: ['', Validators.required],
      file_unique_id : [this.billfileuniqueid],
      vehicle_id: [this.vehicleId]

    }
    this.assignVehicleForm = this.fb.group(group);
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

  selectProjectType(projectTypeId){
    let projectId = projectTypeId.id;
    this.projectTypeList = [];
    this.loadProjects(projectId);
  }


  selectEvent(item) {
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


  loadProjects(projectTypeId){
    this.vehicleService.loadProjects(projectTypeId).subscribe((projectsData:any) => {
      let projectData = projectsData.data;
      projectData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.projectName;
        this.projectsList.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
  }


  fileAdded(event) {
    if(event.target.files.length){
      for(let i=0 ; i < event.target.files.length ;i++){ 
        this.selectedFiles.push(<File>event.target.files[i]);
      }
    }
  }
  
  assignVehicle(){
    this.submitted = true;
    if (this.assignVehicleForm.invalid) {
      alert("Please fill all required field");
      return;
    }
    
    this.vehicleService.addAssignVehicle(this.assignVehicleForm.value).subscribe((data)=>{
       console.log(data);
      // alert("Saved successfully");

      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Assigned";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/vehicles/assign-vehicles');
    }, 2000);



    },(error)=>{});
    console.log(this.assignVehicleForm.value);
  }

}
