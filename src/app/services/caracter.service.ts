import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from '../../services/firebase/storage.service';
import { Caracter } from 'src/structures/caracter.structure';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaracterService {
  public list_caracter$: Observable<Caracter[]>;

  constructor(
    private firestore: AngularFirestore,
    private storageService: StorageService,
  ) { }

  getCaracteres(category_filter: string) {
    if(category_filter)
      return this.list_caracter$ = this.firestore.collection<Caracter>('caracter', ref => ref.where('name_caracter', '==', category_filter )).valueChanges({idField: 'id_caracter'});
    return this.list_caracter$ = this.firestore.collection('caracter').valueChanges({idField: 'id_caracter'});
  };

  async getCaracter(id_caracter: string): Promise<Caracter>{
    return this.firestore.collection<Caracter>('caracter').doc(id_caracter)
      .get().toPromise().then(data => (data.exists)? {...data.data()}: undefined);
  }

  async updateCaracter(name_caracter: string, file_background: File, file_face: File, correct_sound: File, incorrect_sound: File, coors: number[], is_compleje: boolean,name_file: string){
    let temp_caracter: Caracter = { name_caracter: name_caracter };

    if(file_background)
      temp_caracter.image_caracter = await (await this.storageService.uploadCloudStorage(temp_caracter.name_caracter + 'image_caracter', file_background)).ref.getDownloadURL();

    if(file_face && is_compleje)
      temp_caracter.image_face = await (await this.storageService.uploadCloudStorage(temp_caracter.name_caracter + 'image_face', file_face)).ref.getDownloadURL();

    if(correct_sound && is_compleje)
      temp_caracter.correct_sound = await (await this.storageService.uploadCloudStorage(temp_caracter.name_caracter + 'correct_sound', correct_sound)).ref.getDownloadURL();

    if(incorrect_sound && is_compleje)
      temp_caracter.incorrect_sound = await (await this.storageService.uploadCloudStorage(temp_caracter.name_caracter + 'incorrect_sound', incorrect_sound)).ref.getDownloadURL();

    if(coors && is_compleje)
      temp_caracter.coordinates = coors;

    if(!name_file)
      await this.firestore.collection('caracter').add(temp_caracter);
    else 
      await this.firestore.collection('caracter').doc(name_file).set(temp_caracter, {merge: true});
  }
}