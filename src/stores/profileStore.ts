import { defineStore } from "pinia";
import type { createStoreStateType } from "@/stores/createStore";

interface profileStoreStateType {
  pokemons: createStoreStateType[] | undefined;
}

export const useProfileStore = defineStore({
  id: "profileStore",
  state: () => ({
    pokemons: undefined,
  }),
  getters: {},
  actions: {},
});
