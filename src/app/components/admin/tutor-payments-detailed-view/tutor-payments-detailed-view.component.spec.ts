import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPaymentsDetailedViewComponent } from './tutor-payments-detailed-view.component';

describe('TutorPaymentsDetailedViewComponent', () => {
  let component: TutorPaymentsDetailedViewComponent;
  let fixture: ComponentFixture<TutorPaymentsDetailedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorPaymentsDetailedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPaymentsDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
