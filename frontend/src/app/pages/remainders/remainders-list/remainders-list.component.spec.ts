import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemaindersListComponent } from './remainders-list.component';

describe('RemaindersListComponent', () => {
  let component: RemaindersListComponent;
  let fixture: ComponentFixture<RemaindersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemaindersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemaindersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
