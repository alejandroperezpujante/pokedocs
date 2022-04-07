import { defineStore } from "pinia";
import router from "@/router";
import { firebaseAuth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
  updatePassword,
  type User,
} from "@firebase/auth";

export const useAuthStore = defineStore({
  id: "counter",
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
    async loginWithEmailAndPassword(loginData: {
      email: string;
      password: string;
    }) {
      const { email, password } = loginData;
      try {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
      } catch (error) {
        switch (error) {
          case "auth/missing-email":
            return "Please enter an email address";
          case "auth/wrong-password":
            return "Incorrect password";
          case "auth/invalid-email":
            return "Invalid email";
          default:
            return "Email or password was incorrect";
        }
      }
      this.setUser(firebaseAuth.currentUser);
      router.push("/search");
    },
    async registerWithEmailAndPassword(registerData: {
      email: string;
      password: string;
    }) {
      const { email, password } = registerData;
      try {
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
      } catch (error) {
        switch (error) {
          case "auth/email-already-in-use":
            return "Email already in use";
          case "auth/invalid-email":
            return "Invalid email";
          case "auth/weak-password":
            return "Password is too weak";
          case "auth/operation-not-allowed":
            return "Operation not allowed";
          default:
            return "Email or password was incorrect";
        }
      }
      this.setUser(firebaseAuth.currentUser);
      router.push("/search");
    },
    async logInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(firebaseAuth, provider);
      } catch (error) {
        alert(error);
      }
    },
    async logout() {
      await signOut(firebaseAuth);
      this.clearUser();
      router.push("/about");
    },
    async updateEmail(email: string) {
      try {
        await updateEmail(firebaseAuth.currentUser as User, email);
      } catch (error) {
        alert(error);
      }
    },
    async updateDisplayName(displayName: string) {
      try {
        await updateProfile(firebaseAuth.currentUser as User, {
          displayName,
        });
      } catch (error) {
        alert(error);
      }
    },
    async updatePassword(password: string) {
      try {
        await updatePassword(firebaseAuth.currentUser as User, password);
      } catch (error) {
        alert(error);
      }
    },
    fetchUser() {
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user === null) {
          this.clearUser();
        } else {
          this.setUser(user);
          if (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            router.isReady() &&
            (router.currentRoute.value.path === "/login" ||
              router.currentRoute.value.path === "/register")
          ) {
            router.push("/profile");
          }
        }
      });
    },
  },
});
