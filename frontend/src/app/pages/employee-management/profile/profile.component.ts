import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { IDemographicsModel, IGenderModel, IMartialModel, IBloodGroupModel } from '../../../interfaces/demographics.interface';
import { IProfile } from '../../../interfaces/employee.interface';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() profileDataForm: FormGroup;
  @Input() editOption: boolean = false;
  bloodGroupOptions: IBloodGroupModel[];
  demographicsData: IDemographicsModel;
  genderOptions: IGenderModel[];
  martialOptions: IMartialModel[];
  profileForm: FormGroup;

  constructor(private appService: AppService, private fb: FormBuilder) { }

  ngOnInit() {
    this.demographicsData = this.appService.demographicsData;
    if(this.demographicsData) {
      this.genderOptions = this.demographicsData.gender;
      this.martialOptions = this.demographicsData.martialStatus;
      this.bloodGroupOptions = this.demographicsData.bloodGroups;
      //console.log(this.martialOptions);
    }
  }

  /* intializeProfileDetails() {
    console.log(this.profileData);
    this.profileForm = this.fb.group({})
    if(this.profileData && Object.keys(this.profileData).length) {
      Object.keys(this.profileData).forEach((data) => {
        this.profileForm.addControl(data, new FormControl(this.profileData[data]));
      })  
    } else {
      this.profileForm = this.fb.group({
        firstName: [''],
        lastName: [''],
        middleName: [''],
        dob: [''],
        gender: [''],
        martialStatus: [''],
        bloodGroup: [''],
      })
    } 
  } */

}
