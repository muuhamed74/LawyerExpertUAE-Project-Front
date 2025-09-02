import { jwtDecode } from 'jwt-decode';
<<<<<<< HEAD
import { HttpClient, HttpHeaders } from '@angular/common/http';
=======
import { HttpClient } from '@angular/common/http';
>>>>>>> upstream/master
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Environment } from '../../Base/environment/environment';
<<<<<<< HEAD
import { LoginComponent } from '../pages/login/login.component';
=======
>>>>>>> upstream/master

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
  userData: BehaviorSubject<any> = new BehaviorSubject(null)
  constructor(private _HttpClient: HttpClient, private _Router: Router, @Inject(PLATFORM_ID) private platForm: object) {
    if (isPlatformBrowser(platForm)) {
      if (localStorage.getItem("userToken")) {
        console.log("hello from service");
        this.userInfo()
=======
  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    @Inject(PLATFORM_ID) private platForm: object
  ) {
    if (isPlatformBrowser(this.platForm)) {
      const token = localStorage.getItem("userToken");
      if (token) {
        this.userInfo();
>>>>>>> upstream/master
      }
    }
  }

  // Register and Verify and resendCode
  sendRegister(data: any): Observable<any> {
<<<<<<< HEAD
    return this._HttpClient.post(`${Environment.baseUrl}/api/Accounts/SignUp`, data)
=======
    return this._HttpClient.post(`${Environment.baseUrl}/api/Accounts/SignUp`, data);
>>>>>>> upstream/master
  }

  verifyCode(data: any): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/Accounts/signup/verify?email=${data.email}&code=${data.code}`,
      {}
    );
  }

<<<<<<< HEAD

=======
>>>>>>> upstream/master
  resendCode(data: any): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/Accounts/signup/resend?email=${data.email}`,
      {}
    );
  }

<<<<<<< HEAD





  sendLogin(data: LoginComponent): Observable<any> {
    return this._HttpClient.post(`${Environment.baseUrl}/api/Accounts/login`, data)
  }

  userInfo() {
    this.userData.next(jwtDecode(JSON.stringify(localStorage.getItem("userToken"))));
    console.log(this.userData.getValue());
  }




  signout() {
    localStorage.removeItem("userToken")
    this.userData.next(null)
    this._Router.navigate(['/login'])
  }





=======
  sendLogin(data: { email: string; password: string }): Observable<any> {
    return this._HttpClient.post(`${Environment.baseUrl}/api/Accounts/login`, data);
  }

  userInfo() {
    const token = localStorage.getItem("userToken");
    if (token) {
      this.userData.next(jwtDecode(token));
      console.log(this.userData.getValue());
    }
  }

  signout() {
    localStorage.removeItem("userToken");
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }

>>>>>>> upstream/master
  sendResetOtp(email: string): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/Accounts/password/send-otp`,
      { email }
    );
  }

  verifyOtp(email: string, code: string): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/Accounts/password/verify-otp`,
<<<<<<< HEAD
      { email, code },
    );
  }


  resetPassword(email: string, code: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/Accounts/password/reset`,
      { email, code, newPassword, confirmPassword },
    );
  }

=======
      { email, code }
    );
  }

  resetPassword(email: string, code: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/Accounts/password/reset`,
      { email, code, newPassword, confirmPassword }
    );
  }
>>>>>>> upstream/master
}
