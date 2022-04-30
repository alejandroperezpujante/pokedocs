import { defineStore } from "pinia";
import { useErrorStore } from "@/stores/errorStore";
import { firebaseDb, firebaseAuth, firebaseStorage } from "@/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import router from "@/router";

export interface createStoreStateType {
  name: string;
  sprite: string | ArrayBuffer | null;
  rawSprite: File | undefined;
  stats: { name: string; value: number }[];
  weight: number;
  height: number;
  types: string[];
  abilities: string[];
}

export const useCreateStore = defineStore({
  id: "createStore",
  state: (): createStoreStateType => ({
    name: "",
    weight: 0,
    height: 0,
    stats: [
      { name: "HP", value: 0 },
      { name: "Attack", value: 0 },
      { name: "Defense", value: 0 },
      { name: "Special Attack", value: 0 },
      { name: "Special Defense", value: 0 },
      { name: "Speed", value: 0 },
    ],
    types: [""],
    abilities: [""],
    sprite: "",
    rawSprite: undefined,
  }),
  getters: {
    getAbilitiesLength(state): number {
      return state.abilities.length;
    },
    getTypesLength(state): number {
      return state.types.length;
    },
  },
  actions: {
    clearForm(): void {
      this.$state.name = "";
      this.$state.weight = 0;
      this.$state.height = 0;
      this.$state.stats = [
        { name: "HP", value: 0 },
        { name: "Attack", value: 0 },
        { name: "Defense", value: 0 },
        { name: "Special Attack", value: 0 },
        { name: "Special Defense", value: 0 },
        { name: "Speed", value: 0 },
      ];
      this.$state.types = [""];
      this.$state.abilities = [""];
      this.$state.sprite = "";
      this.$state.rawSprite = undefined;
    },
    async createPokemon(): Promise<void> {
      try {
        await addDoc(collection(firebaseDb, "pokemons"), {
          userUid: firebaseAuth.currentUser?.uid,
          name: this.name,
          weight: this.weight,
          height: this.height,
          stats: this.stats,
          types: this.types,
          abilities: this.abilities,
          sprite: await this.uploadPokemonSprite(),
        });
        this.clearForm();
        router.push("/profile");
      } catch (error) {
        const errorStore = useErrorStore();
        errorStore.displayError("Your pokemon could not be created, try again");
      }
    },
    async uploadPokemonSprite(): Promise<string | void> {
      const storageRef = ref(
        firebaseStorage,
        `pokemonsSprites/${firebaseAuth.currentUser?.uid}/${this.name}`
      );
      try {
        await uploadBytes(storageRef, this.rawSprite as File);
        return await getDownloadURL(storageRef);
      } catch (error) {
        const errorStore = useErrorStore();
        errorStore.displayError("The sprite could't be uploaded");
      }
    },
  },
});
