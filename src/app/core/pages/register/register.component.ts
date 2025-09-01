import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.confirmPassword);

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  registerSubmit() {
    this.isLoading = true;

    this._AuthService.sendRegister(this.registerForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response);

        // هنا الـ API هترجع غالباً رسالة زي "OTP sent to email/phone"
        this.successMessage = response.message || 'OTP has been sent';

        // نودي اليوزر لصفحة إدخال الكود، ونبعث الإيميل أو الموبايل
        this._Router.navigate(['/verify'], { queryParams: { email: this.registerForm.value.email } });
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Registration failed. Please try again.';
      }
    });
  }

  confirmPassword(g: any) {
    return g.get('password').value === g.get('rePassword').value
      ? null
      : { mismatch: true };
  }
}
