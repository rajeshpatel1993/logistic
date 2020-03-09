import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AadRemaindersComponent } from './aad-remainders.component';

describe('AadRemaindersComponent', () => {
  let component: AadRemaindersComponent;
  let fixture: ComponentFixture<AadRemaindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AadRemaindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AadRemaindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
