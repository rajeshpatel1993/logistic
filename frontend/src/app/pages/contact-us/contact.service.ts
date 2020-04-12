import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  public baseUrl = environment.baseUrl;

  loadContact(page){
    return this.http.get(this.baseUrl+"/notes?page="+page);
  }

  updateFuelEntry(data){
    return this.http.post(this.baseUrl+"/fuel/updateFuelEntry",data);
  }

}
