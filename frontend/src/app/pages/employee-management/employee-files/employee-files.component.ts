import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAttachementTab } from '../../../interfaces/employee.interface';
import { ApplicationConstants } from '../../../constants/appUrls';
import { FileUploadService } from '../../../services/file-upload.service';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-employee-files',
  templateUrl: './employee-files.component.html',
  styleUrls: ['./employee-files.component.css']
})
export class EmployeeFilesComponent implements OnInit {
  @Input() needEditDelete: boolean = false;
  @Input() attachmentsData: IAttachementTab;
  @Output() editDocumentClicked = new EventEmitter<string>();
  @Output() deleteDocumentClicked = new EventEmitter<string>();
  attachments: string[];
  dialogRef: any = null;
  
  constructor(private fileUploadService: FileUploadService, private dialogService: NbDialogService) { }

  ngOnInit() {
    this.attachments = ApplicationConstants.Attachments;
  }

  editDocument(selectedDocument) {
    this.editDocumentClicked.emit(selectedDocument);
  }

  deleteDocument(selectedDocument) {
    this.deleteDocumentClicked.emit(selectedDocument);
  }

  getDocument(selectedDocument: string) {
    if(selectedDocument.startsWith('http')) {
      window.open(selectedDocument, '_blank');
    } else {
      //HACK: If url construction is changed, then this needs to be changed.
      const filePath = selectedDocument.split('/')[1];
      this.openDialog();
      this.fileUploadService.getFile(filePath).then((url: string) => {
        //console.log(url);
        this.closeDialog();
        window.open(url, '_blank');
      }).catch((err) => {
        this.closeDialog();
        console.log(err);
      })
    }
  }

  openDialog() {
    this.dialogRef = this.dialogService.open(SpinnerComponent, { hasBackdrop: true });
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }

}
