import { TestBed } from '@angular/core/testing';
import { DbService } from 'src/app/services/db.service';


describe('DbService', () => {
  let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
