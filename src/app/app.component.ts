import { Component } from '@angular/core';
import { ConfigGameService } from 'src/services/config-game.service';
import { AuthService } from 'src/services/firebase/auth.service';
import { showUp } from './animations/showUp.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    showUp
  ]
})
export class AppComponent {
  title = 'fanpol';
  list_menu: any[] ;

  constructor(
    public gameService: ConfigGameService,
    public auth_service: AuthService,
    ){
    this.list_menu = [
      {
        name: 'Evento',
        link: 'admin/event',
        icon: 'fas fa-calendar'
      },
      {
        name: 'Quiz',
        link: 'admin/quiz',
        icon: 'fas fa-address-book'
      },
      {
        name: 'Personaje',
        link: 'admin/caracter',
        icon: 'fas fa-male'
      },
      {
        name: 'Escenario',
        link: 'admin/category',
        icon: 'fas fa-book-open'
      },
    ];
  }  
}
