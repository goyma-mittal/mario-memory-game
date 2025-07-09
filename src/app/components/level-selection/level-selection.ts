import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level-service';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { Level } from '../../models/level';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';


@Component({
  selector: 'app-level-selection',
  imports: [CommonModule, Header, Footer],
  templateUrl: './level-selection.html',
  styleUrl: './level-selection.css'
})


export class LevelSelection implements OnInit {
  levels: Level[] = [];
  currentUser: User | null = null;
  unlockedLevelNumbers: number[] = [];

  constructor(
    private levelService: LevelService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }

    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);

    this.levelService.getAllLevels().subscribe(levels => {
      this.levels = levels.sort((a, b) => a.levelNumber - b.levelNumber);
      console.log('Levels:', this.levels);
      this.updateLevelLockStatus();
    });
  }

  updateLevelLockStatus(): void {
    const prevUnlocked = JSON.parse(localStorage.getItem('unlockedLevels') || '[]') as number[];
    const newUnlocked: number[] = [];

    this.levels.forEach(level => {
      if (level.levelNumber === 1) {
        level.isLocked = false;
      } else {
        level.isLocked = !this.currentUser?.completedLevels.includes(level.levelNumber - 1);
      }

      // If this level is unlocked now but wasn't before → animate
      if (!level.isLocked && !prevUnlocked.includes(level.levelNumber)) {
        newUnlocked.push(level.levelNumber);
      }
    });

    this.unlockedLevelNumbers = newUnlocked;

    // Update stored list for next page load
    const currentlyUnlocked = this.levels.filter(l => !l.isLocked).map(l => l.levelNumber);
    localStorage.setItem('unlockedLevels', JSON.stringify(currentlyUnlocked));
  }

  selectLevel(level: Level): void {
    if (!level.isLocked) {
      this.router.navigate(['/game', level.levelNumber]);
    }
  }

  getStars(levelNumber: number): number {
    return this.currentUser?.starsEarned?.[levelNumber] || 0;
  }

  getStarsArray(levelNumber: number): number[] {
    const stars = this.getStars(levelNumber);
    return [1, 2, 3].map(n => (n <= stars ? 1 : 0));
  }

  shouldAnimate(level: Level): boolean {
    return this.unlockedLevelNumbers.includes(level.levelNumber);
  }
}