import { Component, OnInit, Input } from '@angular/core';
import { IPassportTab } from '../../../interfaces/employee.interface';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-passport-details',
  templateUrl: './passport-details.component.html',
  styleUrls: ['./passport-details.component.css']
})
export class PassportDetailsComponent implements OnInit {
  @Input() passportDataForm: FormGroup;
  @Input() editOption: boolean = false;
  passportForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    /* this.passportForm = this.fb.group({});
    if(this.passportData && Object.keys(this.passportData).length) {
      Object.keys(this.passportData).forEach((data) => {
        this.passportForm.addControl(data, new FormControl(this.passportData[data]));
      })
    } else  {
      this.passportForm = this.fb.group({
        gopCopy: [null],
        gopNo: [''],
        gopValid: [''],
        passportCopy: [null],
        passportNo: [''],
        passportValid: [''],
        ninNo: [''],
        ninValid: [''],
        ninCopy: [null]
      });
    } */
  }

}
