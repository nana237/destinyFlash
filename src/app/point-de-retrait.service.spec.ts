import { TestBed } from '@angular/core/testing';

import { PointDeRetraitService } from './point-de-retrait.service';

describe('PointDeRetraitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PointDeRetraitService = TestBed.get(PointDeRetraitService);
    expect(service).toBeTruthy();
  });
});
