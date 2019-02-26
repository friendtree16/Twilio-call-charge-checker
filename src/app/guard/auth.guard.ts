import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private loginService: LoginService) {}

  canActivate() {
      if (this.loginService.getAccountSid() == '' || this.loginService.getAccessToken() == '') {
        this.router.navigate(['/login']);
        return false;
      }
      
      return true;
  }
}
