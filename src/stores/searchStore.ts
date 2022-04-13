import { firebaseAuth } from "@/firebase";
import { defineStore } from "pinia";
import axios from "axios";

interface searchResult {
  isSearching: boolean;
  searchResults:
    | undefined
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
    searchResults: undefined,
    isSearching: false,
  }),
  actions: {
    async searchPokeApi(pokemonName: string) {
      try {
        this.isSearching = true;
        const userToken = await firebaseAuth.currentUser?.getIdToken();
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${userToken}`,
          },
        };
        const axiosBody = {
          pokemonName: pokemonName,
        };
        const response = await axios.post(
          "http://localhost:5001/pokedocs-85955/us-central1/getPokemonWithNameAndAuth",
          axiosBody,
          axiosConfig
        );
        this.searchResults = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isSearching = false;
      }
    },
  },
});
