import { TestBed } from '@angular/core/testing';

import { ApijsonService } from './apijson.service';

describe('ApijsonService', () => {
  let service: ApijsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApijsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
