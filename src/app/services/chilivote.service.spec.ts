import { TestBed } from '@angular/core/testing';

import { ChilivoteService } from './chilivote.service';

describe('ChilivoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChilivoteService = TestBed.get(ChilivoteService);
    expect(service).toBeTruthy();
  });
});
