import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { IDemographicsModel, IWorkLocationModel, IJobTitleModel, IEmployeeStatusModel, IEmploymentStatusModel, IProjectModel, IProjectTypeModel } from '../../../interfaces/demographics.interface';
import { IJob } from '../../../interfaces/employee.interface';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  @Input() jobDataForm: FormGroup;
  @Input() editOption: boolean = false;
  demographicsData: IDemographicsModel;
  workLocationOptions: IWorkLocationModel[];
  jobTitleOptions: IJobTitleModel[];
  employeeStatusOptions: IEmployeeStatusModel[];
  employmentTypeOptions: IEmploymentStatusModel[];
  projectOptions: IProjectModel[];
  projectTypeOptions: IProjectTypeModel[];

  constructor(private appService: AppService, private fb: FormBuilder) { }

  ngOnInit() {
    /* this.jobDetailsForm = this.fb.group({}); */
    this.demographicsData = this.appService.demographicsData;
    if(this.demographicsData) {
      this.workLocationOptions = this.demographicsData.workLocations;
      this.employeeStatusOptions = this.demographicsData.employeeStatus;
      this.employmentTypeOptions = this.demographicsData.employmentStatus;
      this.jobTitleOptions = this.demographicsData.jobTitles;
      this.projectOptions = this.demographicsData.projects;
      this.projectTypeOptions = this.demographicsData.projectTypes;
      console.log(this.employeeStatusOptions);
    }
  }

  /* intializeForm() {
    if (this.jobData && Object.keys(this.jobData).length) {
      Object.keys(this.jobData).map((job) => {
        console.log(job);
        this.jobDetailsForm.addControl(job, new FormControl(this.jobData[job]))
      })
    } else {
      this.jobDetailsForm = this.fb.group({
        doj: [''],
        dor: [''],
        email: [''],
        employeeStatus: [''],
        employmentStatus: [''],
        project: [''],
        role: [''],
        workLocation: [''],
        projectType: [''],
        jobTitleId: ['']
      })
    }
    console.log(this.jobDetailsForm);
  }
 */
}
