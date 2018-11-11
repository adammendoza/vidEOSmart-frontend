import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';

import { LocalStorageService } from 'ngx-store';

import { environment } from '../../environments/environment';

import { User } from '../models/user';
import { Session } from '../models/session';

@Injectable({ providedIn: 'root' })
export class EosService {
  // Observable navItem source
  private _navItemUsername = new BehaviorSubject<string>(null);
  private _navItemRoleId = new BehaviorSubject<string>('0');

  // Observable navItem stream
  navItemUsername$ = this._navItemUsername.asObservable();
  navItemRoleId$ = this._navItemRoleId.asObservable();

  user: User;
  eosAPIUrl: string = environment.API_URL;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {}

  pushNavUsername(username) {
    this._navItemUsername.next(username);
  }

  pushNavRole(roleId) {
    this._navItemRoleId.next(roleId);
  }

  public getUser(): Observable<User> {
    if (!this.user) {
      this.user = this.localStorageService.get('user');
    }

    const userObservable$ = new Observable<User>(observer => {
      if (this.user) {
        observer.next(this.user);
      }
      observer.complete();
    });

    return userObservable$;
  }

  public setUser(user: User) {
    this.user = user;
    this.pushNavUsername(this.user && this.user.userName ? this.user.userName : null);
    this.localStorageService.set('user', user);
  }

  public getSession(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    return this.httpClient.get<any>(`${this.eosAPIUrl}/session`, { withCredentials: true, headers }).pipe(
      map((response: Response) => {
        if (response) {
          const jsonData = response;
          const tempUser = new User({});
          tempUser.session = new Session(jsonData);
          tempUser.id = tempUser.session.user_id;
          tempUser.userName = tempUser.session.user_name;
          if (!this.user) {
            this.setUser(tempUser);
          }
          return this.user.session;
        } else {
          return throwError('Unauthorized');
        }
      }),
      catchError(e => {
        if (e.status === 401) {
          return throwError('Unauthorized');
        }
      })
    );
  }

  public isUserSessionValid(): Observable<boolean> {
    const _user = this.localStorageService.get('user');
    if (_user == null || _user.id == null) {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    } else {
      return this.getUsername(_user.id).pipe(
        flatMap((user: User) => {
          return new Observable<boolean>(observer => {
            observer.next(true);
            observer.complete();
          });
        }),
        catchError(err => {
          this.setUser(null);
          return new Observable<boolean>(observer => {
            observer.next(false);
            observer.complete();
          });
        })
      );
    }
  }

  public checkUsername(username: string): Observable<any> {
    return this.httpClient.get<any>(`${this.eosAPIUrl}/videosmart/user/${username}`);
  }

  public getAccountByUserName(userName: string): Observable<any> {
    return this.httpClient.get<any>(`${this.eosAPIUrl}/userName/${userName}`);
  }

  public getAccountByUserId(userId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.eosAPIUrl}/userId/${userId}`);
  }

  public registerUser(bodyData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(bodyData);
    return this.httpClient.post<any>(`${this.eosAPIUrl}/register`, body, { headers });
  }

  public login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('redirect', 'false');
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.httpClient.post(`${this.eosAPIUrl}/loginservice`, body.toString(), { headers });
  }

  public getUsername(userId: string): Observable<User> {
    const headers = new HttpHeaders().set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    return this.httpClient.get<any>(`${this.eosAPIUrl}/user/${userId}`, { headers });
  }

  public logout(): Observable<any> {
    this.setUser(null);
    return this.httpClient.get<any>(`${this.eosAPIUrl}/logout`);
  }

  public createSmartContract(body: any): Observable<any> {
    const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    // const headers: new HttpHeaders({
    //   'Access-Control-Allow-Origin': 'http://localhost:4200', // -->Add this line
    //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    //   'Access-Control-Allow-Headers': '*',
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json'
    // });

    return this.httpClient.post<any>(`${this.eosAPIUrl}/smartContract`, body, { headers });
  }

  public getSmartContracts() {
    return this.httpClient.get<any>(`${this.eosAPIUrl}/smartContracts`);
  }
}
