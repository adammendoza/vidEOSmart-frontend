import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartcontractItemComponent } from './smartcontract-item.component';

describe('SmartcontractItemComponent', () => {
  let component: SmartcontractItemComponent;
  let fixture: ComponentFixture<SmartcontractItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartcontractItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartcontractItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
