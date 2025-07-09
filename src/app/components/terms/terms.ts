import { Component } from '@angular/core';
import {Footer} from '../footer/footer';
import {Header} from '../header/header';

@Component({
  selector: 'app-terms',
  imports: [Header , Footer],
  templateUrl: './terms.html',
  styleUrl: './terms.css'
})
export class Terms {

}
