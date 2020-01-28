import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// const TOTAL_PAGES = 7;

// export class NewsPost {
//   title: string;
//   link: string;
//   creator: string;
//   text: string;
// }

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) {}

  public baseUrl = environment.baseUrl;

  loadVehicles(page){
    return this.http.get(this.baseUrl+"/vehicles?page="+page);
  }

  loadVehiclesTypes(){
    return this.http.get(this.baseUrl+"/vehicles/types");
  }

  loadVehicleDetails(){
    return this.http.get(this.baseUrl+"/vehicles/details");

  }

  loadVehicleRegistrations(){
    return this.http.get(this.baseUrl+"/vehicles/regnos");
  }

  loadFiltereddata(querystring:String, page){
    return this.http.get(this.baseUrl+"/vehicles/filtervehicle?"+querystring, page);
  }

  loadModelsData(){
    return this.http.get(this.baseUrl+"/vehicles/models");
  }

  loadBrandsData(){
    return this.http.get(this.baseUrl+"/vehicles/brands");
  }

  loadColorsData(){
    return this.http.get(this.baseUrl+"/vehicles/colors");
  }
  
  loadFuelTypeData(){
    return this.http.get(this.baseUrl+"/vehicles/fueltype");
  }

  loadFuelMesaurementData(){
    return this.http.get(this.baseUrl+"/vehicles/fuelMeasurement");
  }

  loadAgentData(){
    return this.http.get(this.baseUrl+"/vehicles/agents");
  }

  loadOwnerShipData(){
    return this.http.get(this.baseUrl+"/vehicles/ownerships");
  }

  uploadFile(formdata){
    return this.http.post(this.baseUrl+"/vehicles/fileupload", formdata);
  }

  addVehicle(data){
    return this.http.post(this.baseUrl+"/vehicles/add",data);
  }

  loadVehicleStatus(){
    return this.http.get(this.baseUrl+"/vehicles/vehicleStatus");
  }
  loadWorkLocation(){
    return this.http.get(this.baseUrl+"/vehicles/workLocations");
  }

  deleteVehicle(data) {
    return this.http.post(this.baseUrl+"/vehicles/deleteVehicle", data);
  }

  loadVehicle(vehicleId){
    return this.http.get(this.baseUrl+"/vehicles/getvehicle/"+vehicleId);
  }

  updateVehicle(data){
    return this.http.post(this.baseUrl+"/vehicles/updateVehicle",data);
  }
}
