import { CanActivateFn } from '@angular/router';

export const loginOkGuard: CanActivateFn = (route, state) => {
  return true;
};
