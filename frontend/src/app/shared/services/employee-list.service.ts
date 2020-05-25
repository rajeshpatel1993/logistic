import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { APPURLS } from '../../constants/appUrls';
import { AppService } from '../../services/app.service';
import { IEmployee, IFormattedEmployee } from '../../interfaces/employee.interface';
import { IDemographicsModel } from '../../interfaces/demographics.interface';

@Injectable()
export class EmployeeListService {

    constructor(private http: HttpClient, private appService: AppService) {}

    getEmployeesList(userId: string) {
        const params = new HttpParams().set('userId', userId);
       // const requestUrl = `${APPURLS.APIURL}/employee/getAllEmployees`;

       const requestUrl = "https://employee-app-backend.herokuapp.com/employee/getAllEmployees?userId=1&organizationId=1";

        return this.http.get(requestUrl, { params }).toPromise();
    }

    getEmployeeDetailsById(userId: string, employeeId: string) {
        let params = new HttpParams();
        params = params.append('userId', userId);
        params = params.append('employeeId', employeeId);
        const requestUrl = `${APPURLS.APIURL}/employee/getEmployeeDetails`;
        return this.http.get(requestUrl, { params }).toPromise();
    }

    addNewEmployee(userId: string, employee: any) {
        let params = new HttpParams();
        params = params.append('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/employee/addEmployee`;
        return this.http.post(requestUrl, employee).toPromise();
    }

    getNotesByEmployeeId(userId: string, employeeId: string) {
        let params = new HttpParams();
        params = params.append('userId', userId);
        params = params.append('employeeId', employeeId);
        const requestUrl = `${APPURLS.APIURL}/notes/getNotesByEmployeeId`;
        return this.http.get(requestUrl, { params }).toPromise();
    }

    searchEmployee(userId: string, employeeCode: string) {
        let params = new HttpParams();
        params = params.append('userId', userId);
        params = params.append('searchString', employeeCode);
        const requestUrl = `${APPURLS.APIURL}/employee/searchEmployee`;
        return this.http.get(requestUrl, { params });
    }

    displayModify(employeeData: IEmployee[]) {
        const demographics: IDemographicsModel = this.appService.demographicsData;

        //console.log(`testing things`);
        console.log(demographics);
        const modifiedEmployee = employeeData.map((employee) => {
            const jobTitle = demographics.jobTitles.find((job) => job.jobTitleId === employee.jobTitle).jobTitle;
            const workLocation = demographics.workLocations.find((location) => location.workLocationId === employee.workLocation).workLocation;
            return { ...employee, jobTitle, workLocation };
        });
        return modifiedEmployee;
    }

    updateEmployee(userId: string, employeeId: string, updateFields: any) {
        let params = new HttpParams();
        params = params.append('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/employee/updateEmployee`;
        return this.http.post(requestUrl, { employeeId, updateFields }, { params }).toPromise();
    }
}
