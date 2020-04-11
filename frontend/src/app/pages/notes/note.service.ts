import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class NoteService {

  constructor(private http: HttpClient) {}

  public baseUrl = environment.baseUrl;

  addNote(data){
    return this.http.post(this.baseUrl+"/notes/add",data);
  }


  loadNotes(page){
    return this.http.get(this.baseUrl+"/notes?page="+page);
  }

  loadFuelEntry(fuelEntryId){
    return this.http.get(this.baseUrl+"/fuel/getFuel/"+fuelEntryId);
  }


  deleteNote(data) {
    return this.http.post(this.baseUrl+"/notes/deleteNote", data);
  }

  updateFuelEntry(data){
    return this.http.post(this.baseUrl+"/fuel/updateFuelEntry",data);
  }


}
