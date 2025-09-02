import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
<<<<<<< HEAD
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = ''
  isLoading: boolean = false

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
  })


=======
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required, 
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    ]),
  });
>>>>>>> upstream/master

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  loginSubmit() {
<<<<<<< HEAD
    this.isLoading = true
    // console.log(this.loginForm.value)
    this._AuthService.sendLogin(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false
        console.log(res);
        localStorage.setItem("userToken", res.token)

        this._AuthService.userInfo()

        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false
        this.errorMessage = err.error.message || "login failed. Please try again.";
      }
    })


  }


=======
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    this.isLoading = true;

    this._AuthService.sendLogin(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        localStorage.setItem("userToken", res.token);
        this._AuthService.userInfo();
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || "Login failed. Please try again.";
      }
    });
  }
>>>>>>> upstream/master
}
