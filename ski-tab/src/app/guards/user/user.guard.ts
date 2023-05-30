import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UsersService } from 'src/app/services/users/users.service';
import { map } from 'rxjs';

export const userGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const usersService = inject(UsersService);
  const router = inject(Router);
  const jwt = inject(JwtHelperService);

  let userToken = cookieService.get('accessToken');
  let user = jwt.decodeToken(userToken);

  return usersService.getUser(user.user_id).pipe(
    map(snap => {
      let userFromDB = usersService.snapIntoUser(snap); 
      if(userFromDB.isActive){
        return true;
      }else{
        router.navigate(['/login']);
        return false;
      }
    })
  )

  
};



