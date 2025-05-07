import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemeterComponent } from './semeter.component';

describe('SemeterComponent', () => {
  let component: SemeterComponent;
  let fixture: ComponentFixture<SemeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
