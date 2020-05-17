// import { IGeneralData } from '/interfaces/demographics.interface';

import { IGeneralData } from '../../interfaces/demographics.interface';

export interface IAsset extends IGeneralData {
    assetId?: string;
    assetCat: string;
    assetBrand: string;
    assignStatus: string;
    assetDesc: string;
    serialNo: string;
    dateAssigned?: string;
    dateRetured?: string;
    comments?: string;
    empId?: string;
    createdDate?: string;
    updatedDate?: Date,
    updateId?: Number,
    updatedStatus?: Number;
    assetCategory?: IAssetCategory;
}

export interface IAssignedAsset extends IAsset {
    employeeDetails: IEmployeeAsset;
}

export interface IAssetCategory extends IGeneralData {
    assetCategoryId: string;
    assetCategory: string;
}

export interface IEmployeeAsset {
    employeeID: string; 
    employeeCode: string;
    emailAddress: string;
}

export interface INewAsset {
    assetId?: string;
    assetCat: string;
    assetBrand: string;
    assignStatus: string;
    assetDesc: string;
    serialNo: string;
    dateAssigned?: Date;
    dateRetured?: Date;
    comments?: string;
    empId?: Number;
    createdDate?: Date;
    creatorId?: string;
    updatedDate?: Date,
    updateId?: Number,
    updatedStatus?: Number,
    organizationId: string;
}

export interface IAssignStatus extends IGeneralData {
    assignStatusId: string;
    assignStatus: string;
}
