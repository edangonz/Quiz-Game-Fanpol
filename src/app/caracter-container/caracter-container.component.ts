import { Component, OnInit } from '@angular/core';
import { ManageSytemQuizService } from '../services/manage-sytem-quiz.service';

import { showMoveCaracter } from '../animations/showUp.animation';

@Component({
  selector: 'app-caracter-container',
  templateUrl: './caracter-container.component.html',
  styleUrls: ['./caracter-container.component.scss'],
  animations: [
    showMoveCaracter
  ]
})
export class CaracterContainerComponent implements OnInit {

  constructor(
    public ManageService: ManageSytemQuizService
  ) { }

  ngOnInit(): void {
  }

}
