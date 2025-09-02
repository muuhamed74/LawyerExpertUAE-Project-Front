import { Component } from '@angular/core';
<<<<<<< HEAD
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
=======
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
>>>>>>> upstream/master
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
<<<<<<< HEAD
  styleUrl: './register.component.css'
=======
  styleUrls: ['./register.component.css']
>>>>>>> upstream/master
})
export class RegisterComponent {
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

<<<<<<< HEAD
=======
  // تعريف الـ FormGroup مع validator صحيح
>>>>>>> upstream/master
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
<<<<<<< HEAD
  }, this.confirmPassword);

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  registerSubmit() {
=======
  }, { validators: RegisterComponent.passwordMatchValidator() });

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  // الـ static validator method
  static passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const rePassword = formGroup.get('rePassword')?.value;
      return password === rePassword ? null : { mismatch: true };
    };
  }

  // ارسال البيانات للتسجيل
  registerSubmit() {
    if (this.registerForm.invalid) return;

>>>>>>> upstream/master
    this.isLoading = true;

    this._AuthService.sendRegister(this.registerForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
<<<<<<< HEAD
        console.log(response);

        // هنا الـ API هترجع غالباً رسالة زي "OTP sent to email/phone"
        this.successMessage = response.message || 'OTP has been sent';

        // نودي اليوزر لصفحة إدخال الكود، ونبعث الإيميل أو الموبايل
        this._Router.navigate(['/verify'], { queryParams: { email: this.registerForm.value.email } });
      },
      error: (err) => {
        console.error(err);
=======
        this.successMessage = response.message || 'OTP has been sent';
        this._Router.navigate(['/verify'], { queryParams: { email: this.registerForm.value.email } });
      },
      error: (err) => {
>>>>>>> upstream/master
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Registration failed. Please try again.';
      }
    });
  }
<<<<<<< HEAD

  confirmPassword(g: any) {
    return g.get('password').value === g.get('rePassword').value
      ? null
      : { mismatch: true };
  }
=======
>>>>>>> upstream/master
}
