import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Level } from '../models/level';

@Injectable({
  providedIn: 'root',
})
export class LevelService {
  private apiUrl = 'https://mario-memory-backend-x5y8.onrender.com/api/levels';

  constructor(private http: HttpClient) { }

  getAllLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(this.apiUrl);
  }

  getLevelById(id: string): Observable<Level> {
    return this.http.get<Level>(`${this.apiUrl}/${id}`);
  }


  getLevelByNumber(id: number): Observable<Level> {
    return this.http.get<Level>(`${this.apiUrl}/number/${id}`);
  }


  getMaxLevelNumber(): Observable<number> {
    return this.getAllLevels().pipe(
      map(levels => {
        const numbers = levels.map(level => level.levelNumber);
        return numbers.length ? Math.max(...numbers) : 0;
      })
    );
  }
}