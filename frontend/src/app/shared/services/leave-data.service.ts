import { Injectable } from '@angular/core' ;
import { HttpClient, HttpParams } from '@angular/common/http';
import { APPURLS } from '../../constants/appUrls';
import { ILeaveData } from '../interfaces/leave-data.interface';

@Injectable()
export class LeaveDataService {
    constructor(private http: HttpClient) {}

    getLeaveData(userId: string, status: string) {
        let params = new HttpParams().set('userId', userId);
        params = params.append('status', status);
        const requestUrl = `${APPURLS.APIURL}/leave/getleavedata`;
        return this.http.get(requestUrl, { params }).toPromise();
    }

    getUserLeaveData(userId: string, employeeId: string) {
        let params = new HttpParams().set('userId', userId);
        params = params.append('employeeId', employeeId);
        const requestUrl = `${APPURLS.APIURL}/leave/getleavebalance`;
        return this.http.get(requestUrl, { params }).toPromise();
    }

    addLeaveForEmployee(userId: string, leaveData: ILeaveData) {
        let params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/leave/addApplyLeave`;
        return this.http.post(requestUrl, {leavedata: leaveData}, { params }).toPromise();
    }

    getLeaveTypes(userId: string) {
        let params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/leaveTypes/getLeaveTypesList`;
        return this.http.get(requestUrl, { params }).toPromise();
    }

    //HACK: Currently employee details is passed as empty object {}.
    //TODO: we need to pass the employee details also to update the leave data for particular employee.
    updateLeaveStatus(userId: string, leaveIds: string[], leaveStatus: string, employeeDetails: any) {
        let params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/leave/changeStatus`;
        return this.http.post(requestUrl, { leaveIds, leaveStatus, employeeDetails }, { params }).toPromise();
    }
}