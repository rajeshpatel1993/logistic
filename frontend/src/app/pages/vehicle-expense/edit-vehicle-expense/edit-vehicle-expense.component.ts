import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as uuid from 'uuid';
import { Subscription } from 'rxjs';
import { VehicleService } from '../../vehicles/vehicles.service';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';

@Component({
  selector: 'ngx-edit-vehicle-expense-details',
  templateUrl: './edit-vehicle-expense.component.html',
  styleUrls: ['./edit-vehicle-expense.component.scss']
})
export class EditVehicleExpenseComponent implements OnInit {
  public vehicleIssueStatusData:any[] = [];
  public vehicleExpenseForm: FormGroup;
  public expenseId : string;
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
  public billfileuniqueid = uuid.v4();
  public imageuniqueid = uuid.v4();

  constructor(private vehicleService: VehicleService, private vehicleservService: VehicleservService, private fb: FormBuilder, private activeRoute: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.expenseId = this.activeRoute.snapshot.params.id;
    this.loadVehiclesTypes();
    
    // this.loadEmployee();

    this.loadVehicleexpenseD(this.expenseId);
    this.loadExpenseType();

    this.createForm();
  }

  getMsg(val){
    this.dialogBox = false;
    //console.log(val);
  }



  loadVehicleexpenseD(expenseId){
    this.expenseSubscription = this.vehicleservService.loadExpenseData(this.expenseId).subscribe((d)=>{
      let expenseData = d["data"];
      this.vehicleExpenseForm.get("vehicle_type").patchValue(expenseData.vehicleType.vehicleType);
      this.vehicleExpenseForm.get("vehicle").patchValue(expenseData.vehicle.name);
      this.selectEventVehicle({id: expenseData.vehicle._id});
      this.vehicleExpenseForm.get("expense_type").patchValue(expenseData.expense_type.expenseType);
      this.vehicleExpenseForm.get("expense_date").patchValue(new Date(expenseData.expense_date));
      this.vehicleExpenseForm.get("vendor").patchValue(expenseData.vendor);
      this.vehicleExpenseForm.get("details").patchValue(expenseData.details);
      this.vehicleExpenseForm.get("amount").patchValue(expenseData.amount);
      this.vehicleExpenseForm.get("issue_status").patchValue(expenseData.issue_status.vehicleIssueStatus);
      this.vehicleExpenseForm.get("note").patchValue(expenseData.note);

    },(error)=>{

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
      attachments : [this.billfileuniqueid],
      images: [this.imageuniqueid],
      note: ['']

    }
    this.vehicleExpenseForm = this.fb.group(group);
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
      //console.log(vehData);

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
  
  
  
  updateExpense(){
    this.submitted = true;
    if (this.vehicleExpenseForm.invalid) {
      alert("Please fill all required field");
      return;
    }
    
    this.vehicleservService.updateexpense(this.vehicleExpenseForm.value, this.expenseId).subscribe((data)=>{
      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Updated";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/expenses/list');
    }, 2000);



    },(error)=>{});
  
  }

}
