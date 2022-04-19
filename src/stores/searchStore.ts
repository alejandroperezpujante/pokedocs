import { defineStore } from "pinia";
import { PokemonClient } from "pokenode-ts";
import { firebaseDb } from "@/firebase";
import { collection, query, where, getDocs } from "@firebase/firestore";

interface searchStoreState {
  searchMode: boolean;
  isSearching: boolean;
  searchResults:
    | undefined
    | {
        id: string;
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
  id: "searchStore",
  state: (): searchStoreState => ({
    searchMode: false,
    searchResults: undefined,
    isSearching: false,
  }),
  getters: {
    getSearchMode(state): boolean {
      return state.searchMode;
    },
  },
  actions: {
    async searchPokeApi(pokemonName: string) {
      this.isSearching = true;
      try {
        const client = new PokemonClient({
          cacheOptions: { maxAge: 10000, exclude: { query: false } },
        });
        const response = await client.getPokemonByName(pokemonName);
        const searchResult = {
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
          sprite: response.sprites.front_default,
        };
        console.info(searchResult);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.searchResults = searchResult;
      } catch (error) {
        console.error(error);
      } finally {
        this.isSearching = false;
      }
    },
    async searchPokedocs(pokemonName: string) {
      this.isSearching = true;
      try {
        const docRef = collection(firebaseDb, "pokemons");
        const q = query(docRef, where("name", "==", pokemonName));
        const querySnapshot = await getDocs(q);
        const documentId = querySnapshot.docs[0].id;
        const searchResult = querySnapshot.docs[0].data();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.searchResults = { ...searchResult, id: documentId };
        console.log(this.searchResults);
      } catch (error) {
        console.error(error);
      } finally {
        this.isSearching = false;
      }
    },
  },
});
