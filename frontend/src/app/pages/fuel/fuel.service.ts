import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class FuelService {


  constructor(private http: HttpClient) {}

  public baseUrl = environment.baseUrl;

  loadPaymentModes(){
    return this.http.get(this.baseUrl+"/fuel/paymentmodes");
  }

  addFuel(data){
    return this.http.post(this.baseUrl+"/fuel/add",data);
  }

  loadFuelEntries(page){
    return this.http.get(this.baseUrl+"/fuel?page="+page);
  }

  deleteFuelEntry(data) {
    return this.http.post(this.baseUrl+"/fuel/deleteFuelEntry", data);
  }

}
