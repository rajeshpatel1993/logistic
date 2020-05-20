import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { RemainderService } from '../remainder.service';
import { Subscription } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'ngx-edit-remainders',
  templateUrl: './edit-remainders.component.html',
  styleUrls: ['./edit-remainders.component.scss']
})
export class EditRemaindersComponent implements OnInit {

  public remidnerType = [];
  keyword = 'name';
  public remainderTypeData: any = [];
  form: FormGroup;
  public typeSubscription: Subscription;
  public reminderForm: FormGroup;
  public attachFileUniqueId = uuid.v4();
  public remainderId:String;
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


  constructor(private fb: FormBuilder, private remainderService: RemainderService, private router: Router,  private activeRoute: ActivatedRoute) { }


  // constructor(private fb: FormBuilder, protected ref: NbDialogRef<AadRemaindersComponent>, private remainderService: RemainderService) { }


  ngOnInit() {
    this.remainderId = this.activeRoute.snapshot.params.id;
    this.createForm(this.remainderId);
    this.loadTypes();
    this.loadRemainder(this.remainderId);

  }
  selectEventD(item) { }
  onChange(event) {
    //console.log('changed');
  }


  createForm(remainderId) {
    let group = {
      category: ['', Validators.required],
      remainder_name: ['', Validators.required],
      subject: ['', Validators.required],
      expiration_date: ['', Validators.required],
      interval: [0, Validators.required],
      email_lists: ['', Validators.required],
      owner: [''],
      template: ['', Validators.required],
      expiration_time: ['', Validators.required],
      notes: [''],
      enable: ['', Validators.required],
      alert_after_expiration: [''],
      remainder_id:[remainderId],
      attach_file_unique_id: [this.attachFileUniqueId]
    };
    this.reminderForm = this.fb.group(group);
  }

  get f() { return this.reminderForm.controls; }



  onBlur(event) {
    //console.log('blur ' + event);
  }

  onChange2(event) {
    console.warn(this.form.value);
  }
  fileAdded(event) { }
  uploadBills() { }




  loadRemainder(remainderId){

    this.remainderService.loadRemainder(remainderId).subscribe((d)=>{

      let remainderData = d['data'][0]
      this.reminderForm.get("category").patchValue(remainderData['remainderType']);
      this.reminderForm.get("remainder_name").patchValue(remainderData["remainderName"]);
      this.reminderForm.get("subject").patchValue(remainderData["subject"]);
      this.reminderForm.get("expiration_date").patchValue(remainderData["expirationDate"]);
      this.reminderForm.get("interval").patchValue(remainderData["remainderInterval"]);
      this.reminderForm.get("email_lists").patchValue(remainderData["emailList"]);
      this.reminderForm.get("owner").patchValue(remainderData["ownerEmail"]);
      this.reminderForm.get("template").patchValue(remainderData["template"]);
      this.reminderForm.get("expiration_time").patchValue(remainderData["expirationTime"]);
      this.reminderForm.get("notes").patchValue(remainderData["notes"]);
      this.reminderForm.get("enable").patchValue(remainderData["enabledisable"]);
      this.reminderForm.get("alert_after_expiration").patchValue(remainderData["afterexpiration"]);
      // this.reminderForm.get("alert_after_expiration").patchValue(remainderData["afterexpiration"]);

    }, (error)=>{
      console.log(error);
    });

  }





  getMsg(val){
    this.dialogBox = false;
  }
  

  updateRemainder(){


    if (this.reminderForm.invalid) {
      alert("Please fill all required field");
      return;
    }
    



   this.remainderService.updateRemainder(this.reminderForm.value).subscribe((data)=>{
      this.msgObj["type"] = "success";
      this.msgObj["message"] = "successfully Updated";
      this.dialogBox = true;

      setTimeout( ()=> {
        this.router.navigateByUrl('/pages/remainders/list');
    }, 2000);
    
    },(error)=>{

      this.msgObj["type"] = "error";
      this.msgObj["message"] =error.error.errmsg;
      this.dialogBox = true;
    });

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
