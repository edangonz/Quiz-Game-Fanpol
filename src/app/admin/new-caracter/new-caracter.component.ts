import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CaracterService } from 'src/app/services/caracter.service';
import { Caracter } from 'src/structures/caracter.structure';

@Component({
  selector: 'app-new-caracter',
  templateUrl: './new-caracter.component.html',
  styleUrls: ['./new-caracter.component.scss']
})
export class NewCaracterComponent implements OnInit {
  public temp_caracter: Caracter;

  public caracter_form;
  public action: string;

  public blockButton: boolean;
  public blockName: boolean;
  public is_compleje: boolean;

  public file_background: File;
  public file_face: File;
  public correct_sound: File;
  public incorrect_sound: File;

  constructor(
    private caracter_service: CaracterService,
    private form_builder: FormBuilder,
    private sanitization: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
  ) {
    const caracter_id = this.route.snapshot.paramMap.get('id');
    if(caracter_id)
      this.updateCaracter(caracter_id);
    else {
      this.titleService.setTitle( "Personaje");
      this.action = "Guardar";
      this.temp_caracter = {};
      this.caracter_form = this.form_builder.group({
        background: undefined,
        face: undefined,
        name: undefined,
        correct: undefined,
        incorrect: undefined,
      });
    }
  }

  ngOnInit(): void { }

  private async updateCaracter(id_caracter: string){
    this.temp_caracter = await this.caracter_service.getCaracter(id_caracter);

    if(!this.temp_caracter)
      this.router.navigate(['admin/caracter']);
    else {
      this.action = "Actualizar";
      this.blockName = true;
      this.titleService.setTitle( "Personaje | " + this.temp_caracter.name_caracter);

      this.temp_caracter.id_caracter = id_caracter;
      this.caracter_form = this.form_builder.group({
        background: undefined,
        face: undefined,
        name: this.temp_caracter.name_caracter,
        correct: undefined,
        incorrect: undefined,
      });

      if(this.temp_caracter.correct_sound && this.temp_caracter.incorrect_sound) {
        this.temp_caracter.correct_sound = this.sanitization.bypassSecurityTrustResourceUrl(this.temp_caracter.correct_sound);
        this.temp_caracter.incorrect_sound = this.sanitization.bypassSecurityTrustResourceUrl(this.temp_caracter.incorrect_sound);
        this.is_compleje = true;
      }//this.background = this.sanitization.bypassSecurityTrustStyle('url('+caracter.image_caracter+')');
    }
  }

  changeGround(event: any, is_backgorund: boolean){
    let temp_image = event.target.files[0];

    if(temp_image && (temp_image.type == 'image/jpeg' || temp_image.type == 'image/png')){
      if(is_backgorund){
        this.file_background = temp_image;
        this.temp_caracter.image_caracter = URL.createObjectURL(this.file_background);
      } else {
        this.file_face = temp_image;
        this.temp_caracter.image_face = URL.createObjectURL(this.file_face);        
      }
    }//this.temp_caracter.image_caracter = this.sanitization.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.file_background));
    this.temp_caracter = {...this.temp_caracter};
  }

  changeSound(event: any, is_correct: boolean){
    let temp_file = event.target.files[0];

    if(temp_file && (temp_file.type == 'audio/mpeg')){
      if(is_correct){
        this.correct_sound = temp_file;
        this.temp_caracter.correct_sound = this.sanitization.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.correct_sound));
      } else {
        this.incorrect_sound = temp_file;
        this.temp_caracter.incorrect_sound = this.sanitization.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.incorrect_sound));
      }
    }
  }

  onSubmit(form){
    if(form.name && this.temp_caracter.image_caracter
      && (!this.is_compleje || (this.temp_caracter.correct_sound && this.temp_caracter.incorrect_sound && this.temp_caracter.image_face))){
      this.blockButton = true;

      this.caracter_service.updateCaracter(form.name, this.file_background, this.file_face, this.correct_sound, this.incorrect_sound, this.temp_caracter.coordinates, this.is_compleje, this.route.snapshot.paramMap.get('id'))
      .then(() => {
        this.temp_caracter = {};
        this.router.navigate(['admin/caracter']);
        this.caracter_form.reset(); 
      }).finally(() => {this.blockButton = false;});
    }
  }
}
