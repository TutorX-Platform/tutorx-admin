import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTutorsComponent } from './manage-tutors.component';

describe('ManageTutorsComponent', () => {
  let component: ManageTutorsComponent;
  let fixture: ComponentFixture<ManageTutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTutorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
