import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { ConfigGameService } from 'src/services/config-game.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {
  public filter_form;
  public block_button: boolean;
  public in_update: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private config_service: ConfigGameService,
    public quiz_service: QuizService,
    private form_builder: FormBuilder
  ) {
    this.filter_form = this.form_builder.group({
      name: undefined
    });
  }

  ngOnInit(): void {
    this.config_service.changeMenu('Quiz');
    this.quiz_service.getQuizes();

    if(this.route.snapshot.paramMap.get('id'))
      this.in_update = true;
  }

  onSubmit(filter_data) {
    this.block_button = true;
    
    if(filter_data.name)
      this.quiz_service.getQuizes();
    
    this.block_button = false;
  }

}
