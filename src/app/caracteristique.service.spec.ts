import { TestBed } from '@angular/core/testing';

import { CaracteristiqueService } from './caracteristique.service';

describe('CaracteristiqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaracteristiqueService = TestBed.get(CaracteristiqueService);
    expect(service).toBeTruthy();
  });
});
