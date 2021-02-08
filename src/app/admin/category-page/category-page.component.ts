import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';
import { ConfigGameService } from 'src/services/config-game.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  public filter_form;
  public block_button: boolean;
  public in_update: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private config_service: ConfigGameService,
    public category_service: CategoryService,
    private sanitization: DomSanitizer,
    private form_builder: FormBuilder
  ) {
    this.filter_form = this.form_builder.group({
      name: undefined
    });
  }

  ngOnInit(): void {
    this.config_service.changeMenu('Escenario');
    this.category_service.getCategories('');

    if(this.route.snapshot.paramMap.get('id'))
      this.in_update = true;
  }

  satanizeBackground(url_image: string){
    return this.sanitization.bypassSecurityTrustStyle('url('+url_image+')')
  }

  onSubmit(filter_data) {
    this.block_button = true;
    
    if(filter_data.name)
      this.category_service.getCategory(filter_data.name);
    
    this.block_button = false;
  }

}
