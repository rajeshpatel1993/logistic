import { Component, OnInit } from '@angular/core';
import { IEmployeeList, ISearchEmployeeResponse } from '../../../shared/interfaces/employee-list.interface';
import { employeesList } from '../../../shared/mockData/employee-list.mock';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeListService } from '../../../shared/services/employee-list.service';
import { AppService } from '../../../services/app.service';
import { IEmployee } from '../../../interfaces/employee.interface';

import { NbDialogService } from '@nebular/theme';
import { AddNewEmployeeComponent } from '../add-new-employee/add-new-employee.component';
import { ISearchSuggestions } from '../../../shared/interfaces/common.interface';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employeesList: IEmployee[];
  employeeSuggestions: ISearchSuggestions[] = [];
  userId: string = '1';
  loading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute,
              private employeeListService: EmployeeListService,
              private appService: AppService, private dialogService: NbDialogService) {}

  ngOnInit() {

    console.log("Employee List .......");
    this.route.parent.parent.paramMap.subscribe((routeparams) => {
      console.log(routeparams.get('userId'));
      // this.userId = routeparams.get('userId');
      if(this.userId) {
        console.log(this.employeesList);
        this.getEmployeesList();
      }
    });
  }

  getEmployeesList() {
    this.employeeListService.getEmployeesList(this.userId).then((data: IEmployee[]) => {
      console.log(data);
      this.employeesList = this.employeeListService.displayModify(data);
    });
  }

  searchEmployee(inputText: string) {
    this.loading = true;
    this.employeeListService.searchEmployee(this.userId, inputText).subscribe((data: ISearchEmployeeResponse[]) => {
      console.log(data);
      this.employeeSuggestions = data.map((emp) => ({ displayText: `(${emp.employeeCode}) - ${emp.firstName} ${emp.lastName}`, value: emp.employeeID }));
      this.loading = false;
    })
  }

  onSelectEmployee(employeeId: string) {
    this.goToEditPage(employeeId);
  }

  goToEditPage(employeeId: string) {
    this.router.navigate(['./edit/' +employeeId], { relativeTo: this.route.parent });
  }

  addNewEmployee() {
    this.dialogService.open(AddNewEmployeeComponent, { closeOnBackdropClick: false })
      .onClose.subscribe((data) => {
        console.log(data);
        if(data && data.creation === 'success') {
          this.getEmployeesList();
        }
      });
  }
}
