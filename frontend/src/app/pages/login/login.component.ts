import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder,
              private appService: AppService, private authService: AuthService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    const requestObject = this.userForm.value;
    this.appService.login(requestObject).then((data: any) => {
      if (data && data.success) {
        localStorage.setItem('access_token', data.token);
        const decodedToken = this.authService.decodeToken(data.token);
        localStorage.setItem('organization_key', JSON.stringify({ [decodedToken.userId]: data.loggedUserDet.organizationId}));
        this.appService.setLoggedInUser(data.loggedUserDet);
        this.goToDashboard(data.loggedUserDet.userId);
      }
    });
  }

  goToDashboard(userId) {
    this.router.navigate(['/pages/dashboard/']);
  }

}
