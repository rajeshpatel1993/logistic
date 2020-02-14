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
  public isReassigned=0;

  public employee;
  public assignmentStartDate;
  public endDate;
  public workLocation;
  public projectType;
  public project;
  public fuelLimitMonth;
  public drivingLicenseValid;
  public note;


  keyword = 'name';
  public billfileuniqueid = uuid.v4();

  constructor(private vehicleService: VehicleService, private fb: FormBuilder, private activeRoute: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
   this.isReassigned = this.activeRoute.snapshot.params.isReassigned;
    this.vehicleId = this.activeRoute.snapshot.params.id;
    this.createForm();

    this.loadVehicle();
    
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
        tmpObj["id"] = item.projectTypeId;
        tmpObj["_id"] = item._id;
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

      if(this.isReassigned == 1){
        this.employee = this.vehicleData['assign_data'].employee.firstName;
        this.assignmentStartDate = new Date(this.vehicleData['assign_data']['assignmentStartDate']);
        this.endDate = new Date(this.vehicleData['assign_data']['assignmentEndDate']);
        this.workLocation = this.vehicleData['assign_data'].workLocations.workLocation;
        this.projectType = this.vehicleData['assign_data'].projectsType.projectTypeName;
        this.project = this.vehicleData['assign_data'].projects.projectName;
        this.fuelLimitMonth = this.vehicleData['assign_data'].fuelLimit;
        this.drivingLicenseValid = new Date(this.vehicleData['assign_data'].driving_license_valid);
        this.note = this.vehicleData['assign_data'].note;


        this.assignVehicleForm.get("employee_name").patchValue(this.employee);
        this.assignVehicleForm.get("assignment_start_date").patchValue(this.assignmentStartDate);
        this.assignVehicleForm.get("assignment_end_date").patchValue(this.endDate);
        this.assignVehicleForm.get("work_location").patchValue(this.workLocation);
        this.assignVehicleForm.get("project_type").patchValue(this.projectType);
        this.assignVehicleForm.get("project").patchValue(this.project);
        this.assignVehicleForm.get("fuel_limit_per_month").patchValue(this.fuelLimitMonth);
        this.assignVehicleForm.get("driving_license_valid").patchValue(this.drivingLicenseValid);
        this.assignVehicleForm.get("driving_license_valid").patchValue(this.drivingLicenseValid);
        this.assignVehicleForm.get("note").patchValue(this.note);
        // this.assignVehicleForm.get("vehicle_id").patchValue(this.vehicleData['assign_data'].vehicle._id);
        // this.assignVehicleForm.get("isReassigned").patchValue(this.vehicleData['assign_data'].vehicle._id);








      }

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
      note: [''],
      file_unique_id : [this.billfileuniqueid],
      vehicle_id: [this.vehicleId],
      isReassigned: [this.isReassigned]

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
      //  console.log(data);
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
