import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    jwtHelper: any;
    constructor() {
        this.jwtHelper = new JwtHelperService();
    }

    public getToken(): string {
        return localStorage.getItem('access_token');
    }

    isUserAutheticated() {
        const token = localStorage.getItem('access_token');
        return !this.jwtHelper.isTokenExpired(token);
    }

    decodeToken(token: string) {
        return this.jwtHelper.decodeToken(token);
    }
}
