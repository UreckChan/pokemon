import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { Tipo } from '../../models/tipo';
import { TipoService } from '../../services/tipo.service';
import { or } from '@angular/fire/firestore';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'] // La propiedad se llama styleUrls
})
export class PokemonComponent implements OnInit {

  pokemones: Pokemon[] = [];
  pokemon: Pokemon = new Pokemon();

  tipos: Tipo[] = [];
  tipo: Tipo = new Tipo();

  // Propiedad para controlar la habilitación de los botones
  botonesHabilitados: boolean = false;

  constructor(private pokemonService: PokemonService, private tipoService: TipoService) {}

  ngOnInit(): void {



    this.tipoService.getTipo().subscribe(data => {
      this.tipos = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Tipo,
          id: doc.payload.doc.id
        };
      })
    })

    this.pokemonService.getPokemon().subscribe(data => {
      this.pokemones = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Pokemon,
          id: doc.payload.doc.id
        }
      })
    })

 this.pokemon.tipo1 = '';
 this.pokemon.tipo2 = 'No tiene';


  }
  


  // Función para verificar si todos los campos requeridos están llenos
  verificarCamposRequeridos() {
    switch(true) {
        case (!!this.pokemon.numero && !!this.pokemon.nombre && !!this.pokemon.descripcion && !!this.pokemon.tipo1):
            this.botonesHabilitados = true;
            break;
        case (Number(this.pokemon.numero) < 1 || Number(this.pokemon.numero) > 10000):
            alert("Inserte un valor mayor a 0 y menor a 10000 para el número de Pokedex");
            this.botonesHabilitados = false;
            break;
        case (this.pokemon.nombre.trim().length === 0):
            alert("Inserte un nombre válido");
            this.botonesHabilitados = false;
            break;
        case (this.pokemon.descripcion.trim().length === 0):
            alert("Inserte una descripción válida");
            this.botonesHabilitados = false;
            break;
    }
}



  insertarPokemon() {
    this.pokemonService.createPokemon(this.pokemon);
    this.pokemon = new Pokemon();
    this.botonesHabilitados = false;
  }

  selectPokemon(pokemonSeleccionado: Pokemon) {
    this.pokemon = pokemonSeleccionado;
    this.botonesHabilitados = true;
  }

  updatePokemon() {
    this.pokemonService.updatePokemon(this.pokemon);
    this.pokemon = new Pokemon();
    this.botonesHabilitados = false;
  }

  deletePokemon(id: string) {
    this.pokemonService.deletePokemon(id);
    this.pokemon = new Pokemon();
    this.botonesHabilitados = false;
  }
}
