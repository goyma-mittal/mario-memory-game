import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service'; // adjust path if needed
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, Header, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  errorMsg = '';
  loginForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }



  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value as { email: string; password: string };

      this.authService.login(formValue.email, formValue.password).subscribe({
        next: () =>

          window.location.href = '/home'

        ,
        error: err => this.errorMsg = err.error?.message || 'Login failed. Please try again.',
      });
    }

  }
}