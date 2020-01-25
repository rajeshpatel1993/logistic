import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicles.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as uuid from 'uuid';
@Component({
  selector: 'ngx-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  keyword = 'name';
  public vehicleForm: FormGroup;
  public vehicleDetailsData = [];
  public modelsList:any = [];
  public brandsList:any = [];
  public colorsList:any = [];
  public agentsList: any = [];
  public ownershipList:any=[];
  public fuelTypeList:any = [];
  public fuelMeasurementList:any = [];
  public showExtraField:boolean = true;
  public selectedFiles: any[] = [];

  // public documentSpecification: FormArray;
  constructor(private vehicleService: VehicleService, private fb: FormBuilder) { }
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
  
  public statuses = [{"id":1,"name":"Active"},{"id":2, "name":"Inactive"}, {"id":3, "name":"Sold"}];


  ngOnInit() {
    
    this.loadVehiclesTypes();
    this.createForm(this.showExtraField);
    this.loadVehicleDetails();
    this.loadModelsData();
    this.loadBrandsData();
    this.loadColorsData();
    this.loadFuelTypeData();
    this.loadFuelMesaurementData();
    this.loadAgentsData();
    this.loadOwnershipdata();

  }


  onSelect($event: any) {
    this.imageFileUniqueId = uuid.v4();
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
    var fd = new FormData();
    fd.append('fileId', this.imageFileUniqueId);
    fd.append('typeoffile', "vehicle_images");
    fd.append("files selected", blob);

    this.vehicleService.uploadFile(fd).subscribe((data) => {
      alert("successfully uploaded");
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


  public loadVehicleDetails(){
    this.vehicleService.loadVehicleDetails().subscribe((vehicleDetails:any) => {
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


  public loadModelsData(){
    this.vehicleService.loadModelsData().subscribe((modelData:any) => {
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

  public loadBrandsData(){
    this.vehicleService.loadBrandsData().subscribe((brandData:any) => {
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

  public loadFuelTypeData(){
    this.vehicleService.loadFuelTypeData().subscribe((fuelTypeData:any) => {
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
      vehicledetails: [''],
      vehicleCode: [this.vehicleCode],
      vehicleName: [''],
      regNo: [''],
      model: [''],
      brand: [''],
      color: [''],
      manufacture_year: [''],
      engine_no: [''],
      chasis_no: [''],
      purchase_date: [''],
      warranty_period:[''],
      fuel_type:  [''],
      fuelMeausrement: ['']
    };
    if(showExtraField){
      group["insurance_policy_no"] = [''];
      group["insurance_amount"] = [''];
      group["policy_expiry"] = [''];
      group["insurance_agent"] = [''];
      group["road_tax_no"] = [''];
      group["road_tax_amount"] = [''];
      group["road_tax_expiry"] = [''];


    }


    group['bill_file_unique_id'] = [this.billfileuniqueid];
    group['image_file_unique_id'] = [this.imageFileUniqueId];

    group["ownership_status"] = [''];
    group["note"] = [''];
    group["status"] = [1];
    this.vehicleForm = this.fb.group(group);
  }

  get f() { return this.vehicleForm.controls; }

  // get t() { return this.f.documentSpecification as FormArray; }



  addVehicle(){

    this.vehicleService.addVehicle(this.vehicleForm.value).subscribe((data)=>{
      console.log(data);
      alert("Saved successfully");
    },(error)=>{});
    // console.log(this.vehicleForm.value);
  }

public selectedVehicleType;
  selectEventD(item) {
    // console.log(item);
    this.vehicleCode = item.code+" 001";
    this.selectedVehicleType = item;
    // this.vehicleForm.patchValue({
    //   vehicleTypef: item
    // });
    // this.vehicleForm.patchValue({
    //   vehicleCode: this.vehicleCode
    // });


    if(item.id == 1 || item.id ==2){
      this.showExtraField = true;
    }else{
      this.showExtraField = false;
    }

    this.createForm(this.showExtraField);
    


    // console.log(this.vehicleCode);
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
        formD.append('files selected', this.selectedFiles[i],this.selectedFiles[i].name);
      }
    }

    this.vehicleService.uploadFile(formD).subscribe((data) => {
      alert("successfully uploaded");
    },(err)=>{
      console.log(err);
    });

  }



}
