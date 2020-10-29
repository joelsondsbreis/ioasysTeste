
import { environment } from './../../../environments/environment'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  setUser(user: any) {
    throw new Error('Method not implemented.');
  }
  user: any;

  constructor(private http: HttpClient, private jwHelper: JwtHelperService) { }

  async login(user: any) {
    const result = await this.http.post<any>(`${environment.api}auth/sign_in`, user, {observe: 'response'}).toPromise();

    if(result.body.success){
      const authToken = result.headers.get('access-token');
      const client = result.headers.get('client');
      const uid = result.headers.get('uid');
      localStorage.setItem('access-token', authToken);
      localStorage.setItem('success', result.body.success);
      console.log('Resposta do token: ', authToken);
      console.log('Resposta do client', client);
      console.log('Resposta do uid', uid);
      return true;
    }
      return false;
  }

  async getAuthorizationToken() {
    const success = await localStorage.getItem('success');
    return success;
  }

  isTokenExpired(token?: string): boolean {
    return (!token || this.jwHelper.isTokenExpired(token == null ? "" : token))
  }

  async isUserLoggedIn() {
    const token = await this.getAuthorizationToken();
    if (token) {
      return true;
    }

    return false;
  }


  pagina() {
    // pegar no localstorage
    const token = '';
    const headers = new HttpHeaders({
      "access-token": `${token}`,
      Authorization: "Basic YW5ndWxhcjpAbmd1bEByMA=="
  });



  }
}

