import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private apiUrl = 'https://mario-memory-backend-x5y8.onrender.com/api/users';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUserProfile(userId: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

completeLevel(userId: string, levelNumber: number, timeTaken: number): Observable<User> {
  const url = `${this.apiUrl}/${userId}/complete-level?levelNumber=${levelNumber}&timeTaken=${timeTaken}`;

  return this.http.post<User>(url, {}).pipe(
    tap((updatedUser: User) => {
      // Update localStorage with the refreshed user
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    })
  );
}

  getLeaderboard(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/leaderboard`);
  }
}
