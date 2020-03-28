import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRemaindersComponent } from './edit-remainders.component';

describe('EditRemaindersComponent', () => {
  let component: EditRemaindersComponent;
  let fixture: ComponentFixture<EditRemaindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRemaindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRemaindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
