import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { User } from '../../models/user';

@Component({
  selector: 'app-leaderboard',
   imports: [CommonModule, Header, Footer],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css'
})
export class Leaderboard implements OnInit {
  leaderboard: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getLeaderboard().subscribe(users => {
      // Sort users by total stars earned
      this.leaderboard = users.sort((a, b) => this.totalStars(b) - this.totalStars(a));
    });
  }

  totalStars(user: User): number {
    return Object.values(user.starsEarned || {}).reduce((sum, stars) => sum + stars, 0);
  }

  levelsCompleted(user: User): number {
    return user.completedLevels?.length || 0;
  }
}