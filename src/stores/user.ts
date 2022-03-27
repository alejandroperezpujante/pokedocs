import { defineStore } from "pinia";
import router from "@/router";

interface State {
  username: string;
  token: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    username: "",
    token: null,
  }),
  actions: {
    async logIn() {
      this.username = "Alejandro";
      this.token = "sdbfkjasbdkf";
      router.push("/");
    },
    async logOut() {
      this.username = "";
      this.token = null;
      router.push("/auth");
    },
  },
});
