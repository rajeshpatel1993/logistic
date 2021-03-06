import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { RemainderService } from '../remainder.service';
import { Subscription } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { VehicleService } from '../../vehicles/vehicles.service';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';

@Component({
  selector: 'ngx-aad-remainders',
  templateUrl: './aad-remainders.component.html',
  styleUrls: ['./aad-remainders.component.scss']
})
export class AadRemaindersComponent implements OnInit {

  public remidnerType = [];
  keyword = 'name';
  submitted = false;
  public remainderTypeData: any = [];
  form: FormGroup;
  public vehicleNamesData:any[] = [];
  public showFormFields:number = 0;
  public typeSubscription: Subscription;
  public vehicleDetailsData = [];
  public reminderForm: FormGroup;
  public attachFileUniqueId = uuid.v4();
  public vehicleStatusList: any = [];
  public dialogBox : boolean = false;
  public msgObj ={};
  public reminderTypeVal;
  public showExtraField : Number = 1;
  public vehicleTypesData = [];
  public showServiceTypeData = 1;
  public serviceTypesData:any[] = [];
  showServiceType:boolean = false;
  group = {};
  reminderIntervals = [];

  public remainderTypeDropDown = [{"name":"single","val":2},{"name":"common", "val":1}];

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'http://localhost:3000/api/vehicles/uploadeditorfile',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  htmlContent = '';


  constructor(private fb: FormBuilder, private remainderService: RemainderService, private router: Router, public vehicleService: VehicleService, private vehicleservService: VehicleservService,) { }


  // constructor(private fb: FormBuilder, protected ref: NbDialogRef<AadRemaindersComponent>, private remainderService: RemainderService) { }


  getMsg(val){
    this.dialogBox = false;
  }

  onChangeEvent(evt){

    this.group = {};

    this.reminderTypeVal = evt.target.value;
    if(this.reminderTypeVal == 2){
      this.showExtraField = 1;
      this.group["vehicleTypef"] =  ['', Validators.required] ;
      this.group["vehicle"] = ['', Validators.required] ;
      this.group["service_type"] = [''];

    }else{
      this.showExtraField = 0;
    }

    this.showFormFields = 1;
    this.createForm(this.group);

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


  onChangeReminderCategory(evt){
    let remType = evt.target.value;
    if(remType == "5eae5e8755bd1858e0f72f16"){
      this.showServiceType = true;
      this.reminderForm.get('service_type').setValidators([Validators.required]);
      this.loadServiceType();
      this.reminderForm.get('service_type').updateValueAndValidity();
    }else{
      this.showServiceType = false;
      this.reminderForm.get('service_type').clearValidators();
      this.reminderForm.get('service_type').updateValueAndValidity();

    }


  }



  ngOnInit() {

    // this.reminderIntervals = Array(5).fill().map((x,i)=>i); // [0,1,2,3,4]

    this.loadTypes();
    this.loadVehiclesTypes();

  }

  selectServiceType(evt){
      

  }
  selectEventD(item) {
    this.vehicleDetailsData = [];
    this.selectVehicleType(item);
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
 


  onChange(event) {
    //console.log('changed');
  }





  createForm(group) {
    let group1 = {
      reminderType:[this.reminderTypeVal],
      category: ['', Validators.required],
      remainder_name: ['', Validators.required],
      subject: ['', Validators.required],
      expiration_date: ['', Validators.required],
      interval: [0, Validators.required],
      email_lists: ['', Validators.required],
      owner: ['', Validators.required],
      template: ['', Validators.required],
      expiration_time: ['', Validators.required],
      notes: [''],
      enable: ['', Validators.required],
      alert_after_expiration: [''],
      attach_file_unique_id: [this.attachFileUniqueId]

    };

    let fObject = {...group, ...group1};
    console.log(fObject);
    this.reminderForm = this.fb.group(fObject);
  }

  get f() { return this.reminderForm.controls; }



  onBlur(event) {
    //console.log('blur ' + event);
  }

  onChange2(event) {
    console.warn(this.form.value);
  }
  fileAdded(event) { }
  uploadBills() { }


  onSubmit() {
    this.submitted = true;
    if (this.reminderForm.invalid) {
      this.msgObj["type"] = "error";
      this.msgObj["message"] = "Please Fill All required fields and Submit again";
      this.dialogBox = true;
      return;
    }

    this.remainderService.addRemainder(this.reminderForm.value).subscribe((d)=>{

      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Added";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/remainders/list');
    }, 2000);

    },(error)=>{


      this.msgObj["type"] = "error";
      this.msgObj["message"] =error.error.errmsg;
      this.dialogBox = true;

      
    });
    // console.log(this.reminderForm.value);
  }
  // cancel() {
  //   this.ref.close();
  // }
  loadTypes() {
    this.typeSubscription = this.remainderService.loadRemainderTypes().subscribe((d) => {
      this.remainderTypeData = d['data'];

    }, (err) => {
      console.log(err);
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
        this.vehicleTypesData.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });
  }


}
