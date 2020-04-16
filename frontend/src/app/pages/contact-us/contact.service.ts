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
    return this.http.get(this.baseUrl+"/employees/emp_list?page="+page);
  }


  // getEmployeeList(){
  //   return this.http.get(this.baseUrl+"/employees/emp_list");
  // }




}
