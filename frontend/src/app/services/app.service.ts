import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { APPURLS } from '../constants/appUrls';
import { IDemographicsModel, IOrganization } from '../interfaces/demographics.interface';
import { ILoggedInUserData } from '../interfaces/employee.interface';

@Injectable()
export class AppService {
    loggedInUser: ILoggedInUserData;
    demographicsData: IDemographicsModel;
    organizationDetails: IOrganization;

    constructor(private http: HttpClient) {}

    login(userObject) {
        const headers = new HttpHeaders();
        headers.set('content-type', 'application/json');
        const requestUrl = `${APPURLS.APIURL}/login/checkUser`;
        return this.http.post(requestUrl, { ...userObject}, { headers }).toPromise();
    }

    getDemographicsData(userId: string) {
        const params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/demographics/data`;
        return this.http.get(requestUrl, { params }).toPromise();
        /* .subscribe((data: any) => {
            this.demographicsData = data.data;
        }); */
    }

    setLoggedInUser(data: ILoggedInUserData) {
        this.loggedInUser = data;
    }

    setDemographicsData(data: IDemographicsModel) {
        this.demographicsData = data;
    }

    setOrganizationDetails(data: IOrganization){
        this.organizationDetails = data;
    }

    getUserDetails(userId: string) {
        const params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/login/getuser`;
        return this.http.get(requestUrl, { params }).toPromise();
    }

    getOrganizationDetails(userId: string) {
        const params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/organization/getOrganization`;
        return this.http.get(requestUrl, { params }).toPromise();
    }
}
