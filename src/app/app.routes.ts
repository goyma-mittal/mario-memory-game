import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { LevelSelection } from './components/level-selection/level-selection';
import { Game } from './components/game/game';
import { Instruction } from './components/instruction/instruction';
import { Terms } from './components/terms/terms';
import { Leaderboard } from './components/leaderboard/leaderboard';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: 'levels', component: LevelSelection, canActivate: [AuthGuard] },

  { path: 'game/:levelId', component: Game, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: Leaderboard },
  { path: 'instructions', component: Instruction },

  { path: 'terms', component: Terms },

  // Wildcard route for a 404 page or redirect to home
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
