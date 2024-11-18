import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonDetailModalComponent } from 'src/app/pokemon-detail-modal/pokemon-detail-modal.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {

  pokemons: any[] = [];
  filteredPokemons: any[] = [];

  constructor(private pokemonService: PokemonService
    , private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe({
      next: (data) => {
        console.log('Data:', data);
        
        this.pokemons = data.results; 
        this.filteredPokemons = [...this.pokemons];  // Asegúrate de inicializar filteredPokemons
        console.log('Pokémon cargados:', this.pokemons);
      },
      error: (err) => console.error('Error al cargar los Pokémon:', err),
    });
  }

  filterPokemons(event: any) {
    const query = event.target.value.toLowerCase();
    if(query.trim() === '') {
      this.filteredPokemons = [...this.pokemons];  // Reinicia la lista filtrada cuando no hay búsqueda
    } else {
      this.filteredPokemons = this.pokemons.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(query);  // Filtra según el nombre
      });
    }
  }

  async openPokemonDetailModal(pokemon: any) {
    const modal = await this.modalController.create({
      component: PokemonDetailModalComponent,
      componentProps: { pokemon },
    });
    return await modal.present();
  }
}
