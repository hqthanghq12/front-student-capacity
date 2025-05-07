import { TestBed } from '@angular/core/testing';

import { PlaytopicServiceService } from './playtopic-service.service';

describe('PlaytopicServiceService', () => {
  let service: PlaytopicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaytopicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
