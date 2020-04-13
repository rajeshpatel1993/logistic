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

  loadNote(noteId){
    return this.http.get(this.baseUrl+"/notes/getNote/"+noteId);
  }


  deleteNote(data) {
    return this.http.post(this.baseUrl+"/notes/deleteNote", data);
  }

  updateNote(data){
    return this.http.post(this.baseUrl+"/notes/updateNote",data);
  }


}
