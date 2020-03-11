import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemaindersReportComponent } from './remainders-report.component';

describe('RemaindersReportComponent', () => {
  let component: RemaindersReportComponent;
  let fixture: ComponentFixture<RemaindersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemaindersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemaindersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
