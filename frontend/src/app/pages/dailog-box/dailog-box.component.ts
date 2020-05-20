import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-dailog-box',
  templateUrl: './dailog-box.component.html',
  styleUrls: ['./dailog-box.component.scss']
})
export class DailogBoxComponent implements OnInit {

  constructor() { }
  @Input() msgObj: any;
  dialogBox:boolean = false;
  @Output() messageToEmit = new EventEmitter<string>();
  showDialog:string = 'false';

  ngOnInit() {
    //(this.msgObj);
  }

  showDialogF(){
    this.messageToEmit.emit(this.showDialog)
  }

}
