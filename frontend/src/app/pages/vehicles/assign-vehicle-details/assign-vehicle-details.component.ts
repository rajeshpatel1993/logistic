import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-assign-vehicle-details',
  templateUrl: './assign-vehicle-details.component.html',
  styleUrls: ['./assign-vehicle-details.component.scss']
})
export class AssignVehicleDetailsComponent implements OnInit {

  public vehicleId : string;
  public vehicleData:any[] = [];
  public vehicleTypesData = [];
  public vehicleType:String;
  public vehicleName:String;
  public vehicleRegNo:String;
  public vehicleCode: String;
  public vehicleImage: String;
  public barCode: String;
  public vehicleDetail:String;

  keyword = 'name';
  data = [
     {
       id: 1,
       name: 'Usa'
     },
     {
       id: 2,
       name: 'England'
     }
  ];

  constructor(private vehicleService: VehicleService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.vehicleId = this.activeRoute.snapshot.params.id;
    this.loadVehicle();
  }

  
  loadVehicle(){
    this.vehicleService.loadAssignedVehiclesById(this.vehicleId).subscribe((d) => {
      this.vehicleData = d['data'][0];
      this.vehicleType = this.vehicleData["vehicleTypes"][0].vehicleType;
      this.vehicleName = this.vehicleData["name"];
      this.vehicleRegNo = this.vehicleData["regNo"];
      this.vehicleCode = this.vehicleData["vehicle_code"];
      this.vehicleImage = this.vehicleData["vehicleImage"];
      this.barCode = this.vehicleData["qrCode"];
      this.vehicleDetail = this.vehicleData["vehicleDetailsArray"][0].vehicleDetails;


      // this.selectedVehicleType = this.vehicleData['vehicle_code'];
      // this.selectedVehicleT = this.vehicleData['vehicle_type'];
      // this.vehDetail = this.vehicleData['vehicleDetailsArray'][0].vehicleDetails;
      // this.vehName = this.vehicleData['name'];
      // this.regName = this.vehicleData['regNo'];
      // this.vehicleModel = this.vehicleData['vehicleModels'][0].model;
      // this.vehicleBrand = this.vehicleData['vehicleBrands'][0].brand;
      // this.vehicleColor = this.vehicleData['color'];
      // this.manufactureYear = this.vehicleData['yearofManufacturer'];
      // this.engineNo = this.vehicleData['engineNo'];
      // this.chasisNo = this.vehicleData['chassisNo'];
      // this.purchaseDate = new Date(this.vehicleData['purchase_date']);
      // this.warrantyPeriod = new Date(this.vehicleData['warrantyPeriod']);
      // this.fuelType = this.vehicleData['fuelTypes'][0].fuelTypeName;
      // this.fuelMeasureMent = this.vehicleData['fuelMesaureMents'][0].fuelMeausrement;
      // this.workLocation = this.vehicleData['workLocations'][0].workLocation;
      // this.insurancePolicy = this.vehicleData['insuranceNo'];
      // this.insuranceAmount = this.vehicleData['insuranceAmt'];
      // this.policyExpiry = new Date(this.vehicleData['insuranceValid']);
      // this.insuranceAgent = this.vehicleData['insuranceAgents'][0].insuranceCompanyName;
      // this.roadTaxNo = this.vehicleData['roadTaxNo'];
      // this.roadTaxAmount = this.vehicleData['roadTaxAmt'];
      // this.roadTaxExpiry = new Date(this.vehicleData['roadTaxValid']);
      // this.ownershipStatus = this.vehicleData['vehicleOwnerships'][0].vehicleOwnership;
      // this.status = +this.vehicleData['vehicleStatusId'];
      // this.note = this.vehicleData['note'];
      // this.uniqueFileId = this.vehicleData['bill_file_unique_id'];
      // this.uniqueImageId = this.vehicleData['image_file_unique_id'];









      // this.vehicleForm.get("vehicleCode").patchValue(this.selectedVehicleType);
      // this.vehicleForm.get("vehicleTypef").patchValue(this.selectedVehicleT);

      // this.vehicleForm.get("vehicledetails").patchValue(this.vehDetail);
      // this.vehicleForm.get("vehicleName").patchValue(this.vehName);
      // this.vehicleForm.get("regNo").patchValue(this.regName);
      // this.vehicleForm.get("model").patchValue(this.vehicleModel);
      // this.vehicleForm.get("brand").patchValue(this.vehicleBrand);
      // this.vehicleForm.get("color").patchValue(this.vehicleColor);
      // this.vehicleForm.get("manufacture_year").patchValue(this.manufactureYear);
      // this.vehicleForm.get("engine_no").patchValue(this.engineNo);
      // this.vehicleForm.get("chasis_no").patchValue(this.chasisNo);
      // this.vehicleForm.get("purchase_date").patchValue(this.purchaseDate);
      // this.vehicleForm.get("warranty_period").patchValue(this.warrantyPeriod);
      // this.vehicleForm.get("fuel_type").patchValue(this.fuelType);
      // this.vehicleForm.get("fuelMeausrement").patchValue(this.fuelMeasureMent);
      // this.vehicleForm.get("workLocation").patchValue(this.workLocation);
      // this.vehicleForm.get("insurance_policy_no").patchValue(this.insurancePolicy);
      // this.vehicleForm.get("insurance_amount").patchValue(this.insuranceAmount);
      // this.vehicleForm.get("policy_expiry").patchValue(this.policyExpiry);
      // this.vehicleForm.get("insurance_agent").patchValue(this.insuranceAgent);
      // this.vehicleForm.get("road_tax_no").patchValue(this.roadTaxNo);
      // this.vehicleForm.get("road_tax_amount").patchValue(this.roadTaxAmount);
      // this.vehicleForm.get("road_tax_expiry").patchValue(this.roadTaxExpiry);
      // this.vehicleForm.get("ownership_status").patchValue(this.ownershipStatus);
      // this.vehicleForm.get("vehicleStatus").patchValue(this.status);
      //  this.vehicleForm.get("note").patchValue(this.note);

      //  this.vehicleForm.get("image_file_unique_id").patchValue(this.uniqueImageId);
      //  this.vehicleForm.get("bill_file_unique_id").patchValue(this.uniqueFileId);





      // console.log(d);
    }, (error) => {
  
    });
  }


  selectEvent(item) {
  }
 
  onChangeSearch(val: string) {
  }
  
  onFocused(e){
  }

}
