import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVehicleReportsComponent } from './assign-vehicle-reports.component';

describe('AssignVehicleReportsComponent', () => {
  let component: AssignVehicleReportsComponent;
  let fixture: ComponentFixture<AssignVehicleReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignVehicleReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignVehicleReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
