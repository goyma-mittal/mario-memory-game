import { Injectable } from '@angular/core';
import { Level } from '../models/level';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private timerInterval: any;
  private timeElapsed = 0;

  constructor() {}

  // Timer logic
  startTimer(callback: (seconds: number) => void): void {
    this.resetTimer();
    this.timerInterval = setInterval(() => {
      this.timeElapsed++;
      callback(this.timeElapsed);
    }, 1000);
  }

  pauseTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  resetTimer(): void {
    this.pauseTimer();
    this.timeElapsed = 0;
  }

  getTimeElapsed(): number {
    return this.timeElapsed;
  }

  // Calculate stars earned based on thresholds and time taken
  calculateStars(level: Level, timeTaken: number): number {
    const thresholds = level.starThresholds;
    const sortedStars = Object.keys(thresholds)
      .map(Number)
      .sort((a, b) => b - a); // Sort 3 → 2 → 1

    for (const stars of sortedStars) {
      if (timeTaken <= thresholds[stars]) {
        return stars;
      }
    }

    return 0; // Took too long
  }


}
