import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpParams,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { SpinnerComponent } from '../pages/spinner/spinner.component';
import { AppService } from './app.service';
import { APPURLS } from '../constants/appUrls';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    dialogRef: any = null;
    counter: number = 0;
    constructor(private dialogService: NbDialogService, private appService: AppService) { }

    getOrganizationId(userId: string) {
        const organizationKey = JSON.parse(localStorage.getItem('organization_key'));
        return organizationKey[userId];
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log(request.url);
        //console.log("token interceptor");
        const loadCheck = APPURLS.blackListedUrls.some((url) => request.url === `${APPURLS.APIURL}${url}`);
        //console.log('LoadCheck', loadCheck);
        if (request.url.indexOf('/login/checkUser') < 0) {
            const token = localStorage.getItem('access_token');
            const userId = request.params.get('userId') ? request.params.get('userId') : this.appService.loggedInUser ? this.appService.loggedInUser.userId : '';
            const organizationId = this.getOrganizationId(userId);
            this.counter++;
            if (organizationId && token) {
                const params = request.params.append('organizationId', organizationId);
                request = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${token}`
                    },
                    params
                });
            }
        }
        //console.log(request);
        //console.log('Inside Intercept');
        // HACK: Change the loading to each component
        if(!loadCheck && this.dialogRef === null) {
            this.openDialog();
        }
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if(!loadCheck) {
                    this.closeDialog();
                }
                
            } else if(event instanceof HttpErrorResponse) {
                if(!loadCheck) {
                    this.closeDialog();
                }
            }
            return event;
        }));
    }

    openDialog() {
        this.dialogRef = this.dialogService.open(SpinnerComponent, { hasBackdrop: true });
    }

    closeDialog() {
        if(this.dialogRef) {
            this.dialogRef.close();
            this.dialogRef = null;
        }
    }
}
