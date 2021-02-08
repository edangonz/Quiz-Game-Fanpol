import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppPageComponent } from './app-page/app-page.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { EventPageComponent } from './event-page/event-page.component'

const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path: 'app', component:  AppPageComponent},
  {path: 'quiz/:idquiz', component: QuizPageComponent},
  {path: 'event/:idevent', component: EventPageComponent},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
