import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { QuizService } from 'src/app/services/quiz.service';
import { CaracterService } from 'src/app/services/caracter.service';
import { CategoryService } from 'src/app/services/category.service';

import { Question, Quiz } from 'src/structures/quiz.structure';

@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrls: ['./new-quiz.component.scss']
})
export class NewQuizComponent implements OnInit {
  public quiz_form;
  public action: string;

  public blockButton: boolean;
  public blockName: boolean;

  public questions: Question[] = [
    {
      question: 'Nueva pregunta',
      message_correct: '',
      message_incorrect: '',
      answers: []
    }
  ];

  constructor(
    private quiz_service: QuizService,
    public caracter_service: CaracterService,
    public category_service: CategoryService,
    private form_builder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
  ) {
    const caracter_id = this.route.snapshot.paramMap.get('id');
    if(caracter_id)
      this.updateQuiz(caracter_id);
    else {
      this.titleService.setTitle( "Quiz");
      this.action = "Guardar";

      this.quiz_form = this.form_builder.group({
        name: undefined,
        id_category: undefined,
        id_caracter: undefined,
      });
    }
  }

  ngOnInit(): void {
    this.caracter_service.getCaracteres('');
    this.category_service.getCategories('');
  }

  private async updateQuiz(id_quiz: string){
    let quiz : Quiz = await this.quiz_service.getDataQuiz(id_quiz);

    if(!quiz)
      this.router.navigate(['admin/quiz']);
    else {
      this.action = "Actualizar";
      this.blockName = true;
      this.titleService.setTitle( "Quiz | " + quiz.name_quiz);

      quiz.id_quiz = id_quiz;
      this.questions = quiz.questions;
      this.quiz_form = this.form_builder.group({
        name: quiz.name_quiz,
        id_category: quiz.id_category,
        id_caracter: quiz.id_caracter,
      });
    }
  }

  onSubmit(form){

    if(form.name && form.id_category && form.id_caracter && !this.validQuestions()){
      this.blockButton = true;
     
      this.quiz_service.updateQuiz(form.name, form.id_category, form.id_caracter, this.questions, this.route.snapshot.paramMap.get('id'))
      .then(() => {
        this.blockButton = false;
        this.router.navigate(['admin/quiz']);
        this.quiz_form.reset(); 
      });
    }
  }

  private validQuestions(){
    for(let q of this.questions) {
      if(!(q.question && q.message_correct && q.message_incorrect && q.answers.length && !this.validAnswers(q.answers)))
        return true;
    };  
  }

  private validAnswers(answers: string[]){
    for(let a of answers) {
      if(!a)
        return true;
    }; 
  }

  addQuestion() {
    let last_question = this.questions[this.questions.length-1];
      
    if(!last_question || (last_question.question && last_question.message_correct && last_question.message_incorrect && last_question.answers.length)){
      this.questions.push({
        question: 'Nueva pregunta',
        message_correct: '',
        message_incorrect: '',
        answers: []
      })
    }
  }
}
