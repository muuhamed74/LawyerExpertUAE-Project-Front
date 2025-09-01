import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  step: number = 1; // 1 => Send OTP | 2 => Verify OTP | 3 => Reset Password
  forgetForm!: FormGroup;
  token: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, private _AuthService: AuthService, private _Router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    // جلب التوكن من التخزين المحلي
    this.token = localStorage.getItem('userToken') || '';
  }

  sendOtp(): void {
  if (this.forgetForm.get('email')?.invalid) return;

  this.loading = true;
  this._AuthService.sendResetOtp(this.forgetForm.value.email).subscribe({
    next: (res) => {
      console.log('OTP Sent:', res);
      this.step = 2;
      this.loading = false;
    },
    error: (err) => {
      console.error('Error sending OTP:', err);
      this.loading = false;
      this.toastr.error('فشل في إرسال OTP، تأكد من البريد الإلكتروني.');
    }
  });
}



  verifyOtp(): void {
  const { email, code } = this.forgetForm.value;
  if (!email || !code) return;

  this.loading = true;
  this._AuthService.verifyOtp(email, code).subscribe({
    next: (res) => {
      console.log('OTP Verified:', res);
      this.step = 3;
      this.loading = false;
    },
    error: (err) => {
      console.error('Error verifying OTP:', err);
      this.loading = false;
      this.toastr.error('رمز OTP غير صحيح.');
    }
  });
}


  resetPassword(): void {
  const { email, code, newPassword, confirmPassword } = this.forgetForm.value;

  if (!newPassword || newPassword !== confirmPassword) {
    this.toastr.error('كلمة المرور غير متطابقة');
    return;
  }

  this.loading = true;
  this._AuthService.resetPassword(email, code, newPassword, confirmPassword).subscribe({
    next: (res) => {
      console.log('Password Reset Successfully:', res);
      this.toastr.success('تم تغيير كلمة المرور بنجاح!✅');
      this.forgetForm.reset();
      this.step = 1;
      this.loading = false;
      this._Router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Error resetting password:', err);
      this.loading = false;
      this.toastr.error('حدث خطأ أثناء إعادة التعيين، حاول مرة أخرى.');
    }
  });
}


}
