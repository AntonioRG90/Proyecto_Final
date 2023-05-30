import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginOkGuard } from './login-ok.guard';

describe('loginOkGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginOkGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
