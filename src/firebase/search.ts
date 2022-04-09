import { defineStore } from "pinia";
import { PokemonClient } from "pokenode-ts";

interface searchResult {
  searchResults:
    | null
    | {
        id: number;
        name: string;
        height: number;
        weight: number;
        abilities: string[];
        stats: { name: string; base_stat: number }[];
        types: string[];
        sprite: string | null;
      };
}

export const useSearchStore = defineStore({
  id: "search",
  state: (): searchResult => ({
    searchResults: null,
  }),
  actions: {
    async searchPokeApi(pokemonName: string) {
      const client = new PokemonClient({
        cacheOptions: { maxAge: 10000, exclude: { query: false } },
      });
      const response = await client.getPokemonByName(pokemonName);
      this.searchResults = {
        id: response.id,
        name: response.name,
        height: response.height,
        weight: response.weight,
        abilities: response.abilities.map((ability) => ability.ability.name),
        stats: response.stats.map((stat) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        })),
        types: response.types.map((type) => type.type.name),
        sprite: response.sprites.front_shiny,
      };
    },
  },
});
