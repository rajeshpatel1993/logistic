import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicles.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

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

  // public documentSpecification: FormArray;
  constructor(private vehicleService: VehicleService, private fb: FormBuilder) { }
  public vehicleCode: String;
  public vehicleTypes = [];

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


  public loadVehiclesTypes(){
    this.vehicleService.loadVehiclesTypes().subscribe((vehicleType:any) => {
      let vehicleTypeData = vehicleType.data;
      vehicleTypeData.forEach((item,index) => {
        let tmpObj = {};
        tmpObj["id"] = item.vehicleTypeId;
        tmpObj["name"] = item.vehicleType;
        tmpObj["code"] = item.vehicleTypeCode;
        this.vehicleTypes.push(tmpObj);
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
      vehicleType: [''],
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

    group["ownership_status"] = [''];
    group["note"] = [''];
    group["status"] = [1];
    this.vehicleForm = this.fb.group(group);
  }

  get f() { return this.vehicleForm.controls; }

  // get t() { return this.f.documentSpecification as FormArray; }



  addVehicle(){
    console.log(this.vehicleForm.value);
  }


  selectEvent(item) {
  
    this.vehicleCode = item.code+" 001";
    this.vehicleForm.patchValue({
      vehicleType: item
    });
    this.vehicleForm.patchValue({
      vehicleCode: this.vehicleCode
    });


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


 



}
