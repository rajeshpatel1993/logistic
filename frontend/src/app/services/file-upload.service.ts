import { Injectable } from '@angular/core'
import * as firebase from 'firebase/app';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { HttpParams, HttpClient } from '@angular/common/http';
import { APPURLS } from '../constants/appUrls';

@Injectable()
export class FileUploadService {
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    
    constructor(private afStorage: AngularFireStorage, private http: HttpClient) { }

    upload(file, filename) {
        return new Promise((resolve, reject) => {
            let storageRef = firebase.storage().ref();
            let uploadTask = storageRef.child(`${filename}`).put(file);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            }, (error) => {
                console.log('error');
                console.log(error);
                reject('error');
            }, () => {
                console.log('success');
                uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
                    console.log(downloadUrl);
                    resolve(downloadUrl);
                })
            });
        })
    }

    deleteFile(filename) {
        return new Promise((resolve, reject) => {
            let storageRef = firebase.storage().ref();
            let deleteTask = storageRef.child(`${filename}`).delete();
            deleteTask.then(() => {
                resolve('success');
            }).catch((err) => {
                reject(err);
            })
        })
    }

    uploadFile(uploadData: FormData, userId: string) {
        let params = new HttpParams();
        params = params.append('userId', userId);
        const requestUrl = `${APPURLS.APIURL}/employee/uploadFiles`;
        return this.http.post(requestUrl, uploadData).toPromise();
    }

    getFile(filepath) {
        return new Promise((resolve, reject) => {
            let storageRef = firebase.storage().ref();
            let fileRef = storageRef.child(filepath)
            fileRef.getDownloadURL().then((url) => {
                console.log(url);
                resolve(url);
            }).catch((err) => { 
                console.log(err);
                reject(err.code);
            });
        })
    }
} 