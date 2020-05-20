import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IEmployee, IProfile, IJob, IPassportTab, IEmergencyTab } from '../../../interfaces/employee.interface';
import { AppService } from '../../../services/app.service';

import { EmployeeListService } from '../../../shared/services/employee-list.service';
import { NbToastrService, NbDialogService, NbDialogRef } from '@nebular/theme';

import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.css']
})
export class AddNewEmployeeComponent implements OnInit {
  newEmployeeForm: FormGroup;
  newEmployee: IEmployee;
  userId: string;
  organizationId: string
  loading: boolean = true;
  selectedFiles: any = {};
  constructor(private fb: FormBuilder, private appService: AppService, private dialogRef: NbDialogRef<AddNewEmployeeComponent>,
              private employeeService: EmployeeListService, private toastrService: NbToastrService,
              private uploadService: FileUploadService) { }

  ngOnInit() {
    this.userId = this.appService.loggedInUser.userId;
    this.organizationId = this.appService.organizationDetails.organizationId;
    //console.log(this.userId);
    //console.log(this.organizationId);
    this.intializeForm();
    this.loading = false;
  }

  intializeForm() {
    this.newEmployeeForm = this.fb.group({
      profileForm: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: ['', Validators.required],
        dob: [''],
        gender: ['', Validators.required],
        martialStatus: [''],
        bloodGroup: [''],
      }),
      jobTabForm: this.fb.group({
        doj: ['', Validators.required],
        dor: [''],
        email: [''],
        employeeStatus: [''],
        employmentStatus: [''],
        project: [''],
        role: [''],
        workLocation: ['', Validators.required],
        projectType: [''],
        jobTitleId: ['', Validators.required]
      }),
      emergencyTabForm: this.fb.group({
        address: ['', Validators.required],
        country: ['', Validators.required],
        nationality: ['', Validators.required],
        zipCode: [''],
        primaryContact: [''],
        emergencyContact: ['']
      }),
      passportTabForm: this.fb.group({
        gopCopy: [null],
        gopNo: [''],
        gopValid: [''],
        passportCopy: [null],
        passportNo: [''],
        passportValid: [''],
        ninNo: [''],
        ninValid: [''],
        ninCopy: [null]
      })
    });
  }

  uploadFile(event, fileObj) {
    //this.uploadService.upload(event.target.files[0], 'testdoc');
    if(event.target.files[0].type != "application/pdf" && event.target.files[0].type != "application/msword" && event.target.files[0].type != "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      alert('Please Select only document or pdf');
    } else {
      this.selectedFiles = {
        ...this.selectedFiles,
        [fileObj]: event.target.files[0]
      };
      //console.log(this.selectedFiles);
    }
  }

  addNewEmployee() {
    //console.log(this.newEmployeeForm.value);
    const profileDetails: IProfile = this.newEmployeeForm.get('profileForm').value;
    const jobDetails: IJob = this.newEmployeeForm.get('jobTabForm').value;
    const contactDetails: IEmergencyTab = this.newEmployeeForm.get('emergencyTabForm').value;
    const passportDetails: IPassportTab = this.newEmployeeForm.get('passportTabForm').value;
    this.newEmployee = {
      // TODO: Change the title with the value
      title: 'title',
      role: jobDetails.role,
      firstName: profileDetails.firstName,
      middleName: profileDetails.middleName,
      lastName: profileDetails.lastName,
      address: contactDetails.address,
      zipCode: contactDetails.zipCode,
      Country: contactDetails.country,
      nationality: contactDetails.nationality,
      gender: profileDetails.gender,
      maritalStatus: profileDetails.martialStatus,
      religion: '',
      bloodGroup: profileDetails.bloodGroup,
      DOB: profileDetails.dob ? profileDetails.dob : null,
      primaryContact: contactDetails.primaryContact,
      emergencyContact: contactDetails.emergencyContact,
      emailAddress: jobDetails.email,
      workLocation: jobDetails.workLocation,
      jobTitle: jobDetails.jobTitleId,
      /* empImage: string, */
      passportNo: passportDetails.passportNo,
      passportValid: passportDetails.passportValid,
      gopNo: passportDetails.gopNo,
      gopValid: passportDetails.gopValid,
      ninNo: passportDetails.ninNo,
      ninValid: passportDetails.ninValid,
      DOJ: jobDetails.doj,
      DOR: jobDetails.dor ? jobDetails.dor : null,
      status: jobDetails.employeeStatus,
      workLocationId: jobDetails.workLocation,
      projectID: jobDetails.project,
      projectTypeId: jobDetails.projectType,
      Date: new Date(),
      creatorId: this.userId,
      updatedDate: new Date(),
      organizationId: this.organizationId,
      employmentStatusId: jobDetails.employmentStatus
    };
    //console.log(this.newEmployee);
    const formData = this.toFormData();
    this.employeeService.addNewEmployee(this.userId, formData).then((data: any) => {
      //console.log(data);
      if(data) {
        if(data.errors &&  Object.keys(data.errors).length) {
          Object.keys(data.errors).map((errorKey) => {
            this.showToast('warning', data.errors[errorKey].message);
          })
        } else {
          this.showToast('success', data.message);
          this.dialogRef.close({ creation: 'success' });
        }
      } else {
        this.showToast('warning', 'Something Bad Happened..Please Try Again');
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  toFormData() {
    const formData = new FormData();

    for(const key of Object.keys(this.newEmployee)) {
      const value = this.newEmployee[key];
      formData.append(key, value);
    }

    for(const key of Object.keys(this.selectedFiles)) {
      const value = this.selectedFiles[key];
      formData.append(key, value);
    }
    //console.log(formData);
    return formData;
  }

  showToast(status, message) {
    this.toastrService.show(status, message, { status, duration: 1000 });
  }

}
