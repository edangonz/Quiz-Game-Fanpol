import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestorege: AngularFireStorage, private firestore: AngularFirestore) {}

  async uploadCloudStorage(nombreArchivo: string, datos: any) {
    return this.firestorege.upload(nombreArchivo, datos);
  }

  public refCloudStorage(nombreArchivo: string){
    return this.firestorege.ref(nombreArchivo);
  }
}
