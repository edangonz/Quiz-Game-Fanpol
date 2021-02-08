import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ConfigGameService } from 'src/services/config-game.service';

import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/structures/event.structure';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  public current_event$: Observable<Event>;
  public is_active_event$: Subscription;
  public is_active_event: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private config_service: ConfigGameService,
    public EventService: EventService
  ) { }

  ngOnInit(): void {
    this.config_service.changeMenu('Evento');

    let id_event = this.route.snapshot.paramMap.get('id');

    if(id_event) 
      this.current_event$ = this.EventService.getEvent(id_event)
    this.EventService.getAllEvents()

    this.is_active_event$ = this.EventService.event$.subscribe((events) => {
      this.is_active_event = false;
      events.forEach((e) => {
        this.is_active_event = this.is_active_event || e.state;
      })
    })
  }

  ngOnDestroy() {
    if(this.is_active_event$)
      this.is_active_event$.unsubscribe();
  }

  changeState(state: boolean){
    if(!this.is_active_event || state)
      this.EventService.editEvent(this.route.snapshot.paramMap.get('id'), {state: !state});
  }

  close(){
    this.router.navigate(['admin/event']);
  }
}
