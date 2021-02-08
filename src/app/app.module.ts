import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppPageComponent } from './app-page/app-page.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { ToolModule } from './tool/tool.module';
import { ResultsComponent } from './results/results.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { QuestionsContainerComponent } from './questions-container/questions-container.component';
import { CaracterContainerComponent } from './caracter-container/caracter-container.component';
import { AnwersContainerComponent } from './anwers-container/anwers-container.component';
import { CouldContainerComponent } from './could-container/could-container.component';
import { EventPageComponent } from './event-page/event-page.component';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    AppPageComponent,
    QuizPageComponent,
    ResultsComponent,
    NavBarComponent,
    QuestionsContainerComponent,
    CaracterContainerComponent,
    AnwersContainerComponent,
    CouldContainerComponent,
    EventPageComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    DragDropModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToolModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
