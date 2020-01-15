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
export class VehicleService {

  constructor(private http: HttpClient) {}

  public baseUrl = environment.baseUrl;

  loadVehicles(page){
    return this.http.get(this.baseUrl+"/vehicles?page="+page);
  }

  // load(page: number, pageSize: number): Observable<any[]> {
  //   // const startIndex = ((page - 1) % TOTAL_PAGES) * pageSize;

  //   return this.http
  //     .get('assets/data/news.json')
  //     .pipe(
  //       map(news => news.splice(startIndex, pageSize)),
  //       delay(1500),
  //     );
  // }
}
