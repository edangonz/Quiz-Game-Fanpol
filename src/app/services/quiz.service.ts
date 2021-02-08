import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Quiz, Question } from 'src/structures/quiz.structure';
import { CategoryService } from './category.service';
import { CaracterService } from './caracter.service';
import { Caracter } from 'src/structures/caracter.structure';
import { Category } from 'src/structures/category.structure';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public list_quiz$: Observable<Quiz[]>;

  constructor(
    private firestore: AngularFirestore,
    private category_service: CategoryService,
    private caracter_service: CaracterService,
  ) { }

  getQuizes(){
    this.list_quiz$ = this.firestore.collection<Quiz>('quiz').valueChanges({idField: 'id_quiz'});
  }

  async getDataQuiz(id_quiz: string): Promise<Quiz>{
    return this.firestore.collection<Quiz>('quiz').doc(id_quiz)
      .get().toPromise().then(data => (data.exists)? {...data.data()}: undefined);
  }

  async getQuiz(id_quiz: string): Promise<Quiz>{
    let quiz = await this.firestore.collection<Quiz>('quiz').doc(id_quiz).get().toPromise()
      .then(data => (data.exists)? {id_quiz: data.id, ...data.data()}: undefined)
      .catch(() => undefined);
    return (quiz)? this.getCurrentQuiz(quiz): undefined;
  }

  async getCurrentQuiz(quiz: Quiz): Promise<Quiz>{
    let category: Category  = await this.category_service.getCategory(quiz.id_category);
    let caracter: Caracter = await this.caracter_service.getCaracter(quiz.id_caracter);

    if(category && caracter) {
      quiz.caracter = caracter;
      this.unsort_answers(quiz.questions);
      quiz.category = category;

      return quiz;
    } else 
      return undefined;
  }

  private unsort_answers(questions: Question[]){
    questions.forEach((q) => {
      q.correct_answer = q.answers[0];
      q.answers.sort(function() {return Math.random() - 0.5});
    });
  }

  async updateQuiz(name: string, id_category: string, id_caracter: string, questions: Question[], name_file: string){
    let temp_quiz: Quiz = {
      name_quiz : name,
      id_category: id_category,
      id_caracter: id_caracter,
      questions: questions,
    };
    
    if(!name_file)
      await this.firestore.collection('quiz').add(temp_quiz);
    else
      await this.firestore.collection('quiz').doc(name_file).set(temp_quiz, {merge: true});
  }
}
