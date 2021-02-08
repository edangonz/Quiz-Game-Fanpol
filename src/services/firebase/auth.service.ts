import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth'; 

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;

  constructor(private afsAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.afsAuth.authState;
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  async signIn(email: string, password: string){
    return await this.afsAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    this.afsAuth.signOut();
    return this.router.navigate(['/']);
  }
}
