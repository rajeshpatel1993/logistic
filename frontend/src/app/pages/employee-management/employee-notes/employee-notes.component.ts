import { Component, OnInit, Input } from '@angular/core';
import { INotesTab } from '../../../interfaces/employee.interface';

@Component({
  selector: 'app-employee-notes',
  templateUrl: './employee-notes.component.html',
  styleUrls: ['./employee-notes.component.css']
})
export class EmployeeNotesComponent implements OnInit {
  @Input() notesData: INotesTab[];
  constructor() { }

  ngOnInit() {
  }

}
