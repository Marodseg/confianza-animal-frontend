import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
