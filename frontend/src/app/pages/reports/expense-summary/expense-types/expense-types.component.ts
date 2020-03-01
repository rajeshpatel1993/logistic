import { Component, OnInit, Input } from '@angular/core';
import { VehicleExpenseService } from '../../../vehicle-expense/vehicleexpense.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-expense-types',
  templateUrl: './expense-types.component.html',
  styleUrls: ['./expense-types.component.scss']
})
export class ExpenseTypesComponent implements OnInit {
  @Input() expenseTypeId:String;
  expenseTypeName:String = "";
  constructor(private expenseService: VehicleExpenseService) { }

  expenseTypeSubscription: Subscription;
  ngOnInit() {
    this.loadExpenseTypeName(this.expenseTypeId);
  }

  loadExpenseTypeName(expenseTypeId){
    this.expenseTypeSubscription = this.expenseService.getExpenseTypename(expenseTypeId).subscribe((da)=>{
      this.expenseTypeName = da["data"].expenseType;

    },(err)=>{

    });
  }

}
