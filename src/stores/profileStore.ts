import { defineStore } from "pinia";
import { useErrorStore } from "@/stores/errorStore";
import { useAuthStore } from "@/stores/authStore";
import router from "@/router";
import { firebaseAuth, firebaseDb } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import axios from "axios";

interface profileStoreState {
  pokemons:
    | undefined
    | {
        id: string;
        name: string;
        sprite: string;
        stats: { name: string; value: number }[];
        weight: number;
        height: number;
        types: string[];
        abilities: string[];
      };
}

export const useProfileStore = defineStore({
  id: "profileStore",
  state: (): profileStoreState => ({
    pokemons: undefined,
  }),
  actions: {
    async changeUserEmail(newEmail: string): Promise<void> {
      if (!newEmail) {
        const errorStore = useErrorStore();
        return errorStore.displayError("The new email is required");
      }

      const idToken = await firebaseAuth.currentUser?.getIdToken();
      const userUid = firebaseAuth.currentUser?.uid;
      if (!idToken || !userUid) {
        const errorStore = useErrorStore();
        return errorStore.displayError("The user is not logged in");
      }

      let axiosUrl: string;
      import.meta.env.PROD
        ? (axiosUrl =
            "https://europe-west1-pokedocs-85955.cloudfunctions.net/changeUserEmail")
        : (axiosUrl =
            "http://localhost:5001/pokedocs-85955/europe-west1/changeUserEmail");
      const axiosAuthHeader = {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      const axiosBody = {
        newEmail,
        userUid,
      };

      const response = await axios.post(axiosUrl, axiosBody, axiosAuthHeader);
      if (response.status !== 200) {
        const errorStore = useErrorStore();
        return errorStore.displayError(response.data.error);
      }
      const authStore = useAuthStore();
      authStore.logout();
      router.push("/login");
    },
    async changeUserPassword(newPassword: string): Promise<void> {
      if (!newPassword) {
        const errorStore = useErrorStore();
        return errorStore.displayError("The new email is required");
      }

      const idToken = await firebaseAuth.currentUser?.getIdToken();
      const userUid = firebaseAuth.currentUser?.uid;
      if (!idToken || !userUid) {
        const errorStore = useErrorStore();
        return errorStore.displayError("The user is not logged in");
      }

      let axiosUrl: string;
      import.meta.env.PROD
        ? (axiosUrl =
            "https://europe-west1-pokedocs-85955.cloudfunctions.net/changeUserPassword")
        : (axiosUrl =
            "http://localhost:5001/pokedocs-85955/europe-west1/changeUserPassword");
      const axiosAuthHeader = {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      const axiosBody = {
        newPassword,
        userUid,
      };

      const response = await axios.post(axiosUrl, axiosBody, axiosAuthHeader);
      if (response.status !== 200) {
        const errorStore = useErrorStore();
        return errorStore.displayError(response.data.error);
      }
      const authStore = useAuthStore();
      authStore.logout();
      router.push("/login");
    },
    async changeUserUsername(newUsername: string): Promise<void> {
      if (!newUsername) {
        const errorStore = useErrorStore();
        return errorStore.displayError("The new email is required");
      }

      const idToken = await firebaseAuth.currentUser?.getIdToken();
      const userUid = firebaseAuth.currentUser?.uid;
      if (!idToken || !userUid) {
        const errorStore = useErrorStore();
        return errorStore.displayError("The user is not logged in");
      }

      let axiosUrl: string;
      import.meta.env.PROD
        ? (axiosUrl =
            "https://europe-west1-pokedocs-85955.cloudfunctions.net/changeUserEmail")
        : (axiosUrl =
            "http://localhost:5001/pokedocs-85955/europe-west1/changeUserUsername");
      const axiosAuthHeader = {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      const axiosBody = {
        newUsername,
        userUid,
      };

      const response = await axios.post(axiosUrl, axiosBody, axiosAuthHeader);
      if (response.status !== 200) {
        const errorStore = useErrorStore();
        return errorStore.displayError(response.data.error);
      }
      const authStore = useAuthStore();
      authStore.logout();
      router.push("/login");
    },
    async deletePokemon(documentId: string): Promise<void> {
      try {
        await deleteDoc(doc(firebaseDb, "pokemons", documentId));
      } catch (error) {
        const errorStore = useErrorStore();
        return errorStore.displayError(
          "The pokemon could not be deleted, try again"
        );
      }
    },
  },
});
