import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  VehicleExpenseDetailsComponent } from './vehicle-expense-details.component';

describe('VehicleServiceDetailsComponent', () => {
  let component: VehicleExpenseDetailsComponent;
  let fixture: ComponentFixture<VehicleExpenseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleExpenseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleExpenseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
