import { Injectable } from '@angular/core';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class ManageSystemEventService {
  public nick_name: String;
  public winner: String[];
  public id_event: String;

  constructor(
    private EventService : EventService,
  ) { }

  sendWinner(){
    this.winner.push(this.nick_name)
    this.EventService.editEvent(this.id_event, { winner: this.winner })
  }
}
