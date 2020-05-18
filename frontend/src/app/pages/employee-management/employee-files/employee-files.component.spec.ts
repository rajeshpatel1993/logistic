import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFilesComponent } from './employee-files.component';

describe('EmployeeFilesComponent', () => {
  let component: EmployeeFilesComponent;
  let fixture: ComponentFixture<EmployeeFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
