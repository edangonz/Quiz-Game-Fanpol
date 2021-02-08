import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';

import { AuthGuard } from './auth.guard';
import { EventComponent } from './event/event.component';
import { QuizComponent } from './quiz/quiz.component';
import { CaracterComponent } from './caracter/caracter.component';
import { CategoryPageComponent } from './category-page/category-page.component';

const routes: Routes = [
  {path: '',   redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:  LoginPageComponent},
  {path: 'event', component:  EventComponent, canActivate: [AuthGuard]},
  {path: 'event/:id', component:  EventComponent, canActivate: [AuthGuard]},
  {path: 'quiz', component:  QuizComponent, canActivate: [AuthGuard]},
  {path: 'quiz/:id', component:  QuizComponent, canActivate: [AuthGuard]},
  {path: 'caracter', component:  CaracterComponent, canActivate: [AuthGuard]},
  {path: 'caracter/:id', component:  CaracterComponent, canActivate: [AuthGuard]},
  {path: 'category', component:  CategoryPageComponent, canActivate: [AuthGuard]},
  {path: 'category/:id', component:  CategoryPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
