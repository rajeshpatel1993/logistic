import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APPURLS } from '../../constants/appUrls';
import { IAssetCategory, INewAsset } from '../interfaces/asset-list.interface';

@Injectable()
export class AssetService  {
    assetCategories: IAssetCategory[];

    constructor(private http: HttpClient) {}

    getListOfAssignedAssets(userId: string) {
        const params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/asset/getAllAssignedAssets`;
        return this.http.get(requestUrl, { params }).toPromise();
    }

    getListOfUnAssignedAssets(userId: string) {
        const params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/asset/getUnassignedAssets`;
        return this.http.get(requestUrl, { params }).toPromise();
    }

    setAssetCategories(assetCategories: IAssetCategory[]) {
        this.assetCategories = Object.assign([], assetCategories);
    }

    createNewAsset(userId: string, assetDetails: INewAsset) {
        const params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/asset/addAsset`;
        return this.http.post(requestUrl, {asset: assetDetails}, { params }).toPromise();
    }

    getAssetCategories(userId: string) {
        const params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/assetcategory/getAllAssetCategory`;
        return this.http.get(requestUrl, { params }).toPromise();
    }

    getAssignStatus(userId: string) {
        const params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/assignstatus/getAssignStatusList`;
        return this.http.get(requestUrl, { params }).toPromise();
    }

    updateAsset(userId: string, assetId: Number, assetDetails: INewAsset) {
        const params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/asset/updateAsset`;
        return this.http.post(requestUrl, {assetId: Number(assetId), updatedAsset: assetDetails}, { params }).toPromise();
    }

    unAssignAsset(userId: string, assetId: string) {
        const params = new HttpParams().set('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/asset/unassignAssetToEmployee`;
        return this.http.post(requestUrl, { assetId: assetId }, { params }).toPromise();
    }
}