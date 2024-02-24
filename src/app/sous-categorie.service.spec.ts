import { TestBed } from '@angular/core/testing';

import { SousCategorieService } from './sous-categorie.service';

describe('SousCategorieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SousCategorieService = TestBed.get(SousCategorieService);
    expect(service).toBeTruthy();
  });
});
