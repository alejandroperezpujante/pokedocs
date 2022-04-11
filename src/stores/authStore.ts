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

interface userData {
  user: User | null;
  isAuthenticating: boolean;
}

interface authFormData {
  email: string;
  password: string;
}

export const useAuthStore = defineStore({
  id: "auth",
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
    async loginWithEmailAndPassword(loginData: authFormData) {
      const { email, password } = loginData;
      try {
        this.isAuthenticating = true;
        await signInWithEmailAndPassword(firebaseAuth, email, password);
        this.setUser(firebaseAuth.currentUser as User);
        router.push("/profile");
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
      } finally {
        this.isAuthenticating = false;
      }
    },
    async registerWithEmailAndPassword(registerData: authFormData) {
      const { email, password } = registerData;
      try {
        this.isAuthenticating = true;
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        this.setUser(firebaseAuth.currentUser as User);
        router.push("/profile");
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
    async fetchUser() {
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (!user) {
          this.clearUser;
          router.push("/about");
        } else {
          this.setUser(user);
          if (
            router.currentRoute.value.path === "/login" ||
            router.currentRoute.value.path === "/register"
          ) {
            router.push("/profile");
          }
        }
      });
    },
  },
});
