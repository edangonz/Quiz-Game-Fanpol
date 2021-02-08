import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { CaracterCanvasComponent } from './caracter-canvas/caracter-canvas.component';

@NgModule({
  declarations: [
    CaracterCanvasComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ], exports: [
    CaracterCanvasComponent
  ]
})
export class ToolModule { }
