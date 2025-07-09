import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import {CommonModule} from '@angular/common';
import {  Header} from '../header/header';
import {  Footer} from '../footer/footer';

@Component({
  selector: 'app-home',
imports: [CommonModule,Header ,Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
 currentUser: User | null = null;
  totalLevelsPlayed = 0;
  totalStarsEarned = 0;

    constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

    ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      // Calculate total completed levels and stars earned
      this.totalLevelsPlayed = this.currentUser.completedLevels.length;

      this.totalStarsEarned = Object.values(this.currentUser.starsEarned).reduce(
        (sum, stars) => sum + stars,
        0
      );
    }
  }

   onLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onPlay() {
    this.router.navigate(['/levels']);
  } 
}
