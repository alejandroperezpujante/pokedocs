import { defineStore } from "pinia";
import router from "@/router";

interface State {
  name: undefined | string;
  username: undefined | string;
  email: undefined | string;
  token: undefined | string;
}

export const useAuthStore = defineStore("user", {
  state: (): State => ({
    name: "",
    username: "Alex",
    email: "",
    token: "asdasd",
  }),
  actions: {
    async logIn() {
      this.username = "Alejandro";
      this.token = "sdbfkjasbdkf";
      router.push("/");
    },
    async logOut() {
      this.username = "";
      this.token = undefined;
      router.push("/auth");
    },
  },
});
