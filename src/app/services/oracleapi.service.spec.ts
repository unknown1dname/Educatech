import { TestBed } from '@angular/core/testing';

import { OracleapiService } from './oracleapi.service';

describe('OracleapiService', () => {
  let service: OracleapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OracleapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
