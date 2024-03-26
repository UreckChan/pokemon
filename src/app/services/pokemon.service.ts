import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Pokemon } from '../models/pokemon';
import { Tipo } from '../models/tipo';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private firestore:AngularFirestore) { }

  getTipo(){
    return this.firestore.collection('tipo').snapshotChanges();
  }

  getPokemon(){
    return this.firestore.collection('pokemon').snapshotChanges();
  }

  createPokemon(pokemon:Pokemon){
      return this.firestore.collection('pokemon').add(Object.assign({},pokemon));
  }

  updatePokemon(pokemon:Pokemon){
    this.firestore.doc('pokemon/'+pokemon.id).update(pokemon);
  }

  deletePokemon(pokemonId:string){
    this.firestore.doc('pokemon/'+pokemonId).delete();
  }

}
