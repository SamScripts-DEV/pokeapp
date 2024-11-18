import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private urlPokemon = 'https://pokeapi.co/api/v2/pokemon'
  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any> {
    return this.http.get(`${this.urlPokemon}?limit=100000&offset=0`);
  }

  getPokemonDetails(pokemonName: string): Observable<any> {
    return this.http.get(`${this.urlPokemon}/${pokemonName}`);
  }

  
}
