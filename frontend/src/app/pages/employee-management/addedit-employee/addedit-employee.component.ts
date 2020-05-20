import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { combineLatest } from 'rxjs';
import { EmployeeListService } from '../../../shared/services/employee-list.service';
import { IEmployee, IFormattedEmployee, IProfile, IJob, IEmergencyTab, IPassportTab, INotesTab, INotes, IAttachementTab } from '../../../interfaces/employee.interface';
import { DatePipe } from '@angular/common';
import { ApplicationConstants } from '../../../constants/appUrls';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-addedit-employee',
  templateUrl: './addedit-employee.component.html',
  styleUrls: ['./addedit-employee.component.css']
})
export class AddeditEmployeeComponent implements OnInit {
  userId: string = '1';
  employeeId: string;
  employeeDetails: IEmployee;
  loading: boolean = true;
  tabs: any[] = [];
  profileForm: FormGroup;
  jobTabForm: FormGroup;
  emergencyTabForm: FormGroup;
  passportTabForm: FormGroup;
  notesTabData: INotesTab[];
  attachmentTabData: IAttachementTab;
  notesLoading: boolean = true;
  editOption: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, 
    private employeeService: EmployeeListService, private datePipe: DatePipe,
    private fb: FormBuilder, private toastrService: NbToastrService) { }

  ngOnInit() {
    combineLatest([this.route.parent.parent.paramMap, this.route.paramMap]).subscribe(([parentParams, currentParams]) => {
      //console.log('Inside Join');
      // this.userId = parentParams.get('userId');
      this.userId ='1';
      this.employeeId = currentParams.get('employeeId');
      this.intializeEmployeeDetails();
    });
  }


  intializeEmployeeDetails() {
    this.employeeService.getEmployeeDetailsById(this.userId, this.employeeId).then((data: IEmployee) => {
      //console.log(`reached emp details`);
      this.employeeDetails = data;
      if(this.employeeDetails) {
        this.profileForm = this.fb.group({
          bloodGroup: [this.employeeDetails.bloodGroup],
          DOB: [new Date(this.employeeDetails.DOB)],
          firstName: [this.employeeDetails.firstName],
          lastName: [this.employeeDetails.lastName],
          middleName: [this.employeeDetails.middleName],
          gender: [this.employeeDetails.gender ? this.employeeDetails.gender : ''],
          martialStatus: [this.employeeDetails.maritalStatus]
        });
        this.jobTabForm = this.fb.group({
          DOJ: [new Date(this.employeeDetails.DOJ)],
          DOR: [new Date(this.employeeDetails.DOR)],
          emailAddress: [this.employeeDetails.emailAddress],
          status: [this.employeeDetails.status],
          employmentStatusId: [this.employeeDetails.employmentStatusId ? this.employeeDetails.employmentStatusId : '1'],
          projectID: [this.employeeDetails.projectID],
          role: [this.employeeDetails.role],
          workLocation: [this.employeeDetails.workLocation],
          projectTypeId: [this.employeeDetails.projectTypeId],
          jobTitle: [this.employeeDetails.jobTitle]
        });
        this.emergencyTabForm = this.fb.group({
          address: [this.employeeDetails.address],
          Country: [this.employeeDetails.Country],
          nationality: [this.employeeDetails.nationality],
          zipCode: [this.employeeDetails.zipCode],
          primaryContact: [this.employeeDetails.primaryContact],
          emergencyContact: [this.employeeDetails.emergencyContact]
        });
        this.passportTabForm = this.fb.group({
          gopCopy: [this.employeeDetails.gopCopy],
          gopNo: [this.employeeDetails.gopNo],
          gopValid: [new Date(this.employeeDetails.gopValid)],
          passportCopy: [this.employeeDetails.passportCopy],
          passportNo: [this.employeeDetails.passportNo],
          passportValid: [new Date(this.employeeDetails.passportValid)],
          ninNo: [this.employeeDetails.ninNo],
          ninValid: [new Date(this.employeeDetails.ninValid)],
          ninCopy: [this.employeeDetails.ninCopy]
        });
        this.attachmentTabData = {
          fitnessCopy: {
            url: this.employeeDetails.fitnessCopy,
            fileType: this.employeeDetails.fitnessCopy ? this.employeeDetails.fitnessCopy.split('/').pop() : null
          },
          gopCopy: {
            url: this.employeeDetails.gopCopy,
            fileType: this.employeeDetails.gopCopy ? this.employeeDetails.gopCopy.split('/').pop() : null
          },
          ninCopy: {
            url: this.employeeDetails.ninCopy,
            fileType: this.employeeDetails.ninCopy ? this.employeeDetails.ninCopy.split('/').pop() : null
          },
          offerLetterCopy: {
            url: this.employeeDetails.offerLetterCopy,
            fileType: this.employeeDetails.offerLetterCopy ? this.employeeDetails.offerLetterCopy.split('/').pop() : null
          },
          passportCopy: {
            url: this.employeeDetails.passportCopy,
            fileType: this.employeeDetails.passportCopy ? this.employeeDetails.passportCopy.split('/').pop() : null
          }
        };
      }
      this.loading = false;
      this.intializeTabs();
      this.intializeComponentData();
    }).catch(err => {
      this.loading = false;
      console.log(err);
    });
  }

  intializeComponentData() {

  }

  intializeTabs() {
    this.tabs = [
      {
        title: 'Profile',
        route: './profile'
      },
      {
        title: 'Job',
        route: './jobDetails',
      },
      {
        title: 'Emergency',
        route: './emergency'
      },
      {
        title: 'Passport',
        route: './passport'
      },
      {
        title: 'Gop',
        routeParam: './notes',
      },
      {
        title: 'Files',
        route: './files'
      },
      {
        title: 'NIN',
        route: './nin'
      }
    ];
  }

  changeTab(activeTab) {
    /* const activeTabRoute = this.tabs.find((tab) => tab.title === activeTab.tabTitle);
    if (activeTabRoute && activeTabRoute.route) {
      this.router.navigate([activeTabRoute.route], { relativeTo: this.route });
    } */
    if(activeTab.tabTitle === 'Notes') {
      this.notesLoading = true;
      this.getNotes();
    }
  }

  getNotes() {
    this.employeeService.getNotesByEmployeeId(this.userId, this.employeeId).then((data: INotes[]) => {
      //console.log(data);
      this.notesTabData = data.map((note) => ({ 
        notesDesc: note.notesDesc,
        notesId: note.notesId,
        updatedAt: note.updated_at
      }));
      this.notesLoading = false;
    })
  }

  enableEdit() {
    this.editOption = true;
  }

  saveEmployee() {
    const modifiedFields = {
      ...this.profileForm.value,
      ...this.jobTabForm.value,
      ...this.emergencyTabForm.value,
      ...this.passportTabForm.value
    };
    console.log(modifiedFields);
    this.employeeService.updateEmployee(this.userId, this.employeeId, modifiedFields).then((data: any) => {
      //console.log(data);
      if(data.errors &&  Object.keys(data.errors).length) {
        Object.keys(data.errors).map((errorKey) => {
          this.showToast('warning', data.errors[errorKey].message);
        })
      } else {
        this.showToast('success', 'Employee Updated Successfully');
      }
    }).catch((err) => {
      console.log(err);
      this.showToast('warning', 'Error in updating employee..Please Try Again Later')
    })
  }

  showToast(status, message) {
    this.toastrService.show(status, message, { status, duration: 5000 });
    this.intializeEmployeeDetails();
  }

  discardChanges() {
    this.intializeEmployeeDetails();
  }

}
