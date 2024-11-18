import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail-modal',
  templateUrl: './pokemon-detail-modal.component.html',
  styleUrls: ['./pokemon-detail-modal.component.scss'],
})
export class PokemonDetailModalComponent implements OnInit {
  @Input() pokemon: any; // Recibe el Pokémon seleccionado desde el modal
  pokemonDetails: any; // Aquí guardaremos los detalles completos del Pokémon

  constructor(
    private modalController: ModalController,
    private pokemonService: PokemonService // Inyectamos el servicio
  ) {}

  ngOnInit() {
    if (this.pokemon) {
      // Aquí utilizamos el nombre del Pokémon para obtener sus detalles
      this.pokemonService.getPokemonDetails(this.pokemon.name).subscribe({
        next: (data) => {
          this.pokemonDetails = data; // Guardamos los detalles en una variable
        },
        error: (err) => console.error('Error al cargar los detalles del Pokémon', err),
      });
    }
  }

  dismiss() {
    this.modalController.dismiss(); // Cierra el modal
  }
}
