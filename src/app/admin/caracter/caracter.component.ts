import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CaracterService } from 'src/app/services/caracter.service';
import { ConfigGameService } from 'src/services/config-game.service';

@Component({
  selector: 'app-caracter',
  templateUrl: './caracter.component.html',
  styleUrls: ['./caracter.component.scss']
})
export class CaracterComponent implements OnInit {
  public filter_form;
  public block_button: boolean;
  public in_update: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private config_service: ConfigGameService,
    public caracter_service: CaracterService,
    private sanitization: DomSanitizer,
    private form_builder: FormBuilder
  ) {
    this.filter_form = this.form_builder.group({
      name: undefined
    });
  }

  ngOnInit(): void {
    this.config_service.changeMenu('Personaje');
    this.caracter_service.getCaracteres('');

    if(this.route.snapshot.paramMap.get('id'))
      this.in_update = true;
  }

  satanizeBackground(url_image: string){
    return this.sanitization.bypassSecurityTrustStyle('url('+url_image+')')
  }

  onSubmit(filter_data) {
    this.block_button = true;
    
    if(filter_data.name)
      this.caracter_service.getCaracter(filter_data.name);
    
    this.block_button = false;
  }

}
