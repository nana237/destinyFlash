import { TestBed } from '@angular/core/testing';

import { DetailCommandeService } from './detail-commande.service';

describe('DetailCommandeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailCommandeService = TestBed.get(DetailCommandeService);
    expect(service).toBeTruthy();
  });
});
