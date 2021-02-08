import { Component, OnInit, NgZone  } from '@angular/core';
import { AuthService } from 'src/services/firebase/auth.service';
import { FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm;
  public blockButton: boolean;

  constructor(public authService: AuthService, private formBuilder: FormBuilder, private router: Router, private ngZone: NgZone) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if(user){
        this.ngZone.run(() => {
          this.router.navigate(['admin/event']); 
        });
      }
    })
  }

  onSubmitLogin(customerData) {
    this.blockButton = true;
    this.authService.signIn(customerData.email, customerData.password).then(() => {
      this.loginForm.reset();
    }).catch(() => { this.blockButton = false; });
  }
}
