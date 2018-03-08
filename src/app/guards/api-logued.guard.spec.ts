import { TestBed, async, inject } from '@angular/core/testing';

import { ApiLoguedGuard } from './api-logued.guard';

describe('ApiLoguedGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiLoguedGuard]
    });
  });

  it('should ...', inject([ApiLoguedGuard], (guard: ApiLoguedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
