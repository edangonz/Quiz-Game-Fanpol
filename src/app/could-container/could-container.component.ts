import { Component, OnInit, Input } from '@angular/core';
import { ManageSytemQuizService } from '../services/manage-sytem-quiz.service';

import { showUp } from '../animations/showUp.animation';

@Component({
  selector: 'app-could-container',
  templateUrl: './could-container.component.html',
  styleUrls: ['./could-container.component.scss'],
  animations: [
    showUp
  ]
})
export class CouldContainerComponent implements OnInit {
  @Input() is_event: boolean;

  constructor(
    public ManageService: ManageSytemQuizService
  ) { }

  ngOnInit(): void {
  }

}
