import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Event } from 'src/structures/event.structure';
import { EventService } from '../services/event.service';
import { ManageSystemEventService } from '../services/manage-system-event.service';
import { ManageSytemQuizService } from '../services/manage-sytem-quiz.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  public nick_name: String;
  public has_name: boolean;

  private current_event: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitization: DomSanitizer,
    public ManageService : ManageSytemQuizService,
    private EventService: EventService,
    private ManageEvent: ManageSystemEventService,
    private CookieService: CookieService
  ) { }

  ngOnInit(): void {
    let id_event = this.route.snapshot.paramMap.get('idevent');
    
    if(this.CookieService.check('username')) {
      this.nick_name = this.CookieService.get('username');
      this.has_name = true;
      this.ManageEvent.nick_name = this.nick_name;
      this.CookieService.delete('username');
    }

    if(id_event) {
      this.ManageEvent.id_event = id_event;
      this.generateEvent(id_event);
    } else
      this.router.navigate(['']);
  }

  ngOnDestroy() {
    if(this.current_event)
      this.current_event.unsubscribe();
  }

  private async generateEvent(id_event: string){   
    this.current_event = this.EventService.last_event$.subscribe((event) => {
      let temp_event : Event = {...event[0]};

      if(temp_event.winner && (!this.ManageEvent.winner || this.ManageEvent.winner.length != temp_event.winner.length))
        this.ManageEvent.winner = temp_event.winner;

      if(!this.ManageService.current_quiz)
        this.ManageService.generateQuiz(temp_event.id_quiz);

      if(id_event != temp_event.id_event || !temp_event.state || this.ManageEvent.winner.length == temp_event.max_winners){
        this.router.navigate(['']);
        this.ManageService.reset();
      }
    });
  }

  getSatanizeURL(file: string){
    return this.sanitization.bypassSecurityTrustStyle('url('+file+')');
  }

  saveName(){
    if(this.nick_name && this.nick_name.length > 0){
      this.has_name = true;
      this.ManageEvent.nick_name = this.nick_name
    }
  }
}
