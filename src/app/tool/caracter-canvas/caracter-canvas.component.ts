import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';

import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Caracter } from 'src/structures/caracter.structure';

@Component({
  selector: 'app-caracter-canvas',
  templateUrl: './caracter-canvas.component.html',
  styleUrls: ['./caracter-canvas.component.scss']
})
export class CaracterCanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  @Input() temp_caracter: Caracter;
  @Input() face: number;
  @Input() is_editable: boolean;
  
  private ctx: CanvasRenderingContext2D;
  
  public image_caracter;
  public image_faces;

  public size: number;
  private x_eye: number;
  private y_eye: number;

  constructor() { }

  ngOnInit(): void {
    this.size = window.innerHeight / ((this.is_editable)? 1.25: 1);
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.x_eye = this.y_eye = 0;
    if(this.temp_caracter.coordinates)
      this.generate_coor();
    
    this.createSprite();
    this.life();
  }

  private generate_coor(){
    this.x_eye = (this.temp_caracter.coordinates[0] / ((this.is_editable)? 1.25: 1) * this.size) / 754;
    this.y_eye = (this.temp_caracter.coordinates[1] / ((this.is_editable)? 1.25: 1) * this.size) / 754;
  }

  private createSprite(){
    if(this.temp_caracter.image_face){
      this.image_faces = new Image();
      this.image_faces.src = this.temp_caracter.image_face;
      this.image_faces.onload = () => this.drow(0);
    }

    if(this.temp_caracter.image_caracter){
      this.image_caracter = new Image();
      this.image_caracter.src = this.temp_caracter.image_caracter;
      this.image_caracter.onload = () => this.drow(0);
    }
  }

  ngOnChanges() {
    if(this.ctx)
      this.createSprite();
  }

  private drow(int: number){
    this.ctx.clearRect(0, 0, this.size / 2, this.size);
    
    if(this.image_caracter)
      this.ctx.drawImage(this.image_caracter, this.face * (this.image_caracter.width / 3), 0, (this.image_caracter.width / 3),
      this.image_caracter.height, 0, 0, this.size / 2, this.size);
    
    if(this.image_faces && this.face == 0)
      this.ctx.drawImage(this.image_faces, 0, int * (this.image_faces.height / 3), this.image_faces.width, this.image_faces.height / 3,
      this.x_eye , this.y_eye,
      ((this.size / 2) * this.image_faces.width) / (this.image_caracter.width / 3),
      (this.size * (this.image_faces.height / 3)) / this.image_caracter.height);
  }

  private async life(){
    let time = Math.random() * 10 + 4;

    setTimeout(() => {
      this.drow(1);
      setTimeout(() => this.drow(2), 60);
      setTimeout(() => this.drow(0), 120);
      this.life();
    }, time * 1000);
  }

  resize(){
    this.size = window.innerHeight / ((this.is_editable)? 1.25: 1);
    this.generate_coor();
    setTimeout(() => this.drow(0), 100)
  }

  dropped(event: CdkDragEnd<string[]>){
    this.x_eye = event.source.getFreeDragPosition().x;
    this.y_eye = event.source.getFreeDragPosition().y;

    this.temp_caracter.coordinates = [this.x_eye * ((this.is_editable)? 1.25: 1), this.y_eye * ((this.is_editable)? 1.25: 1)];
    this.drow(0);
  }
}
