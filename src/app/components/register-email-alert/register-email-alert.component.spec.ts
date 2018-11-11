import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmailAlertComponent } from './register-email-alert.component';

describe('RegisterEmailAlertComponent', () => {
  let component: RegisterEmailAlertComponent;
  let fixture: ComponentFixture<RegisterEmailAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterEmailAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEmailAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
