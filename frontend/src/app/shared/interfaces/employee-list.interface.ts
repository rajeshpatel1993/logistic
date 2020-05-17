export interface IEmployeeList {
    employeeId: string;
    givenName?: string;
    surName?: string;
    designation?: string;
    workLocation?: string;
    projectName?: string;
    mailId?: string;
    dob?: string;
    phoneNumber?: string;
    photoUrl?: string;
    reminders?: IReminder;
}

export interface IReminder {
    passportInfo?: any;
    visaInfo?: any;
    ninInfo?: any;
    leaveInfo?: any;
}

export interface ISearchEmployeeResponse {
    employeeCode: string;
    employeeID: string;
    firstName: string;
    lastName: string;
}