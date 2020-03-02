import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseVehicleComponent } from './expense-vehicle.component';

describe('ExpenseVehicleComponent', () => {
  let component: ExpenseVehicleComponent;
  let fixture: ComponentFixture<ExpenseVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
