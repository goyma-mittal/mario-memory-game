import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  constructor(private router: Router) { }
  onterms() {
    window.location.href = '/terms'
  }

  oninstuctions() {
    window.location.href = '/instructions'
  }
}
