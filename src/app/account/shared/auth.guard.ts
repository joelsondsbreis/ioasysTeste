import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.accountService.isUserLoggedIn().then(
      result => {
        if (result) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
    );
  }
}
