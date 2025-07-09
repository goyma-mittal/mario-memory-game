import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';  // adjust path as needed
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-register',
 imports: [CommonModule, ReactiveFormsModule, Header, Footer],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  errorMsg = '';
  registerForm;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit() {
    if (this.registerForm.valid) {
      // Type assertion to fix type mismatch
      const formValue = this.registerForm.value as { username: string; email: string; password: string };

      this.authService.register(formValue).subscribe({
        next: () => this.router.navigate(['/login']),
        error: err => this.errorMsg = err.error?.message || 'Registration failed.'
      });
    }
  }
}
