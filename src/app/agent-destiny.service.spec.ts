import { TestBed } from '@angular/core/testing';

import { AgentDestinyService } from './agent-destiny.service';

describe('AgentDestinyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentDestinyService = TestBed.get(AgentDestinyService);
    expect(service).toBeTruthy();
  });
});
