import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicles.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs/Rx';

import * as uuid from 'uuid';
@Component({
  selector: 'ngx-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  keyword = 'name';
  submitted = false;
  public vehicleForm: FormGroup;
  public vehicleDetailsData = [];
  public modelsList:any = [];
  public brandsList:any = [];
  public vehicleStatusList: any = [];
  public colorsList:any = [];
  public agentsList: any = [];
  public ownershipList:any=[];
  public fuelTypeList:any = [];
  public showallfields = false;
  public lastVehicleCodeSubscription: Subscription;
  public fuelMeasurementList:any = [];
  public showExtraField:boolean = true;
  public selectedFiles: any[] = [];
  public workLocationsList: any[] = [];
  public dialogBox : boolean = false;
  public msgObj ={};
  public lastVehcileCodeN;
  // public documentSpecification: FormArray;
  constructor(private vehicleService: VehicleService, private fb: FormBuilder, private router: Router) { }
  public vehicleCode: String;
  public vehicleTypes = [];
  public billfileuniqueid = uuid.v4();
  public imageFileUniqueId = uuid.v4();

  imgSrc: any = [];

  options = `{
    fileSize: 2048, // in Bytes (by default 2048 Bytes = 2 MB)
    minWidth: 0, // minimum width of image that can be uploaded (by default 0, signifies any width)
    maxWidth: 0,  // maximum width of image that can be uploaded (by default 0, signifies any width)
    minHeight: 0,  // minimum height of image that can be uploaded (by default 0, signifies any height)
    maxHeight: 0,  // maximum height of image that can be uploaded (by default 0, signifies any height)
    fileType: ['image/gif', 'image/jpeg', 'image/png'] // mime type of files accepted
    height: 400, // height of cropper
    quality: 0.8, // quaity of image after compression
    crop: [  // array of objects for mulitple image crop instances (by default null, signifies no cropping)
      {
        ratio: 1, // ratio in which image needed to be cropped (by default null, signifies ratio to be free of any restrictions)
        minWidth: 0, // minimum width of image to be exported (by default 0, signifies any width)
        maxWidth: 0,  // maximum width of image to be exported (by default 0, signifies any width)
        minHeight: 0,  // minimum height of image to be exported (by default 0, signifies any height)
        maxHeight: 0,  // maximum height of image to be exported (by default 0, signifies any height)
        width: 0,  // width of image to be exported (by default 0, signifies any width)
        height: 0,  // height of image to be exported (by default 0, signifies any height)
      }
    ]
  }`;
  

  public initialValue ;


  ngOnInit() {
    
    this.loadVehiclesTypes();
    this.createForm(this.showExtraField);
    // this.loadVehicleDetails();
    this.loadColorsData();
    this.loadFuelMesaurementData();
    this.loadAgentsData();
    this.loadOwnershipdata();
    this.loadVehicleStatus();
    this.loadWorkLocations();
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
  public vehicleTypesData = [];
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


  


  public loadVehicleDetails(id?){
    let velhicleType = this.selectedVehicleType.id;
    this.vehicleService.loadVehicleDetails(id).subscribe((vehicleDetails:any) => {
      let vehicleDetailData = vehicleDetails.data;
      vehicleDetailData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.vehicleDetailsId;
        tmpObj["name"] = item.vehicleDetails;
        this.vehicleDetailsData.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });

  }


  public loadModelsData(brandId){
    this.vehicleService.loadModelsData(brandId).subscribe((modelData:any) => {
      let modelsData = modelData.data;
      modelsData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.modelId;
        tmpObj["name"] = item.model;
        this.modelsList.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });

  }

  public loadBrandsData(vehicleTypeId){
    this.vehicleService.loadBrandsData(vehicleTypeId).subscribe((brandData:any) => {
      let brandsData = brandData.data;
      brandsData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.brandId;
        tmpObj["name"] = item.brand;
        this.brandsList.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });

  }

  public loadFuelTypeData(measureMentId){
    this.vehicleService.loadFuelTypeData(measureMentId).subscribe((fuelTypeData:any) => {
      let fuelTypesData = fuelTypeData.data;
      fuelTypesData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.fuelTypeId;
        tmpObj["name"] = item.fuelTypeName;
        this.fuelTypeList.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });

  }

  public loadFuelMesaurementData(){
    this.vehicleService.loadFuelMesaurementData().subscribe((fuelMesaurementData:any) => {
      let fuelMesaurementsData = fuelMesaurementData.data;
      fuelMesaurementsData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.fuelMeausrementId;
        tmpObj["name"] = item.fuelMeausrement;
        this.fuelMeasurementList.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });

  }



  public loadColorsData(){
    this.vehicleService.loadColorsData().subscribe((colorData:any) => {
      let colorsData = colorData.data;
      colorsData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.colorId;
        tmpObj["name"] = item.name;
        this.colorsList.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });

  }


  public loadAgentsData(){
    this.vehicleService.loadAgentData().subscribe((agentData:any) => {
      let agentsData = agentData.data;
      agentsData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.insuranceCompanyId;
        tmpObj["name"] = item.insuranceCompanyName;
        this.agentsList.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });

  }


  public loadOwnershipdata(){
    this.vehicleService.loadOwnerShipData().subscribe((ownershipData:any) => {
      let ownershipsData = ownershipData.data;
      ownershipsData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.vehicleOwnershipId;
        tmpObj["name"] = item.vehicleOwnership;
        this.ownershipList.push(tmpObj);
      });
      // console.log(vehicleTypeData);
    });

  }



  createForm(showExtraField) {
    let group = {
      vehicleTypef: [this.selectedVehicleType],
      vehicledetails: ['', Validators.required],
      vehicleCode: ['', Validators.required],
      vehicleName: ['',Validators.required],
      regNo: ['', Validators.required],
      model: ['', Validators.required],
      brand: ['', Validators.required],
      color: ['', Validators.required],
      manufacture_year: ['', Validators.required],
      engine_no: ['', Validators.required],
      chasis_no: ['', Validators.required],
      purchase_date: [''],
      warranty_period:[''],
      fuel_type:  ['', Validators.required],
      fuelMeausrement: ['', Validators.required],
      workLocation: ['', Validators.required]
    };
    if(showExtraField){
      group["insurance_policy_no"] = ['', Validators.required];
      group["insurance_amount"] = ['', Validators.required];
      group["policy_expiry"] = ['', Validators.required];
      group["insurance_agent"] = ['', Validators.required];
      group["road_tax_no"] = ['', Validators.required];
      group["road_tax_amount"] = ['', Validators.required];
      group["road_tax_expiry"] = ['', Validators.required];


    }


    group['bill_file_unique_id'] = [this.billfileuniqueid];
    group['image_file_unique_id'] = [this.imageFileUniqueId];

    group["ownership_status"] = ['', Validators.required];
    group["note"] = [''];
    group["vehicleStatus"] = [5];
    this.vehicleForm = this.fb.group(group);
  }

  get f() { return this.vehicleForm.controls; }

  // get t() { return this.f.documentSpecification as FormArray; }


  addVehicle(){
    this.submitted = true;
    if (this.vehicleForm.invalid) {
      alert("Please fill all required field");
      return;
    }
    
    this.vehicleService.addVehicle(this.vehicleForm.value).subscribe((data)=>{
      // console.log(data);
      // alert("Saved successfully");

      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Added";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/vehicles/list');
    }, 2000);



    },(error)=>{
      // console.log(error.error.errmsg);
      this.msgObj["type"] = "error";
      this.msgObj["message"] =error.error.errmsg;
      this.dialogBox = true;

    });
  }

  getMsg(val){
    this.dialogBox = false;
    console.log(val);
  }
  loadVehicleStatus(){
    this.vehicleService.loadVehicleStatus().subscribe((vehicleStatus)=>{
      let vehicleStatusData = vehicleStatus["data"];
      vehicleStatusData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = +item.vehicleStatusId;
        tmpObj["name"] = item.vehicleStatus;
        this.vehicleStatusList.push(tmpObj);
       

      });


      // console.log(this.vehicleStatusList);


    },
    (error) => {
      
    });
  }


  loadWorkLocations(){
    this.vehicleService.loadWorkLocation().subscribe((workLocations)=>{
      let workLocationsData = workLocations["data"];
      workLocationsData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = +item.workLocationId;
        tmpObj["name"] = item.workLocation;
        this.workLocationsList.push(tmpObj);
       

      });


    },
    (error) => {
      
    });
  }

