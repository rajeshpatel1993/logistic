export interface IDemographicsModel {
    bloodGroups: IBloodGroupModel[];
    titles: ITitleModel[];
    countries: ICountryModel[];
    states: IStateModel[];
    gender: IGenderModel[];
    jobTitles: IJobTitleModel[];
    martialStatus: IMartialModel[];
    nationalities: INationalityModel[];
    religions: IReligionModel[];
    workLocations: IWorkLocationModel[];
    employeeStatus: IEmployeeStatusModel[];
    employmentStatus: IEmploymentStatusModel[];
    projectTypes: IProjectTypeModel[];
    projects: IProjectModel[];
    //
    vehicleType: IVehicleTypeModel[];
    brand: IBrandModel[];
    brandVersion: IBrandVersionModel[];
    fuelType: IFuelTypeModel[];
    fuelMeasurement: IFuelMeasurementModel[];
    insurance: IInsuranceModel[];
    vehicleStatus: IVehicleStatusModel[];
}

export interface IGeneralData {
    _id: string;
    creatorId: string;
    organizationId: string;
}

export interface IBloodGroupModel extends IGeneralData {
    bloodGroupId: string;
    bloodGroup: string;
}

export interface ITitleModel extends IGeneralData {
    titleId: string;
    title: string;
}

export interface ICountryModel extends IGeneralData {
    countryId: string;
    countryName: string;
}

export interface IStateModel extends IGeneralData {
    stateId: string;
    stateName: string;
    countryID: string;
}
export interface IGenderModel extends IGeneralData {
    genderId: string;
    gender: string;
}
export interface INationalityModel extends IGeneralData {
    nationalityId: string;
    nationality: string;
}
export interface IMartialModel extends IGeneralData {
    martialStatusId: string;
    martialStatus: string;
}
export interface IJobTitleModel extends IGeneralData {
    jobTitleId: string;
    jobTitle: string;
    fk_WLocation: string;
}
export interface IReligionModel extends IGeneralData {
    religionId: string;
    religion: string;
}
export interface IWorkLocationModel extends IGeneralData {
    workLocationId: string;
    workLocation: string;
    workLocationCode: string;
}

export interface IOrganization extends IGeneralData {
    organizationId: string;
    organizationName: string;
    organizationEmail: string;
}

export interface IProjectTypeModel extends IGeneralData {
    projectTypeId: string;
    projectTypeName: string;
    projectTypeCode: string;
    workLocation_id: string;
}

export interface IProjectModel extends IGeneralData {
    projectId: string;
    projectName: string;
    projectTypeId: string;
}

export interface IEmployeeStatusModel extends IGeneralData {
    employeeStatusId: string;
    employeeStatus: string;
}

export interface IEmploymentStatusModel extends IGeneralData {
    employmentStatusId: string;
    employmentStatus: string;
}


/* Vehicle  */
export interface IVehicleTypeModel extends IGeneralData {
    vehicleTypeId: string;
    vehicleType: string;
    vehicleTypeCode: string;
}

export interface IBrandModel extends IGeneralData {
    brandId: string;
    brand: string;
}

export interface IBrandVersionModel extends IGeneralData {
    modelId: string;
    model: string;
    brandId: string;
}

export interface IFuelTypeModel extends IGeneralData {
    fuelTypeId: string;
    fuelTypeName: string;
    fuelPrice: string;
    fuelMeasurementID: string;
}

export interface IFuelMeasurementModel extends IGeneralData {
    fuelMeasurementId: string;
    fuelMeasurement: string;
    fuelType: string;
}

export interface IInsuranceModel extends IGeneralData {
    insuranceId: string;
    insuranceName: string;
}

export interface IVehicleStatusModel extends IGeneralData {
    vehicleStatusId: string;
    vehicleStatus: string;
    vehicleTypeID: string;   
}

/*export interface IAssignVehicleModel extends IGeneralData {
    vehicleID: string;
    employeeID: string;
    VehicleStatusID: string;
    VechileTypeID: string;
    WorkLocationID: string;
    projectTypeID: string;
    projectID: string;
    assignmentStartDate: Date;
    assignmentEndDate: Date;
    note: string;
} */

