import { TestBed } from '@angular/core/testing';

import { SciCalculatorService } from './sci-calculator.service';

describe('SciCalculatorService', () => {
  let service: SciCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SciCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
