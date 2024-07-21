import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityExamNewComponent } from './capacity-exam-new.component';

describe('CapacityExamNewComponent', () => {
  let component: CapacityExamNewComponent;
  let fixture: ComponentFixture<CapacityExamNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityExamNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityExamNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
