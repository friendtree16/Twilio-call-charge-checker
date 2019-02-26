import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  accountSid = '';
  accessToken = '';

  constructor() { }

  setAccountSid(accountSid: string) {
    this.accountSid = accountSid;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  getAccountSid(): string {
    return this.accountSid;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

}
