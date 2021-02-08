import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { QuizService } from './quiz.service';

import { Question, Quiz } from 'src/structures/quiz.structure';
import { ConfigGameService } from 'src/services/config-game.service';

@Injectable({
  providedIn: 'root'
})
export class ManageSytemQuizService {
  private it;
  public current_quiz: Quiz;
  public current_question: Question;
  public index: number;

  public is_answering: boolean;
  public is_ended: boolean;
  public was_correct: boolean;

  public current_face_caracter: Number;

  constructor(
    private quiz_service: QuizService,
    private gameService: ConfigGameService,
    private router: Router,
  ) {
    this.index = 0;
  }

  async generateQuiz(id_quiz: string){
    this.current_quiz = await this.quiz_service.getQuiz(id_quiz);
    
    this.is_answering = true;

    if(this.current_quiz){
      //this.getSound();
      this.iterable_questions();
    }else 
      this.router.navigate(['']);

    this.gameService.noSeenLoadingPage();
  }

  private iterable_questions() {
    this.it = this.crearIterador(this.current_quiz.questions);

    this.nextquestion()
  }

  private crearIterador(arreglo: Question[]){
    var siguienteIndice = 0;

    return {
      next: () => {
        return siguienteIndice < arreglo.length ? {value: arreglo[siguienteIndice++], done: false} : {done: true};
      }
    }
  }

  public nextquestion(){
    let next_question = this.it.next();
    
    if(next_question.done)
      this.is_ended = true;
    else{
      this.index++;
      this.current_question = next_question.value;
      this.is_answering = true;
      this.current_face_caracter = 0;
    }
  }

  public checkAnswer(is_correct: boolean){
    this.is_answering = false;
    this.was_correct = is_correct;

    this.current_face_caracter = (is_correct) ? 2 : 1;
  }

  public reset(){
    this.index = 0;
    this.it = undefined;
    this.current_quiz = undefined;
    this.current_question = undefined;

    this.is_answering = true;
    this.is_ended = false;
  }
}
