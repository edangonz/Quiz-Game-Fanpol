import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { EventService } from 'src/app/services/event.service';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from 'src/structures/event.structure';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  public event_form;
  public blockButton: boolean;
  public current_event: Event;
  public max_winners: boolean;

  constructor(
    public quiz_service: QuizService,
    private form_builder: FormBuilder,
    public event_service: EventService,
    private router: Router,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle( "Evento");
    this.getEvent();
  }

  private formNewEvent(){
    this.quiz_service.getQuizes();
    this.event_form = this.form_builder.group({
      name: undefined,
      id_quiz: undefined
    });
  }

  onSubmit(form){
    if(form.name && form.id_quiz){
      this.blockButton = true;
     
      this.event_service.updateEvent(form.name, form.id_quiz)
        .then(() => {
          this.blockButton = false;
          this.router.navigate(['admin/event']);
          this.event_form.reset(); 
        });
    }
  }

  async getEvent(){
    //this.current_event = await this.event_service.getEvent();
    if(this.current_event){

    } else
      this.formNewEvent();
  }
}
