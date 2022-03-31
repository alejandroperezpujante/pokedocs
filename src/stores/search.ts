import { defineStore } from "pinia";
import axios from "axios";

interface State {
  content:
    | undefined
    | {
        id: number;
        name: string;
        sprite: string;
        type: Array<string>;
        height: number;
        weight: number;
        abilities: Array<string>;
        stats: Array<{ name: string; value: number }>;
      };
}

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const useSearchStore = defineStore("search", {
  state: (): State => ({
    content: undefined,
  }),
  actions: {
    async search(searchName: string) {
      this.content = (
        await axios.get(
          `http://localhost:4000/search/${searchName.toLowerCase()}`
        )
      ).data;
    },
  },
});
