import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/firebase/storage.service';
import { Category } from 'src/structures/category.structure';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public list_categories$: Observable<Category[]>;

  constructor(
    private firestore: AngularFirestore,
    private storageService: StorageService,
  ) { }

  getCategories(category_filter: string) {
    if(category_filter)
      return this.list_categories$ = this.firestore.collection<Category>('category', ref => ref.where('name_category', '==', category_filter )).valueChanges({idField: 'id_category'});
    return this.list_categories$ = this.firestore.collection('category').valueChanges({idField: 'id_category'});
  };
  
  async getCategory(id_category: string): Promise<Category>{
    return this.firestore.collection<Category>('category').doc(id_category)
      .get().toPromise().then(data => (data.exists)? {...data.data()}: undefined);
  }

  async updateCategory(name: string, file_background: File, music: File, name_file: string){
    let temp_category: Category = { name_category : name };
    
    if(file_background)
      temp_category.image_background = await (await this.storageService.uploadCloudStorage(name + 'background',file_background)).ref.getDownloadURL();
    
    if(music)
      temp_category.music = await (await this.storageService.uploadCloudStorage(name + 'music', music)).ref.getDownloadURL();

    if(!name_file)
      await this.firestore.collection('category').add(temp_category);
     else
      await this.firestore.collection('category').doc(name_file).set(temp_category, {merge: true});
  }
}
