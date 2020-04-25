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

  loadNote(noteId){
    return this.http.get(this.baseUrl+"/notes/getNote/"+noteId);
  }


  deleteComplaint(data) {
    return this.http.post(this.baseUrl+"/issues/deleteIssues", data);
  }

  updateNote(data){
    return this.http.post(this.baseUrl+"/notes/updateNote",data);
  }

  loadPriorityStatus(){
    return this.http.get(this.baseUrl+"/issues/getPriorityStatus");
  }

}
