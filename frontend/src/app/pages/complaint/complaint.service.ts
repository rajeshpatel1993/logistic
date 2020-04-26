import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) {}

  public baseUrl = environment.baseUrl;

  addComplain(data){
    return this.http.post(this.baseUrl+"/issues/add",data);
  }


  loadComplains(page){
    return this.http.get(this.baseUrl+"/issues?page="+page);
  }

  loadIssue(issueId){
    return this.http.get(this.baseUrl+"/issues/getIssue/"+issueId);
  }


  deleteComplaint(data) {
    return this.http.post(this.baseUrl+"/issues/deleteIssues", data);
  }

  updateComplain(data){
    return this.http.post(this.baseUrl+"/issues/updateIssue",data);
  }

  loadPriorityStatus(){
    return this.http.get(this.baseUrl+"/issues/getPriorityStatus");
  }

}
