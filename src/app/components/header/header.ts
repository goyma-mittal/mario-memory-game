import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { User } from '../../models/user';
import {CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
   imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header{
 currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {
   this.currentUser = this.authService.getCurrentUser();

  }

  logout(): void {
    this.authService.logout();
  window.location.href = '/home';
  }


  toleaderboard()
  {
      window.location.href = '/leaderboard';
  }
}
