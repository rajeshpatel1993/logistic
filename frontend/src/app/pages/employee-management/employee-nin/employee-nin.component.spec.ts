import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNinComponent } from './employee-nin.component';

describe('EmployeeNinComponent', () => {
  let component: EmployeeNinComponent;
  let fixture: ComponentFixture<EmployeeNinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeNinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
