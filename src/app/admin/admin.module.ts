import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { AdminRoutingModule } from './admin-routing.module';

import { LoginPageComponent } from './login-page/login-page.component';

import { CategoryPageComponent } from './category-page/category-page.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CaracterComponent } from './caracter/caracter.component';
import { NewCaracterComponent } from './new-caracter/new-caracter.component';
import { QuizComponent } from './quiz/quiz.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { DragQuestionComponent } from './drag-question/drag-question.component';
import { ToolModule } from '../tool/tool.module';
import { EventComponent } from './event/event.component';
import { NewEventComponent } from './new-event/new-event.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    CategoryPageComponent,
    NewCategoryComponent,
    CaracterComponent,
    NewCaracterComponent,
    QuizComponent,
    NewQuizComponent,
    DragQuestionComponent,
    EventComponent,
    NewEventComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    ToolModule,
  ]
})
export class AdminModule { }
