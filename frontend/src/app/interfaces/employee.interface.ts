import { IJobTitleModel, ITitleModel, ICountryModel, INationalityModel, IGenderModel, IMartialModel, IReligionModel, IBloodGroupModel, IWorkLocationModel, IProjectModel, IProjectTypeModel, IGeneralData } from './demographics.interface';

export interface IEmployee {
    employeeID?: string;
    employeeCode?: string;
    title?: string;
    role: string;
    firstName: string;
    middleName: string;
    lastName: string;
    address: string;
    zipCode: string;
    Country: string;
    nationality: string;
    gender: string;
    maritalStatus?: string,
    religion?: string,
    bloodGroup?: string,
    DOB: Date,
    primaryContact: string,
    emergencyContact: string,
    emailAddress?: string,
    workLocation: string;
    jobTitle: string;
    empImage?: string,
    passportNo?: string;
    passportValid?: Date,
    passportCopy?: string,
    gopNo?: string,
    gopValid?: Date,
    gopCopy?: string,
    ninNo?: string,
    ninValid?: Date,
    ninCopy?: string,
    fitnessCopy?: string,
    offerLetterCopy?: string,
    DOJ: Date;
    DOR?: Date;
    status?: string;
    workLocationId: string,
    assignedProject?: number;
    projectID: string,
    projectTypeId: string;
    Date: Date,
    creatorId: string,
    updatedDate: Date,
    updateId?: Number,
    updatedStatus?: Number,
    organizationId: string;
    employmentStatusId?: string;
}

export interface ILoggedInUserData {
    created_at: string;
    designation: string;
    firstName: string;
    lastName: string;
    organizationId: string;
    userId: string;
    userRole: string;
    username: string;
}

export interface IFormattedEmployee {
    employeeID: string;
    employeeCode: string;
    title: ITitleModel;
    role: string;
    firstName: string;
    middleName: string;
    lastName: string;
    address: string;
    zipCode: string;
    Country: ICountryModel;
    nationality: INationalityModel;
    gender: IGenderModel;
    maritalStatus: IMartialModel,
    religion: IReligionModel,
    bloodGroup: IBloodGroupModel,
    DOB: Date,
    primaryContact: string,
    emergencyContact: string,
    emailAddress: string,
    jobTitle: IJobTitleModel;
    empImage: string,
    passportNo: string;
    passportValid: Date,
    passportCopy: string,
    gopNo: string,
    gopValid: Date,
    gopCopy: string,
    ninNo: string,
    ninValid: Date,
    ninCopy: string,
    fitnessCopy: string,
    offerLetterCopy: string,
    DOJ: string;
    DOR: string;
    status: string;
    workLocationId: string;
    assignedProject: number;
    projectID: string,
    Date: Date,
    creatorId: Number,
    updatedDate: Date,
    updateId: Number,
    updatedStatus: Number,
    organizationId: string;
    projectDetails: IProjectModel;
    projectTypeDetails: IProjectTypeModel;
    workLocation: IWorkLocationModel;
    projectTypeId: string;
    employmentStatusId: string;
}

export interface IProfile {
    firstName: string;
    lastName: string;
    middleName: string;
    nickName?: string;
    gender: string;
    martialStatus: string;
    dob: Date;
    bloodGroup: string;
}

export interface IJob {
    workLocation: string;
    projectType: string;
    project: string;
    role: string;
    dor: Date;
    doj: Date;
    email: string;
    employeeStatus: string;
    employmentStatus: string;
    jobTitleId: string;
}

export interface IEmergencyTab {
    address: string;
    country: string;
    nationality: string;
    zipCode: string;
    primaryContact: string;
    emergencyContact: string;
}

export interface IPassportTab {
    passportNo: string;
    passportValid: Date;
    passportCopy: string;
    gopNo: string;
    gopValid: Date;
    gopCopy: string;
    ninNo: string;
    ninValid: Date;
    ninCopy: string;
}

export interface INotesTab {
    notesId: string;
    notesDesc: string;
    updatedAt: Date;
}

export interface INotes extends IGeneralData {
    notesId: string;
    notesDesc: string;
    empID: string;
    updated_at: Date;
    updateId?: number
    updatedStatus?: number;
}

export interface IAttachementTab {
    passportCopy: IAttachment;
    gopCopy: IAttachment;
    fitnessCopy: IAttachment;
    offerLetterCopy: IAttachment;
    ninCopy: IAttachment;
}

export interface IAttachment {
    url: string;
    fileType: string;
}