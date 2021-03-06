import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { AuthService } from '../services/auth.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
  <div class="logiVehicle">
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
    </div>
  `,
})
export class PagesComponent {

  


  menu = MENU_ITEMS;

  constructor(){


   

}



}
