import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';
import { ConfigGameService } from 'src/services/config-game.service';

import { showUp } from '../animations/showUp.animation';

import { EventService } from '../services/event.service';

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss'],
  animations: [
    showUp
  ]
})
export class AppPageComponent implements OnInit {
  public form_quiz;

  constructor(
    private formBuilder: FormBuilder,
    public quiz_service: QuizService,
    public event_service: EventService,
    private router: Router,
    private gameService: ConfigGameService
  ) {
    this.form_quiz = this.formBuilder.group({
      id_quiz: null,
    });

    this.quiz_service.getQuizes();
  }

  ngOnInit(): void {}

  onSubmit(form_quiz) {
    if(form_quiz.id_quiz) {
      this.gameService.seenLoadingPage();
      this.router.navigate(['quiz/' + form_quiz.id_quiz]);
    }
  }
}
