import { Component } from '@angular/core';
import {Footer} from '../footer/footer';
import {Header} from '../header/header';

@Component({
  selector: 'app-instructions',
 imports: [Footer , Header],
  templateUrl: './instruction.html',
  styleUrl: './instruction.css'
})
export class Instruction {

}
