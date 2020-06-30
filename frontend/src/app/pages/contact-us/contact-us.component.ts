import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ngx-contact-us-component',
    template: `<router-outlet></router-outlet>`,
})

export class ContactUsComponent implements OnInit{
  

    ngOnInit(){
      
    }

   
}