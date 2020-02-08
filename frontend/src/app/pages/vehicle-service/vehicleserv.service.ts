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
export class VehicleservService {

  constructor(private http: HttpClient) {}

  public baseUrl = environment.baseUrl;

  loadVehiclesByTypeId(id){
    return this.http.get(this.baseUrl+"/vehicles/vech-details/"+id);
  }

  loadServiceType(){
    return this.http.get(this.baseUrl+"/service/types");
  }

  addService(data){
    return this.http.post(this.baseUrl+"/service/add", data);
  }

  loadVehicleServices(page){
    return this.http.get(this.baseUrl+"/service/vehicle_services?page="+page);
  }
}
