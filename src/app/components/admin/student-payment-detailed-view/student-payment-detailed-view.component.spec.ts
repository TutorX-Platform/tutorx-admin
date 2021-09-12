import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPaymentDetailedViewComponent } from './student-payment-detailed-view.component';

describe('StudentPaymentDetailedViewComponent', () => {
  let component: StudentPaymentDetailedViewComponent;
  let fixture: ComponentFixture<StudentPaymentDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentPaymentDetailedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPaymentDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
