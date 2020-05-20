import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../../vehicles/vehicles.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';
import { ComplaintService } from '../../complaint/complaint.service';
import * as uuid from 'uuid';

@Component({
  selector: 'ngx-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.scss']
})
export class AddComplaintComponent implements OnInit {

  public complaintForm: FormGroup;
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
  public selectedImages: any[] = [];
  public vehicleDetail:String;
  public msgObj ={};
  public dialogBox : boolean = false;
  public submitted = false;
  public reportedData: [{'id': '1','name': 'a'}];
  public priorityData:any[] = [];
  public statusData: any[];
  public employeeLists:any = [];

  
  


  keyword = 'name';
  public billFileUniqueId = uuid.v4();
  public imageFileUniqueId = uuid.v4();

  
  constructor(private vehicleService: VehicleService, private vehicleservService: VehicleservService, private fb: FormBuilder, private activeRoute: ActivatedRoute,  private router: Router, private complaintService: ComplaintService) { }

  ngOnInit() {
    this.loadVehiclesTypes();
    this.loadvehicleIssueStatus();
    this.loadPriorityStatus();
    this.loadEmployee();
    this.createForm();
  }

  getMsg(val){
    this.dialogBox = false;
    //console.log(val);
  }


  get f() { return this.complaintForm.controls; }

  createForm() {
    let group = {
      vehicle: ['', Validators.required],
      note: [''],
      reported_date: ['', Validators.required],
      reported_time: ['', Validators.required],
      reportedBy: ['', Validators.required],
      assignTo: ['', Validators.required],
      summary: ['', Validators.required],
      description: [''],
      odometer: [''],
      priority: [''],
      status: [''],
      attachments : [this.billFileUniqueId],
      images: [this.imageFileUniqueId],
      notify_assignee: ['']

    }
    this.complaintForm = this.fb.group(group);
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



 


  selectEvent($event){

  }




  selectEventReportedBy(item){

  }

  selectAssignTo(item){


  }

  selectPriority(item){

  }

  selectStaus(item){
    
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



  public loadPriorityStatus(){
    this.complaintService.loadPriorityStatus().subscribe((prData:any) => {
      let priorityListData = prData.data;
      priorityListData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item._id;
        tmpObj["name"] = item.priorityStatus;
        this.priorityData.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
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
  

 
  
  addComplain(){
    // console.log(this.complaintForm.value);
    this.submitted = true;
    if (this.complaintForm.invalid) {
      alert("Please fill all required field");
      return;
    }
    
    this.complaintService.addComplain(this.complaintForm.value).subscribe((data)=>{

      // console.log(data);
      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Added";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/complaint/list');
    }, 2000);



    },(error)=>{});
  
  }

  fileAdded(event) {
    if(event.target.files.length){
      for(let i=0 ; i < event.target.files.length ;i++){ 
        this.selectedFiles.push(<File>event.target.files[i]);
      }
    }
  }

  imageAdded(event) {
    if(event.target.files.length){
      for(let i=0 ; i < event.target.files.length ;i++){ 
        this.selectedImages.push(<File>event.target.files[i]);
      }
    }
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
    if(this.selectedImages.length){
      for(let i=0 ; i < this.selectedImages.length ; i++){
        formD.append('files', this.selectedImages[i],this.selectedImages[i].name);
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

}
