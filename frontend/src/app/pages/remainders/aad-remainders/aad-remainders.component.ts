import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { RemainderService } from '../remainder.service';
import { Subscription } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-aad-remainders',
  templateUrl: './aad-remainders.component.html',
  styleUrls: ['./aad-remainders.component.scss']
})
export class AadRemaindersComponent implements OnInit {

  public remidnerType = [];
  keyword = 'name';
  public remainderTypeData: any = [];
  form: FormGroup;
  public typeSubscription: Subscription;
  public reminderForm: FormGroup;
  public attachFileUniqueId = uuid.v4();
  public vehicleStatusList: any = [];
  public dialogBox : boolean = false;
  public msgObj ={};

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'http://localhost:3000/api/vehicles/uploadeditorfile',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  htmlContent = '';


  constructor(private fb: FormBuilder, private remainderService: RemainderService, private router: Router) { }


  // constructor(private fb: FormBuilder, protected ref: NbDialogRef<AadRemaindersComponent>, private remainderService: RemainderService) { }


  ngOnInit() {

    this.createForm();
    this.loadTypes();

  }
  selectEventD(item) { }
  onChange(event) {
    console.log('changed');
  }


  createForm() {
    let group = {
      category: ['', Validators.required],
      remainder_name: ['', Validators.required],
      subject: ['', Validators.required],
      expiration_date: ['', Validators.required],
      interval: [0, Validators.required],
      email_lists: ['', Validators.required],
      owner: ['', Validators.required],
      template: ['', Validators.required],
      expiration_time: ['', Validators.required],
      notes: ['', Validators.required],
      enable: ['', Validators.required],
      alert_after_expiration: [''],
      attach_file_unique_id: [this.attachFileUniqueId]
    };
    this.reminderForm = this.fb.group(group);
  }

  get f() { return this.reminderForm.controls; }



  onBlur(event) {
    console.log('blur ' + event);
  }

  onChange2(event) {
    console.warn(this.form.value);
  }
  fileAdded(event) { }
  uploadBills() { }


  addRemainder() {

    if (this.reminderForm.invalid) {
      alert("Please fill all required field");
      return;
    }

    this.remainderService.addRemainder(this.reminderForm.value).subscribe((d)=>{

      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Added";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/remainders/list');
    }, 2000);

    },(error)=>{


      this.msgObj["type"] = "error";
      this.msgObj["message"] =error.error.errmsg;
      this.dialogBox = true;

      
    });
    // console.log(this.reminderForm.value);
  }
  // cancel() {
  //   this.ref.close();
  // }
  loadTypes() {
    this.typeSubscription = this.remainderService.loadRemainderTypes().subscribe((d) => {
      this.remainderTypeData = d['data'];

    }, (err) => {
      console.log(err);
    });
  }
}
