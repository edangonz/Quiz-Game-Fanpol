import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/structures/quiz.structure';
import { Router } from '@angular/router';
import { ManageSytemQuizService } from '../services/manage-sytem-quiz.service';
import { ManageSystemEventService } from '../services/manage-system-event.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() questions: Question[];
  @Input() is_event: boolean;

  public count_correct_anwers: number;

  constructor(
    private router: Router,
    private ManageService: ManageSytemQuizService,
    private ManageEventService : ManageSystemEventService,
    private CookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.count_correct_anwers = this.questions.length;
    if(this.isWinner())
      this.ManageEventService.sendWinner();
  }

  private isWinner(): boolean{
    let result: boolean = true;
    this.questions.forEach((ques) => {
      if (ques.correct_answer != ques.your_answer){
        this.count_correct_anwers--;
        result = result && false;
      }
    });
    return result;
  }

  restarGame(){
    this.CookieService.set('username', this.ManageEventService.nick_name.toString());
    location.reload();
  }

  exitQuiz(){
    this.ManageService.reset();
    this.router.navigate(['app']);
  }
}
