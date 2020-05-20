import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { AssetService } from '../../../shared/services/asset-list.service';


import { ActivatedRoute, Router } from '@angular/router';
import { IAsset, IAssignStatus } from '../../../shared/interfaces/asset-list.interface';
import { DatePipe } from '@angular/common';
import { ApplicationConstants } from '../../../constants/appUrls';
import { ViewCell } from 'ng2-smart-table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'button-view',
  template: `
    <span class="span-style" (click)="onClick()">{{ renderValue }}</span>
  `,
  styles: [
    `.span-style:hover { border-bottom: 1px solid blue; cursor: pointer }`
  ]
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.router.navigate(['dashboard/' + this.rowData.userId + '/employee-management/edit/' +this.rowData.empId]);
    this.save.emit(this.rowData);
  }
}

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnInit {
  @ViewChild('dialog', { static: true }) dialog: TemplateRef<any>
  userId: string;
  //TODO: Change this interface
  assetList: IAsset[] = [];
  unAssignedList: IAsset[] = [];
  settings: any;
  unassignedSettings: any;
  loading: boolean = true;
  assetForm: FormGroup;
  assignStatuses: IAssignStatus[];
  dialogRef: any;
  selectedAssetDetails: any;

  constructor(private assetService: AssetService, private dialogService: NbDialogService,
    private route: ActivatedRoute, private datePipe: DatePipe, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.parent.parent.parent.paramMap.subscribe((routeparams) => {
      //console.log(routeparams.get('userId'));
      this.userId = routeparams.get('userId');
      if(this.userId) {
        this.getListOfAssignedAssets();
      }
    });
    this.intializaDataTable();
    this.getAssignStatus();
  }

  intializaDataTable() {
    this.settings = {
      actions: null,
      columns: {
        assetId: {
          title: 'Asset Id'
        },
        assetCategory: {
          title: 'Asset Category'
        },
        assetBrand: {
          title: 'Asset Brand'
        },
        serialNo: {
          title: 'Serial Number'
        },
        dateAssigned: {
          title: 'Assigned Date'
        },
        dateRetured: {
          title: 'Return Date'
        },
        employeeCode: {
          title: 'Emp Code',
          type: 'custom',
          renderComponent: ButtonViewComponent,
          onComponentInitFunction(instance) {
            instance.save.subscribe(row => {
             // console.log(row.empId);
            });
          }
        },
        emailAddress: {
          title: 'Email',
          type: 'custom',
          renderComponent: ButtonViewComponent,
          onComponentInitFunction(instance) {
            instance.save.subscribe(row => {
              //console.log(row.empId);
            });
          }
        }
      }
    };

    this.unassignedSettings = {
      actions: null,
      columns: {
        assetId: {
          title: 'Asset Id'
        },
        assetCategory: {
          title: 'Asset Category'
        },
        assetBrand: {
          title: 'Asset Brand'
        },
        serialNo: {
          title: 'Serial Number'
        },
        createdDate: {
          title: 'Added Date'
        }
      }
    };
  }

  changeTab(event) {
    //console.log(event.tabTitle);
    //this.loading = true;
    if(event.tabTitle === 'UnAssigned') {
      this.getListOfUnAssignedAssets();
    } else if(event.tabTitle === 'Assigned') {
      this.getListOfAssignedAssets();
    }
  }

  getAssignStatus() {
    this.assetService.getAssignStatus(this.userId).then((data: IAssignStatus[]) => {
      //console.log(data);
      this.assignStatuses = data;
    })
  }

  getListOfAssignedAssets() {
    this.assetService.getListOfAssignedAssets(this.userId).then((data: any) => {
      //console.log(data);
      if(data.message === 'success') {
        const modified = data.assets.map((asset) => ({
          ...asset, 
          dateAssigned: this.datePipe.transform(asset.dateAssigned, ApplicationConstants.dateFormat),
          dateRetured: this.datePipe.transform(asset.dateRetured, ApplicationConstants.dateFormat),
          employeeCode: asset.employeeDetails ? `${asset.employeeDetails.employeeCode}` : '',
          emailAddress: asset.employeeDetails ? `${asset.employeeDetails.emailAddress}` : '',
          assetCategory: asset.assetcategory ? `${asset.assetcategory.assetCategory}` : '',
          userId: this.userId
        }));
        this.assetList = Object.assign([], modified);
        this.loading = false;
      }
    })
  }

  getListOfUnAssignedAssets() {
    this.assetService.getListOfUnAssignedAssets(this.userId).then((data: any) => {
      if(data.message === 'success') {
        //console.log(data);
        const modified = data.assets.map((asset) => ({
          ...asset, 
          assetCategory: asset.assetcategory ? `${asset.assetcategory.assetCategory}` : '',
          createdDate: this.datePipe.transform(asset.createdDate, ApplicationConstants.dateFormat),
          userId: this.userId
        }));
        this.unAssignedList = Object.assign([], modified);
        this.loading = false;
      }
    })
  }

  showAssetDetails(event) {
    //console.log(event);
    if(event && event.data) {
      this.selectedAssetDetails = event.data;
      const asset = event.data;
      this.assetForm = this.fb.group({
        assetCat: [asset.assetCategory],
        assetBrand: [asset.assetBrand],
        assignStatus: [asset.assignStatus],
        //TODO: Check why asset desc is not coming from backend
        assetDesc: [''],
        serialNo: [asset.serialNo],
        dateAssigned: [asset.dateAssigned],
        dateRetured: [asset.dateRetured ? asset.dateRetured : ''],
        comments: [asset.comments],
        empId: [asset.empId],
        displayText: [`${asset.employeeCode ? asset.employeeCode : ''}`]
      });
      this.showAssetDialog();
    }
  }

  showAssetDialog() {
    this.dialogRef = this.dialogService.open(this.dialog, { closeOnBackdropClick: false, closeOnEsc: false, hasBackdrop: true });
  }

  closeDialog(event) {
    //console.log('test');
    this.dialogRef.close();
    if(event.refetch) {
      this.getListOfAssignedAssets();
    }
  }

}
