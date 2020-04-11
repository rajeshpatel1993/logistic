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
export class RemainderService {

  constructor(private http: HttpClient) {}

  public baseUrl = environment.baseUrl;

  loadRemainderTypes(){
    return this.http.get(this.baseUrl+"/remainder/types");
  }
  
  addRemainder(data){
    return this.http.post(this.baseUrl+"/remainder/add",data);
  }


  loadRemainders(page){
    return this.http.get(this.baseUrl+"/remainder?page="+page);

  }

  deleteRemainder(data) {
    return this.http.post(this.baseUrl+"/remainder/deleteRemainder", data);
  }

  loadRemainder(remainderId){
    return this.http.get(this.baseUrl+"/remainder/getRemainder/"+remainderId);
  }


  updateRemainder(data){
    return this.http.post(this.baseUrl+"/remainder/updateRemainder",data);
  }

  
}
