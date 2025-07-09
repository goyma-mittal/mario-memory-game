import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Level } from '../../models/level';
import { LevelService } from '../../services/level-service';
import { ImagesService } from '../../services/images-service';
import { GameService } from '../../services/game-service';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [Header ,Footer, CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game implements OnInit {
  levelId!: number;
  level!: Level;
  timer = 0;
  matchedCards = 0;
  cardsArray: { name: string; img: string }[] = [];
  gameGrid: { name: string; img: string }[] = [];
  rows = 0;
  cols = 0;
  cardSize = '100px'; 
showWinModal = false;
  starsEarned = 0;

  private firstGuess = '';
  private secondGuess = '';
  private clickCount = 0;
  private previousTarget: HTMLElement | null = null;
  private delay = 600;

  constructor(
    private route: ActivatedRoute,
    private levelService: LevelService,
    private imageService: ImagesService,
    private gameService: GameService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.levelId = Number(this.route.snapshot.paramMap.get('levelId'));
    this.levelService.getLevelByNumber(this.levelId).subscribe(level => {
      this.level = level;
      this.cardsArray = this.imageService.Images;
      this.calculateGridLayout();
      this.startGame();
      this.startTimer();
    });

    window.addEventListener('resize', () => this.calculateGridLayout());
  }

  startTimer() {
    this.gameService.startTimer(time => {
      this.timer = time;
    });
  }

  calculateGridLayout() {
    const total = this.level?.gridSize || 64;
    this.rows = Math.floor(Math.sqrt(total));
    this.cols = Math.ceil(total / this.rows);
    console.log(total);
    console.log('rows ', this.rows);
    console.log('cols ', this.cols);
    const containerHeight = window.innerHeight * 1.9;
    const containerWidth = window.innerWidth * 0.9;

    const maxCardHeight = (containerHeight / this.rows) * 0.9;
    const maxCardWidth = (containerWidth / this.cols) * 1;

  
    const cardheight = Math.floor(Math.min(maxCardHeight, 50)) - 0.9;
    const cardwidth = Math.floor(Math.min(maxCardWidth, 50)) - 0.9;
    document.documentElement.style.setProperty('--card-height', `${cardheight}px`);
    document.documentElement.style.setProperty('--card-width', `${cardwidth}px`);
  }

  generateCards(): void {
    const shuffled = this.cardsArray.sort(() => 0.5 - Math.random());
    const pairs = shuffled.slice(0, this.level.gridSize / 2);
    this.gameGrid = [...pairs, ...pairs].sort(() => 0.5 - Math.random());
  }

  startGame(): void {
    this.generateCards();
  }

  onCardClick(event: Event): void {
    const card = (event.currentTarget as HTMLElement) || null;
    if (
      !card ||
      card === this.previousTarget ||
      card.classList.contains('selected') ||
      card.classList.contains('match')
    ) {
      return;
    }

    if (this.clickCount < 2) {
      this.clickCount++;

      if (this.clickCount === 1) {
        this.firstGuess = card.dataset['name'] || '';
        card.classList.add('selected');
      } else {
        this.secondGuess = card.dataset['name'] || '';
        card.classList.add('selected');

        if (this.firstGuess && this.secondGuess) {
          if (this.firstGuess === this.secondGuess) {
            setTimeout(() => this.markAsMatched(), this.delay);
          }
          setTimeout(() => this.resetGuesses(), this.delay);
        }
      }

      this.previousTarget = card;
    }
  }

   markAsMatched(): void {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => card.classList.add('match'));
    this.matchedCards += 2;

    if (this.matchedCards === this.gameGrid.length) {
      this.gameService.pauseTimer();
      if (typeof this.gameService.calculateStars === 'function') {
        this.starsEarned = this.gameService.calculateStars(this.level, this.timer);
      } else {
        this.starsEarned = 3;
      }
      this.showWinModal = true;
      this.saveLevelProgress();
    }
  }

  resetGuesses(): void {
    this.firstGuess = '';
    this.secondGuess = '';
    this.clickCount = 0;
    this.previousTarget = null;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => card.classList.remove('selected'));
  }

  saveLevelProgress(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userService
        .completeLevel(currentUser.id, this.level.levelNumber, this.timer)
        .subscribe();
    }
  }

  nextLevel(): void {
    this.showWinModal = false;
    this.router.navigate(['/levels']);
  }
}