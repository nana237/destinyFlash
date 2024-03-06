import { TestBed } from '@angular/core/testing';

import { DetailPAService } from './detail-p-a.service';

describe('DetailPAService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailPAService = TestBed.get(DetailPAService);
    expect(service).toBeTruthy();
  });
});
