import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicles.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as uuid from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'ngx-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {
  keyword = 'name';
  public vehicleForm: FormGroup;
  public vehicleDetailsData = [];
  public modelsList:any = [];
  public brandsList:any = [];
  public vehicleStatusList: any = [];
  public colorsList:any = [];
  public agentsList: any = [];
  public ownershipList:any=[];
  public fuelTypeList:any = [];
  public vehicle:any = [];
  public fuelMeasurementList:any = [];
  public showExtraField:boolean = true;
  public selectedFiles: any[] = [];
  public workLocationsList: any[] = [];
  public vehicleData:any[] = [];
  public msgObj ={};
  public dialogBox : boolean = false;

  // public documentSpecification: FormArray;
  constructor(private vehicleService: VehicleService, private fb: FormBuilder, private activeRoute: ActivatedRoute, private router: Router) { }
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
  public vehicleId : string;

  ngOnInit() {
    this.vehicleId = this.activeRoute.snapshot.params.id;
    this.loadVehiclesTypes();
    this.createForm(this.showExtraField);
    this.loadColorsData();
    this.loadFuelMesaurementData();
    this.loadAgentsData();
    this.loadOwnershipdata();
    this.loadVehicleStatus();
    this.loadWorkLocations();
    this.loadVehicle();



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


selectVehicle(){
  
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
      alert("successfully uploaded");
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



  selectMeasurement(fuelMeasurementId){
    let measureMentId = fuelMeasurementId.id;
    this.fuelTypeList = [];
    this.loadFuelTypeData(measureMentId);
    // this.loadFuelTypeData(measureMentId);
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


 public selectedVehicleT ;
 public selectedVehicleType;
 public vehDetail;
 public vehName;
 public regName;
 public vehicleModel;
 public vehicleBrand;
 public vehicleColor;
 public manufactureYear;
 public engineNo;
 public chasisNo;
 public purchaseDate;
 public warrantyPeriod;
 public fuelType;
 public fuelMeasureMent;
 public workLocation;
 public insurancePolicy;
 public insuranceAmount;
 public policyExpiry;
 public insuranceAgent;
 public roadTaxNo;
 public roadTaxAmount;
 public roadTaxExpiry;
 public ownershipStatus;
 public note;
 public status;
 public attachDocument;
 public image;
 public uniqueFileId;
 public uniqueImageId;
 public currentVehcileType;


  loadVehicle(){
    this.vehicleService.loadVehicle(this.vehicleId).subscribe((d) => {
      this.vehicleData = d['data'][0];
      this.selectedVehicleType = this.vehicleData['vehicle_code'];
      this.selectedVehicleT = this.vehicleData['vehicle_type'];
      this.vehDetail = this.vehicleData['vehicleDetailsArray'][0].vehicleDetails;
      this.vehName = this.vehicleData['name'];
      this.regName = this.vehicleData['regNo'];
      this.vehicleModel = this.vehicleData['vehicleModels'][0].model;
      this.vehicleBrand = this.vehicleData['vehicleBrands'][0].brand;
      this.vehicleColor = this.vehicleData['color'];
      this.manufactureYear = this.vehicleData['yearofManufacturer'];
      this.engineNo = this.vehicleData['engineNo'];
      this.chasisNo = this.vehicleData['chassisNo'];
      this.purchaseDate = new Date(this.vehicleData['purchase_date']);
      this.warrantyPeriod = new Date(this.vehicleData['warrantyPeriod']);
      this.fuelType = this.vehicleData['fuelTypes'][0].fuelTypeName;
      this.fuelMeasureMent = this.vehicleData['fuelMesaureMents'][0].fuelMeausrement;
      this.workLocation = this.vehicleData['workLocations'][0].workLocation;
      this.insurancePolicy = this.vehicleData['insuranceNo'];
      this.insuranceAmount = this.vehicleData['insuranceAmt'];
      this.policyExpiry = new Date(this.vehicleData['insuranceValid']);
      this.insuranceAgent = this.vehicleData['insuranceAgents'][0].insuranceCompanyName;
      this.roadTaxNo = this.vehicleData['roadTaxNo'];
      this.roadTaxAmount = this.vehicleData['roadTaxAmt'];
      this.roadTaxExpiry = new Date(this.vehicleData['roadTaxValid']);
      this.ownershipStatus = this.vehicleData['vehicleOwnerships'][0].vehicleOwnership;
      this.status = +this.vehicleData['vehicleStatusId'];
      this.note = this.vehicleData['note'];
      this.uniqueFileId = this.vehicleData['bill_file_unique_id'];
      this.uniqueImageId = this.vehicleData['image_file_unique_id'];
      this.currentVehcileType = this.vehicleData['vehicleTypes'][0].vehicleType;








      this.vehicleForm.get("vehicleCode").patchValue(this.selectedVehicleType);
      this.vehicleForm.get("vehicleTypef").patchValue(this.selectedVehicleT);

      this.vehicleForm.get("vehicledetails").patchValue(this.vehDetail);
      this.vehicleForm.get("vehicleName").patchValue(this.vehName);
      this.vehicleForm.get("regNo").patchValue(this.regName);
      this.vehicleForm.get("model").patchValue(this.vehicleModel);
      this.vehicleForm.get("brand").patchValue(this.vehicleBrand);
      this.vehicleForm.get("color").patchValue(this.vehicleColor);
      this.vehicleForm.get("manufacture_year").patchValue(this.manufactureYear);
      this.vehicleForm.get("engine_no").patchValue(this.engineNo);
      this.vehicleForm.get("chasis_no").patchValue(this.chasisNo);
      this.vehicleForm.get("purchase_date").patchValue(this.purchaseDate);
      this.vehicleForm.get("warranty_period").patchValue(this.warrantyPeriod);
      this.vehicleForm.get("fuel_type").patchValue(this.fuelType);
      this.vehicleForm.get("fuelMeausrement").patchValue(this.fuelMeasureMent);
      this.vehicleForm.get("workLocation").patchValue(this.workLocation);
      this.vehicleForm.get("insurance_policy_no").patchValue(this.insurancePolicy);
      this.vehicleForm.get("insurance_amount").patchValue(this.insuranceAmount);
      this.vehicleForm.get("policy_expiry").patchValue(this.policyExpiry);
      this.vehicleForm.get("insurance_agent").patchValue(this.insuranceAgent);
      this.vehicleForm.get("road_tax_no").patchValue(this.roadTaxNo);
      this.vehicleForm.get("road_tax_amount").patchValue(this.roadTaxAmount);
      this.vehicleForm.get("road_tax_expiry").patchValue(this.roadTaxExpiry);
      this.vehicleForm.get("ownership_status").patchValue(this.ownershipStatus);
      this.vehicleForm.get("vehicleStatus").patchValue(this.status);
       this.vehicleForm.get("note").patchValue(this.note);

       this.vehicleForm.get("image_file_unique_id").patchValue(this.uniqueImageId);
       this.vehicleForm.get("bill_file_unique_id").patchValue(this.uniqueFileId);

      this.vehicleForm.get("vehType").patchValue(this.currentVehcileType);

      //  this.loadBrandsData(this.vehicleData['vehicle_type']);


      console.log(d);
    }, (error) => {
  
    });
  }


  createForm(showExtraField) {
    let group = {
      // vehicleT:[],
      vehType: [],
      vehicleId: [this.vehicleId],
      vehicleTypef: [],
      vehicledetails: [],
      vehicleCode: [this.selectedVehicleType],
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
      fuelMeausrement: [''],
      workLocation: ['']
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


    group['bill_file_unique_id'] = [];
    group['image_file_unique_id'] = [];

    group["ownership_status"] = [''];
    group["note"] = [''];
    group["vehicleStatus"] = [];
    this.vehicleForm = this.fb.group(group);
  }

  get f() { return this.vehicleForm.controls; }

  // get t() { return this.f.documentSpecification as FormArray; }



  updateVehicle(){


   this.vehicleService.updateVehicle(this.vehicleForm.value).subscribe((data)=>{
      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Updated";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/vehicles/list');
    }, 2000);
    
    },(error)=>{

      this.msgObj["type"] = "error";
      this.msgObj["message"] =error.error.errmsg;
      this.dialogBox = true;
    });
    // console.log(this.vehicleForm.value);
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


  selectEventD(item) {
    // console.log(item);
    this.vehicleCode = item.code+" 001";
    this.selectedVehicleType = item;
    this.selectedVehicleType = this.vehicleCode;

    this.vehicleForm.get("vehicleCode").patchValue(this.selectedVehicleType);
    this.vehicleForm.get("vehicleTypef").patchValue(item);

    this.loadVehicleDetails(item.id);
    this.loadBrandsData(item.id);


    if(item.id == 1 || item.id ==2){
      this.showExtraField = true;
    }else{
      this.showExtraField = false;
    }

    // this.createForm(this.showExtraField);
    


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
   let formD = new FormData();
   formD.append('fileId', this.billfileuniqueid);
   formD.append('typeoffile', "bills");
    if(this.selectedFiles.length){
      for(let i=0 ; i < this.selectedFiles.length ; i++){
        formD.append('files', this.selectedFiles[i],this.selectedFiles[i].name);
      }
    }

    this.vehicleService.uploadFile(formD).subscribe((data) => {
      alert("successfully uploaded");
    },(err)=>{
      console.log(err);
    });

  }


  selectBrand(brand){
    let brandId = brand.id;
    this.modelsList = [];
    this.loadModelsData(brandId);
  }



}
