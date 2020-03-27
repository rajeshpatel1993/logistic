import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'ngx-add-fuel',
  templateUrl: './add-fuel.component.html',
  styleUrls: ['./add-fuel.component.scss']
})
export class AddFuelComponent implements OnInit {

  public fuelEntryForm: FormGroup;
  public keyword = 'name';
  public vehicleTypesData = [{id:1,name:'Heavy Vehicle'}, {id:2,name:'Light Vehicle'}];
  public vehicleDetailsData = [{id:1,name:'Volvo'}, {id:2,name:'Baleno'}];
  public vehicleNameData = [{id:1,name:'BMW'},{id:2,name:'AUDI'}]
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

  constructor(private dialogService: NbDialogService,private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.fuelEntryForm = this.fb.group({
      vehicleTypef: [],
      vehicleCode: ['', Validators.required],
      vehicledetails: ['',Validators.required],
      vehiclename: ['',Validators.required],
      expiration_time: ['',Validators.required],
      expiration_date: ['',Validators.required],
      amount: ['',Validators.required],
      odometer: [''],
      modeofpayment: ['',Validators.required],
      cardno: ['',Validators.required],
      couponfrom: ['',Validators.required],
      couponto: ['',Validators.required],
      couponvalue: ['',Validators.required],
      type: ['',Validators.required],
      priceunit: ['',Validators.required],
      unit: ['',Validators.required],
      vendername: [''],
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
  addVehicle(){}

  selectEventD(item){}
  
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
   formD.append('typeoffile', "bills");
    if(this.selectedFiles.length){
      for(let i=0 ; i < this.selectedFiles.length ; i++){
        formD.append('files', this.selectedFiles[i],this.selectedFiles[i].name);
      }
    }

    // this.vehicleService.uploadFile(formD).subscribe((data) => {
    //   this.msgObj["type"] = "success";
    //   this.msgObj["message"] = "successfully uploaded";
    //   this.dialogBox = true;

    // },
    // (err)=>{
    //   console.log(err);
    // });

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
    fd.append('typeoffile', "vehicle_images");
    fd.append("files", blob, this.imageFileUniqueId+"."+imgFileName);
    // console.log(imgFileName);

    // this.vehicleService.uploadFile(fd).subscribe((data) => {
    //   this.msgObj["type"] = "success";
    //   this.msgObj["message"] = "successfully uploaded";
    //   this.dialogBox = true;
    //   // alert("successfully uploaded");
    //   this.imgSrc = [];
    // },(err)=>{
    //   console.log(err);
    // });
  }
}
