import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { ThemeModule } from '../../@theme/theme.module';
import { CustomCommonModule } from '../custom-common.module';
import { NbCardModule, NbLayoutModule, NbTabsetModule, NbDatepickerModule } from '@nebular/theme';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgxImgModule } from 'ngx-img';
import { LoginComponent } from './login.component';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  
  imports: [
    LoginRoutingModule,
    CustomCommonModule,
    ThemeModule,
    NbCardModule,
    NbLayoutModule,
    NbTabsetModule,
    NbDatepickerModule,
    AutocompleteLibModule,
    NgxImgModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
  ],
  declarations: [LoginComponent],
  providers: [AppService, AuthService]
})
export class LoginModule { }
