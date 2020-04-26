import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintService } from '../complaint.service';
import * as uuid from 'uuid';
import { VehicleService } from '../../vehicles/vehicles.service';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';

@Component({
  selector: 'ngx-edit-complaint',
  templateUrl: './edit-complaint.component.html',
  styleUrls: ['./edit-complaint.component.scss']
})
export class EditComplaintComponent implements OnInit {

  submitted = false;
  public issueId:String;


  keyword = 'name';

  public billFileUniqueId = uuid.v4();
  public imageFileUniqueId = uuid.v4();

  public imgSrc: any = [];
  public msgObj ={};
  public dialogBox : boolean = false;
  public vehicleType:String;
  public vehicleName:String;
  public vehicleRegNo:String;
  public vehicleCode: String;
  public vehicleImage: String;
  public vehicleDetail:String;
  public selectedImages: any[] = [];
  public selectedFiles: any[] = [];
 
  

  public reportedData: [{'id': '1','name': 'a'}];
  public priorityData:any[] = [];
  public statusData: any[];
  public employeeLists:any = [];
  public vehicleIssueStatusData:any[] = [];



  public complaintForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder, private complaintService : ComplaintService, private router: Router, private vehicleService : VehicleService, private vehicleservService: VehicleservService) { }

  ngOnInit() {
    this.issueId = this.activeRoute.snapshot.params.id;


    this.loadvehicleIssueStatus();
    this.loadPriorityStatus();
    this.loadEmployee();

    this.createForm(this.issueId);

    this.loadIssue(this.issueId);


  }



  get f() { return this.complaintForm.controls; }

  createForm(issueid) {
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
      issueId: [issueid],
      attachments : [],
      images: [],
      notify_assignee: ['']

    }
    this.complaintForm = this.fb.group(group);
  }



  updateComplain(){
    // console.log(this.complaintForm.value);
    this.submitted = true;
    if (this.complaintForm.invalid) {
      alert("Please fill all required field");
      return;
    }
    
    this.complaintService.updateComplain(this.complaintForm.value).subscribe((data)=>{

      // console.log(data);
      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Added";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/complaint/list');
    }, 2000);



    },(error)=>{});
  
  }


  loadIssue(issueId){

    this.complaintService.loadIssue(issueId).subscribe((d)=>{
       let issueData = d['data'][0];
       this.vehicleName = issueData.vehicleData[0].name
       this.selectEventVehicle(issueData.vehicle);

      this.complaintForm.get("reported_date").patchValue(issueData.reported_date);
      this.complaintForm.get("vehicle").patchValue(issueData.vehicle);
      this.complaintForm.get("reported_time").patchValue(issueData.reported_time);


      this.complaintForm.get("reportedBy").patchValue(issueData.employeedataReported[0].firstName);
      this.complaintForm.get("assignTo").patchValue(issueData.employeedataAssignTo[0].firstName);
      this.complaintForm.get("summary").patchValue(issueData.summary);


      this.complaintForm.get("description").patchValue(issueData.description);
      this.complaintForm.get("odometer").patchValue(issueData.odometer);
      this.complaintForm.get("priority").patchValue(issueData.priorityData[0].priorityStatus);

      this.complaintForm.get("status").patchValue(issueData.issueStatusData[0].vehicleIssueStatus);
      this.complaintForm.get("note").patchValue(issueData.note);
      this.complaintForm.get("attachments").patchValue(issueData.bill_file_unique_id);
      this.complaintForm.get("images").patchValue(issueData.image_file_unique_id);
      this.complaintForm.get("notify_assignee").patchValue(issueData.notify_assignee);


    }, (error)=>{
      console.log(error);
    });

  }


  selectEventVehicle(vehicleId) {
    this.vehicleService.loadVehicle(vehicleId).subscribe((vehData) => {
      let veData = vehData["data"][0];
      this.vehicleRegNo = veData.regNo;
      this.vehicleCode = veData.vehicle_code;
      this.vehicleImage = veData.vehicleImage;
      this.vehicleDetail = veData.vehicleDetailsArray[0].vehicleDetails;    },
    (error)=>{
      console.log(error);
    });

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
