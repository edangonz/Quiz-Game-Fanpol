import { Component, Input, OnInit } from '@angular/core';

import { showUpStagger } from '../animations/showUp.animation';

import { ManageSytemQuizService } from '../services/manage-sytem-quiz.service';

@Component({
  selector: 'app-anwers-container',
  templateUrl: './anwers-container.component.html',
  styleUrls: ['./anwers-container.component.scss'],
  animations: [
    showUpStagger,
  ]
})
export class AnwersContainerComponent implements OnInit {
  @Input() is_event: boolean;
  
  public is_selected: number;
  public is_correct: boolean;

  constructor(
    public ManageService: ManageSytemQuizService
  ) { }

  ngOnInit(): void {}

  checkAnswer(request, i: number){
    this.is_selected = i;
    this.is_correct = this.ManageService.current_question.correct_answer == request;
    this.ManageService.current_question.your_answer = request;

    setTimeout(
      () => {
        if(!this.is_event)
          this.ManageService.checkAnswer(this.is_correct);
        else
          this.ManageService.nextquestion();
        this.is_selected = undefined;
      }, 450);
  }
}
