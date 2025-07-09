import { Component } from '@angular/core';
import { Router ,RouterOutlet ,NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 title = 'mario-memory-game';
     ngOnInit(): void {}
 
}
