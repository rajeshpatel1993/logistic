import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLComponent } from './employee-l.component';

describe('EmployeeLComponent', () => {
  let component: EmployeeLComponent;
  let fixture: ComponentFixture<EmployeeLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
