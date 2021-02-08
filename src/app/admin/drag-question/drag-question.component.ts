import { Component, OnInit, Input } from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Question } from 'src/structures/quiz.structure';

@Component({
  selector: 'app-drag-question',
  templateUrl: './drag-question.component.html',
  styleUrls: ['./drag-question.component.scss']
})
export class DragQuestionComponent implements OnInit {
  @Input() questions: Question[];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>, answers) {
    moveItemInArray(answers, event.previousIndex, event.currentIndex);
  }

  addAnswer(list: string[]){
    list.push('Nueva respuesta');
  }

  removeQuestion(index:  number){
    this.questions.splice(index, index + 1);
  }

}
