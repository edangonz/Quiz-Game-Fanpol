import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { ManageSytemQuizService } from '../services/manage-sytem-quiz.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {
  private audioCorrect: HTMLAudioElement;
  private audioIncorrect: HTMLAudioElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitization: DomSanitizer,
    public ManageService : ManageSytemQuizService
    ) { }

  ngOnInit(): void {
    let id_quiz = this.route.snapshot.paramMap.get('idquiz');
    if(id_quiz)
      this.ManageService.generateQuiz(id_quiz);
    else
      this.router.navigate(['']);
  }

  getSatanizeURL(file: string){
    return this.sanitization.bypassSecurityTrustStyle('url('+file+')');
  }

  /*
  private getSound(){
    this.audioCorrect = new Audio();
    this.audioCorrect.src = this.current_quiz.caracter.correct_sound;
    this.audioCorrect.load();

    this.audioIncorrect = new Audio();
    this.audioIncorrect.src = this.current_quiz.caracter.incorrect_sound;
    this.audioIncorrect.load();
  }
  */
}
