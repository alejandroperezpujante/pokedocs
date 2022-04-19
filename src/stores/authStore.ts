import { defineStore } from "pinia";
import { firebaseAuth } from "@/firebase";
import router from "@/router";
import { useErrorStore } from "@/stores/errorStore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { useProfileStore } from "./profileStore";

interface userData {
  user: User | null;
  isAuthenticating: boolean;
}

interface registerFormData {
  email: string;
  username: string;
  password: string;
}
interface logInFormData {
  email: string;
  password: string;
}

export const useAuthStore = defineStore({
  id: "authStore",
  state: (): userData => ({
    user: null,
    isAuthenticating: false,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
    async loginWithEmailAndPassword(loginData: logInFormData) {
      const { email, password } = loginData;
      try {
        this.isAuthenticating = true;
        await signInWithEmailAndPassword(firebaseAuth, email, password);
        this.setUser(firebaseAuth.currentUser as User);
        router.push("/profile");
      } catch (error) {
        const errorStore = useErrorStore();
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case "auth/missing-email":
              errorStore.displayError("Please enter an email address");
              break;
            case "auth/wrong-password":
              errorStore.displayError("Incorrect password");
              break;
            case "auth/user-not-found":
              errorStore.displayError("This email address is not registered");
              break;
            default:
              errorStore.displayError("Email or password was incorrect");
              break;
          }
        } else {
          errorStore.displayError("An unknown error occurred");
        }
      } finally {
        this.isAuthenticating = false;
      }
    },
    async registerWithEmailAndPassword(registerData: registerFormData) {
      const { email, username, password } = registerData;
      try {
        this.isAuthenticating = true;
        // Create user and set store user to the new user
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        this.setUser(firebaseAuth.currentUser as User);

        // Set user's username
        const profileStore = useProfileStore();
        await profileStore.changeUserUsername(username);
        router.push("/profile");
      } catch (error) {
        const errorStore = useErrorStore();
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case "auth/email-already-in-use":
              errorStore.displayError("Email already in use");
              break;
            case "auth/weak-password":
              errorStore.displayError("Password is too weak");
              break;
            default:
              errorStore.displayError("Email or password was incorrect");
              break;
          }
        } else {
          errorStore.displayError("An unknown error occurred");
        }
      } finally {
        this.isAuthenticating = false;
      }
    },
    async authWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        this.isAuthenticating = true;
        await signInWithPopup(firebaseAuth, provider);
        this.setUser(firebaseAuth.currentUser as User);
        router.push("/profile");
      } catch (error) {
        alert(error);
      } finally {
        this.isAuthenticating = false;
      }
    },
    async logout() {
      await signOut(firebaseAuth);
      this.clearUser();
      router.push("/about");
    },
    async fetchUser() {
      firebaseAuth.onAuthStateChanged((user) => {
        if (!user) {
          this.clearUser;
          if (
            router.currentRoute.value.fullPath !== "/register" &&
            router.currentRoute.value.fullPath !== "/login"
          ) {
            router.push("/about");
          }
        } else {
          this.setUser(user);
          if (
            (router.currentRoute.value.path === "/login" ||
              router.currentRoute.value.path === "/register") &&
            user.emailVerified
          ) {
            router.push("/profile");
          }
        }
      });
    },
  },
});
