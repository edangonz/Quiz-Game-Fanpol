import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {
  public category_form;
  public action: string;

  public blockButton: boolean;
  public blockName: boolean;

  public file_background: File;
  public background: any;

  public music_background: File;
  public music: any;

  constructor(
    private category_service: CategoryService,
    private form_builder: FormBuilder,
    private sanitization: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    ) {

    const category_id = this.route.snapshot.paramMap.get('id');
    if(category_id)
      this.updateCategory(category_id);
    else {
      this.titleService.setTitle( "Escenario");
      this.action = "Guardar";

      this.category_form = this.form_builder.group({
        background: undefined,
        music: undefined,
        name: undefined
      });
    }
  }

  ngOnInit(): void { }

  private async updateCategory(category_id: string){
    let category = await this.category_service.getCategory(category_id);
  
    if(!category)
      this.router.navigate(['admin/category']);
    else {
      this.action = "Actualizar";
      this.blockName = true;
      this.titleService.setTitle( "Escenario | " + category.name_category);

      category.id_category = category_id;
      this.category_form = this.form_builder.group({
        background: undefined,
        name: category.name_category,
        music: undefined,
      });

      this.music = this.sanitization.bypassSecurityTrustResourceUrl(category.music);
      this.background = this.sanitization.bypassSecurityTrustStyle('url('+category.image_background+')');
    }
  }

  onSubmit(form){
    if(form.name && this.background && this.music){
      this.blockButton = true;
      
      this.category_service.updateCategory(form.name.toLowerCase(), this.file_background, this.music_background, this.route.snapshot.paramMap.get('id')).then(() => {
        this.blockButton = false;
        this.file_background = null;
        this.background = null;
        this.music = null;
        this.router.navigate(['admin/category']);
        this.category_form.reset(); 
      });
    }
  }

  private validateFile(tempFile: File): File {
    if(tempFile && (tempFile.type == 'image/jpeg' || tempFile.type == 'image/png'))
      return tempFile;
    return null;
  }

  private validateMusic(tempFile: File): File {
    if(tempFile && (tempFile.type == 'audio/mpeg'))
      return tempFile;
    return null;
  }

  changeGround(event: any){
    this.file_background = this.validateFile(event.target.files[0]);

    if(this.file_background)
      this.background = this.sanitization.bypassSecurityTrustStyle('url('+URL.createObjectURL(this.file_background)+')');
  }

  changeMusic(event: any){
    this.music_background = this.validateMusic(event.target.files[0]);

    if(this.music_background)
      this.music = this.sanitization.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.music_background));
  }
}
