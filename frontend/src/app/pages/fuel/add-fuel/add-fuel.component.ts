import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { VehicleService } from '../../vehicles/vehicles.service';
import { VehicleservService } from '../../vehicle-service/vehicleserv.service';
import { FuelService } from '../fuel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-add-fuel',
  templateUrl: './add-fuel.component.html',
  styleUrls: ['./add-fuel.component.scss']
})
export class AddFuelComponent implements OnInit {
  submitted = false;
  public fuelEntryForm: FormGroup;
  public keyword = 'name';
  public vehicleNamesData:any[] = [];
  public vehicleTypesData = [];
  public paymentModes = [];

  public vehicleName:String;
  public vehicleRegNo:String = "";
  public vehicleCode: String = "";
  public vehicleImage: String = "";
  public vehicleDetail:String = "";

  public employeeLists:any = [];
  public vehicleDetailsData = [{id:1,name:'Volvo'}, {id:2,name:'Baleno'}];
  public vehicleRegistrations = [{id:1,name:'31212'}, {id:2,name:'23131'}];
  public modeOfPaymentData = [{id:1,name:'Credir Card'},{id:2,name:'Debit Card'}];
  public couponValueData = [{id:1,name:'322424'},{id:2,name:'245121'}];
  public driverData = [{id:1,name:'Driver 1'},{id:2,name:'Driver 2'}];
  public dateforvehiclelist: any;
  public alwaysShowCalendars: boolean;
  public ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  public invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  public startDateVehicle ;
  public endDateVehicle ;
  public billfileuniqueid = uuid.v4();
  public imageFileUniqueId = uuid.v4();
  public selectedFiles: any[] = [];
  public imgSrc: any = [];
  public msgObj ={};
  public dialogBox : boolean = false;

  constructor(private router: Router, private dialogService: NbDialogService,private fb: FormBuilder, private vehicleService : VehicleService, public vehicleservService : VehicleservService, private fuelService: FuelService) { }

  ngOnInit() {
    this.createForm();
    this.loadVehiclesTypes();
    this.loadEmployee();
    this.loadPaymentMethods();

  }

  // this.vehicleExpenseForm.get("vehicle_type").patchValue(expenseData.vehicleType.vehicleType);

  createForm() {
    this.fuelEntryForm = this.fb.group({
      vehicleTypef: [],
      vehicleCode: [''],
      vehicledetails: [''],
      // vehicle: ['', Validators.required],
      vehiclename: ['',Validators.required],
      expiration_time: ['',Validators.required],
      expiration_date: ['',Validators.required],
      amount: ['',Validators.required],
      odometer: [''],
      modeofpayment: ['',Validators.required],
      cardno: [''],
      couponfrom: [''],
      couponto: [''],
      couponvalue: [''],
      type: ['',Validators.required],
      priceunit: ['',Validators.required],
      unit: ['',Validators.required],
      vendorname: [''],
      drivername: ['',Validators.required],
      comment: [''],
      bill_file_unique_id: [this.billfileuniqueid],
      image_file_unique_id: [this.imageFileUniqueId],
    })
  }

  get f() { return this.fuelEntryForm.controls; }

  selectEvent(item, typeofautoselect){}
  onChangeSearch(search:string){}
  onFocused(e){}
  filterData(){}
  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }
  dateRangeChange(event){
    this.startDateVehicle = event.startDate?event.startDate.toISOString():null;
    this.endDateVehicle = event.endDate?event.endDate.toISOString():null;
  }
  addFuel(){
    console.log(this.fuelEntryForm.value);

    this.submitted = true;
    if (this.fuelEntryForm.invalid) {
      alert("Please fill all required field");
      return;
    }

    
    this.fuelService.addFuel(this.fuelEntryForm.value).subscribe((data)=>{
      // console.log(data);
      // alert("Saved successfully");

      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Added";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/fuel/list');
    }, 2000);



    },(error)=>{
      // console.log(error.error.errmsg);
      this.msgObj["type"] = "error";
      this.msgObj["message"] =error.error.errmsg;
      this.dialogBox = true;

    });



  }

  selectEventD(item){
    this.selectVehicleType(item);

  }


  selectEmployee(item){

  }
  
  selectEventVeh(item){
      this.selectEventVehicle(item);
  }

  selectVehicleType(item){
    let vehicleTypeId = item.id;
    this.vehicleservService.loadVehiclesByTypeId(vehicleTypeId).subscribe((vehicleData)=>{
      let vehcilesData = vehicleData["data"];
      vehcilesData.forEach((item,index) => {
        console.log(item);
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


 
  getMsg(val){
    this.dialogBox = false;
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


  fileAdded(event) {
    if(event.target.files.length){
      for(let i=0 ; i < event.target.files.length ;i++){ 
        this.selectedFiles.push(<File>event.target.files[i]);
      }
    }
  }

  uploadBills(){
    // console.log(this.selectedFiles);

   let formD = new FormData();
   formD.append('fileId', this.billfileuniqueid);
   formD.append('typeoffile', "fuel_bills");
    if(this.selectedFiles.length){
      for(let i=0 ; i < this.selectedFiles.length ; i++){
        formD.append('files', this.selectedFiles[i],this.selectedFiles[i].name);
      }
    }

    this.vehicleService.uploadFile(formD).subscribe((data) => {
      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully uploaded";
      this.dialogBox = true;

    },
    (err)=>{
      console.log(err);
    });

  }

  onSelect($event: any) {
    // this.imageFileUniqueId = uuid.v4();
    this.imgSrc = [];
    switch (typeof($event)) {
      case 'string':
        this.imgSrc = [$event];
        break;
      case 'object':
        this.imgSrc = $event;
        break;
      default:
    }
  }

  onReset() {
    this.imgSrc = [];

  }

  public dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}

  uploadImage(){
    // console.log(this.imgSrc);
    const blob = this.dataURItoBlob(this.imgSrc[0]);
    let imgFileName = blob.type.split("/")[1];
    var fd = new FormData();
    fd.append('fileId', this.imageFileUniqueId);
    fd.append('typeoffile', "fuel_image");
    fd.append("files", blob, this.imageFileUniqueId+"."+imgFileName);
    // console.log(imgFileName);

    this.vehicleService.uploadFile(fd).subscribe((data) => {
      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully uploaded";
      this.dialogBox = true;
      // alert("successfully uploaded");
      this.imgSrc = [];
    },(err)=>{
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


  public showCardOption : boolean = false;
  public showCouponOption: boolean = false;

  onChangeEvent(evt){

    let text = evt.target.options[evt.target.options.selectedIndex].text;

    switch(text) {
      case "Card":
        this.showCardOption = true;
        this.showCouponOption = false;
        break;
      case "Coupon":
        this.showCouponOption = true;
        this.showCardOption = false;
        break;
      default:
        // code block
    }


    console.log(this.showCardOption);



    // this.showFormFields = 1;
    // this.reminderTypeVal = evt.target.value;

    
    // this.createForm();

  
   
    // if(this.reminderTypeVal == 2){
    //   this.showExtraField = 1;
    // }else{
    //   this.showExtraField = 0;
    // }

  }




  public loadPaymentMethods(){
    this.fuelService.loadPaymentModes().subscribe((dat)=>{
      // console.log(dat);
      this.paymentModes = dat["data"];
    },(err)=>{

    });

  }


}
