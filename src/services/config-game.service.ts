import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigGameService {
  public loadingPage$: boolean;
  public current_menu: string;

  constructor() {
    this.loadingPage$ = false;
  }

  changeMenu(new_menu: string): void{
    this.current_menu = new_menu;
  }

  seenLoadingPage(){
    this.loadingPage$ = true;
  }

  noSeenLoadingPage(){
    this.loadingPage$ = false;
  }
}
