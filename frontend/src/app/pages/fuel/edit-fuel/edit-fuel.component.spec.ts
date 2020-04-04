import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFuelComponent } from './edit-fuel.component';

describe('EditFuelComponent', () => {
  let component: EditFuelComponent;
  let fixture: ComponentFixture<EditFuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
