import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { Tipo } from '../../models/tipo';
import { TipoService } from '../../services/tipo.service';

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
    this.botonesHabilitados = !!this.pokemon.numero && !!this.pokemon.nombre && !!this.pokemon.descripcion && !!this.pokemon.tipo1;
    if(Number(this.pokemon.numero.trim()) > 0 && Number(this.pokemon.numero.trim()) < 10000){
      alert("Inserte un valor mayor a 0");
      this.botonesHabilitados = false;
    }
    if(this.pokemon.nombre.trim() == " "){
      alert("Inserte un nombre valido");
      this.botonesHabilitados = false;
    }
    if(this.pokemon.descripcion.trim() == ""){
      alert("Inserte una descripción valida");
      this.botonesHabilitados = false;
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
