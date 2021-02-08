import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from 'src/structures/event.structure';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public last_event$: Observable<Event[]>;
  public event$: Observable<Event[]>;

  constructor(
    private firestore: AngularFirestore,
  ) {
    this.last_event$ = this.firestore.collection<Event>('event', ref => ref.where('state', '==', true )).valueChanges({idField: 'id_event'});
  }

  getEvent(id_event){
    return this.firestore.collection('event').doc<Event>(id_event).valueChanges();
  }

  getAllEvents(){
    this.event$ = this.firestore.collection<Event[]>('event').valueChanges({idField: 'id_event'});
  }

  async editEvent(id_event, new_doc){
    await this.firestore.collection('event').doc(id_event).set(new_doc, {merge: true});
  }

  async updateEvent(name_event: string, id_quiz: string){
    
    let temp_event: Event = { 
      name_event: name_event,
      date: `${(new Date().getFullYear())}-${(new Date().getMonth() + 1)}-${(new Date().getDate())}`,
      state: false,
      id_quiz: id_quiz,
      winner: [],
    };
    
    await this.firestore.collection('event').add(temp_event);
  }

  async updateStateEvent(current_event: Event, newEvent: Event){
    await this.firestore.collection('event').doc(current_event.id_event).set(newEvent, {merge: true});
  }
}
