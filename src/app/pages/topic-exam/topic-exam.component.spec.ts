import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicExamComponent } from './topic-exam.component';

describe('TopicExamComponent', () => {
  let component: TopicExamComponent;
  let fixture: ComponentFixture<TopicExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
