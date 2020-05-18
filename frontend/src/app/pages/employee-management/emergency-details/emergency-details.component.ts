import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { IEmergencyTab } from '../../../interfaces/employee.interface';
import { IDemographicsModel, ICountryModel, INationalityModel } from '../../../interfaces/demographics.interface';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-emergency-details',
  templateUrl: './emergency-details.component.html',
  styleUrls: ['./emergency-details.component.css']
})
export class EmergencyDetailsComponent implements OnInit {
  @Input() contactDataForm: FormGroup;
  @Input() editOption: boolean = false;
  demographicsData: IDemographicsModel;
  countryOptions: ICountryModel[];
  nationalityOptions: INationalityModel[];
  emergencyForm: FormGroup;

  constructor(private appService: AppService, private fb: FormBuilder) { }

  ngOnInit() {
    this.demographicsData = this.appService.demographicsData;
    this.emergencyForm = this.fb.group({});
    if(this.demographicsData) {
      this.countryOptions = this.demographicsData.countries;
      this.nationalityOptions = this.demographicsData.nationalities;
      //this.intializeForm();
    }
  }

  /* intializeForm() {
    console.log(this.contactData);
    if(this.contactData && Object.keys(this.contactData).length) {
      Object.keys(this.contactData).forEach((contact) => {
        this.emergencyForm.addControl(contact, new FormControl(this.contactData[contact]));
      })
    } else {
      this.emergencyForm = this.fb.group({
        address: [''],
        country: [''],
        nationality: [''],
        zipCode: [''],
        primaryContact: [''],
        emergencyContact: ['']
      })
    }
  } */

}
