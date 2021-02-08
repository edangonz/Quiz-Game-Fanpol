import { Component, OnInit } from '@angular/core';
import { ManageSytemQuizService } from '../services/manage-sytem-quiz.service';

import { showMove } from '../animations/showUp.animation';

@Component({
  selector: 'app-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.scss'],
  animations: [
    showMove
  ]
})
export class QuestionsContainerComponent implements OnInit {

  constructor(
    public ManageService: ManageSytemQuizService
  ) { }

  ngOnInit(): void {
  }

}
