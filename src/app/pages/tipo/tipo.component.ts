import { Component, OnInit } from '@angular/core';
import { Tipo } from '../../models/tipo';
import { TipoService } from '../../services/tipo.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {

  tipos: Tipo[] = [];
  tipo: Tipo = new Tipo();

  // Propiedad para controlar la habilitación de los botones del tipo
  botonesTipoHabilitados: boolean = false;

  constructor(private tipoService: TipoService) { }

  ngOnInit(): void {
    this.tipoService.getTipo().subscribe(data => {
      this.tipos = data.map(doc => {
        return {
          ...doc.payload.doc.data() as Tipo,
          id: doc.payload.doc.id
        };
      })
    })

    this.tipo.fortaleza = 'No tiene';
    this.tipo.debilidad = 'No tiene';
    this.tipo.neutral = 'No tiene';
  }

  // Función para verificar si todos los campos requeridos del tipo están llenos
  verificarCamposTipo() {

    switch(true) {
      case (!!this.tipo.tipo && !!this.tipo.descripcion && !!this.tipo.fortaleza && !!this.tipo.debilidad && !!this.tipo.neutral):
          this.botonesTipoHabilitados = true;
          break;
      case (this.tipo.tipo.trim().length === 0):
        alert("Inserte un nombre valido");
        this.botonesTipoHabilitados = false;
          break;
      case (this.tipo.descripcion.trim().length === 0):
        alert("Inserte una descripción valida");
        this.botonesTipoHabilitados = false;
          break;

  }
  
  }

  insertarTipo() {
    this.tipoService.createTipo(this.tipo);
    this.tipo = new Tipo();
    this.botonesTipoHabilitados = false;
  }

  selectTipo(tipoSeleccionado: Tipo) {
    this.tipo = tipoSeleccionado;
    this.botonesTipoHabilitados = true;
  }

  updateTipo() {
    this.tipoService.updateTipo(this.tipo);
    this.tipo = new Tipo();
    this.botonesTipoHabilitados = false;
  }

  deleteTipo(id: string) {
    this.tipoService.deleteTipo(id);
    this.tipo = new Tipo();
    this.botonesTipoHabilitados = false;
  }
}
