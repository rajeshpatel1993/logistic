import { IGeneralData } from '../../interfaces/demographics.interface';

export interface ILeaveData {
    employeeID: string;
    purposeOfLeave: string;
    submissionDate: Date;
    leaveType: string;
    StartDate: Date;
    EndDate: Date;
    approvedDate?: Date;
    approvalStatus?: string;
    application_msg?: string;
    reply_msg?: string;
    attachment?: number;
    note?: string;
    createdDate: Date;
    creatorId: string;
    updatedDate: Date;
    updateId?: Number;
    updatedStatus?: Number;
    organizationId: string;
}

export interface ILeaveDataResponse extends IGeneralData, ILeaveData {
    employeeDetails: ILeaveDataEmpDetails;
    leaveTypeDetails: ILeaveTypeDetails;
    employeeLeaveDetails: IEmployeeLeaveDetails;
}

export interface ILeaveDataEmpDetails {
    employeeID: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
}

export interface ILeaveTypeDetails {
    leaveTypeId: string;
    leaveType: string;
}

export interface IEmployeeLeaveDetails {
    employeeLeaveId: string;
    empID: string;
    sickLeaveBalance: string;
    vactionLeaveBal: string;
    compOffLeaveBal: string;
}

export interface IUserLeaveData {
    employeeLeaveId: string;
    employeeLeaveCode: string;
    sickLeaveBalance: string;
    vactionLeaveBal: string;
    compOffLeaveBal: string;
    empID: string;
    creatorId: string;
    updatedDate: Date,
    updateId: string;
    updatedStatus: string;
}