public formatNumber(num){
  let tmpNum;
  if(num < 10){
    tmpNum = `00${num}`;
  }else{
    tmpNum = `0${num}`;
  }

  return tmpNum;
}
public selectedVehicleType;
  selectEventD(item) {
    this.loadLastVehicleCode(item.id, item.code);
    this.showallfields = true;
    this.vehicleDetailsData = [];

    this.selectedVehicleType = item;
    this.loadBrandsData(item.id);
    this.loadVehicleDetails(item.id);


    if(item.id == 1 || item.id ==2){
      this.showExtraField = true;
    }else{
      this.showExtraField = false;
    }

    this.createForm(this.showExtraField);
    


    // console.log(this.vehicleCode);
  }

  selectBrand(brand){
    let brandId = brand.id;
    this.modelsList = [];
    this.loadModelsData(brandId);
  }

  selectMeasurement(fuelMeasurementId){
    let measureMentId = fuelMeasurementId.id;
    this.fuelTypeList = [];
    this.loadFuelTypeData(measureMentId);
    // this.loadFuelTypeData(measureMentId);
  }

  onFocused(e) {
    // do something
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  // when files are selected, save them in array selectedFiles
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

    this.vehicleService.uploadFile(formD).subscribe((data) => {
      // alert("successfully uploaded");

      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully uploaded";
      this.dialogBox = true;

    },(err)=>{
      console.log(err);
    });

  }


  loadLastVehicleCode(vehicleTypeId, vehCode){
 
    this.lastVehicleCodeSubscription = this.vehicleService.lastVehicleCode(vehicleTypeId).subscribe((d)=>{
      let fnnumber;
      if(d["data"].length > 0){
        let dat = d["data"][0].vehicle_code;
        let fn = dat.split(" ")[1];
        fnnumber = +fn + 1;

      }else{
        fnnumber = 1;
      }

      this.lastVehcileCodeN = fnnumber;

      let num = this.formatNumber(this.lastVehcileCodeN);
      this.vehicleCode = vehCode+" "+num;
      console.log(this.vehicleCode)

      this.vehicleForm.patchValue({"vehicleCode":this.vehicleCode});
      // console.log(this.vehicleCode);
      // console.log(fnnumber);
    },
    (error)=>{

    });
  }



}
