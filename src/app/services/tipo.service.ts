import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Tipo } from '../models/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  constructor(private firestore:AngularFirestore) { }

  getTipo(){
    return this.firestore.collection('tipo').snapshotChanges();
  }

  createTipo(tipo:Tipo){
    return this.firestore.collection('tipo').add(Object.assign({},tipo));
  }

  updateTipo(tipo:Tipo){
    this.firestore.doc('tipo/'+tipo.id).update(tipo);
  }

  deleteTipo(tipoId:string){
    this.firestore.doc('tipo/'+tipoId).delete();
  }

}
