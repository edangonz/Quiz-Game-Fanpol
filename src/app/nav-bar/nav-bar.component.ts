import { Component, Input, OnInit } from '@angular/core';
import { ConfigGameService } from 'src/services/config-game.service';
import { showUpLeftMenu, showUpMenu } from '../animations/menu.animations';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    showUpMenu,
    showUpLeftMenu
  ]
})
export class NavBarComponent implements OnInit {
  public seen_menu: boolean;
  @Input() list_menu: any[];

  constructor(
    public config_service: ConfigGameService
  ) { }

  ngOnInit(): void {}

  toggle(){
    this.seen_menu = !this.seen_menu;
  }

}
