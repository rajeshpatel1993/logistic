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
export class ReportsService {

  constructor(private http: HttpClient) {}

  public baseUrl = environment.baseUrl;

  loadVehicles(){
    return this.http.get(this.baseUrl+"/reports/getReports");
  }

  loadAssignVehicles(){
    return this.http.get(this.baseUrl+"/reports/assign_vehicles");
  }

  loadVehiclesTypes(){
    return this.http.get(this.baseUrl+"/vehicles/types");
  }

  loadVehicleDetails(vehicleId?){
    return this.http.get(this.baseUrl+"/vehicles/details/"+vehicleId);

  }

  loadVehicleRegistrations(){
    return this.http.get(this.baseUrl+"/vehicles/regnos");
  }

  loadFiltereddata(querystring:String, page){
    return this.http.get(this.baseUrl+"/vehicles/filtervehicle?"+querystring, page);
  }

  loadModelsData(brandId?){
    return this.http.get(this.baseUrl+"/vehicles/models/"+brandId);
  }

  loadBrandsData(){
    return this.http.get(this.baseUrl+"/vehicles/brands");
  }

  loadColorsData(){
    return this.http.get(this.baseUrl+"/vehicles/colors");
  }
  
  loadFuelTypeData(measureMentId?){
    return this.http.get(this.baseUrl+"/vehicles/fueltype/"+measureMentId);
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

  addAssignVehicle(data){
    return this.http.post(this.baseUrl+"/vehicles/add-assign",data);
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

  loadAssignedVehiclesById(vehicleId){
    return this.http.get(this.baseUrl+"/vehicles/getAssignVehicle/"+vehicleId);
  }

  loadEmployee(){
    return this.http.get(this.baseUrl+"/employees");
  }

  loadProjectType(){
    return this.http.get(this.baseUrl+"/project/projecttypes");
  }

  loadProjects(projectTypeId){
    return this.http.get(this.baseUrl+"/project/"+projectTypeId);
  }


  downloadFile(data, filename='data', columns) {
      let csvData = this.ConvertToCSV(data, columns);
      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", filename + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headerList) {
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      let row = 'S.No,';

      for (let index in headerList) {
          row += headerList[index] + ',';
      }
      row = row.slice(0, -1);
      str += row + '\r\n';
      for (let i = 0; i < array.length; i++) {
          let line = (i+1)+'';
          for (let index in headerList) {
              let head = headerList[index];

              line += ',' + array[i][head];
          }
          str += line + '\r\n';
      }
      return str;
  }
  
}
