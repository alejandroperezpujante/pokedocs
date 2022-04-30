<template>
  <main class="grid gap-24">
    <div class="grid gap-4 m-6">
      <h1 class="text-5xl">Welcome, {{ username }}</h1>
      <form @submit.prevent="handleUpdateEmail">
        <div class="flex items-center w-full">
          <AtSymbolIcon class="inline-block mr-1 h-7" />
          <label for="email" class="sr-only"></label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            class="block w-full border-0 border-b-2 border-purple-400"
            v-model="email"
          />
          <div class="ml-auto">
            <input
              type="submit"
              :class="{
                'opacity-50': email === authStore.user?.email,
              }"
              class="p-2 ml-2 text-white transition bg-purple-400 rounded-lg hover:cursor-pointer hover:scale-105"
              :disabled="email === authStore.user?.email"
              value="Change email"
            />
          </div>
        </div>
      </form>
      <form @submit.prevent="handleUpdateUsername">
        <div class="flex items-center w-full">
          <UserIcon class="inline-block mr-1 h-7" />
          <label for="username" class="sr-only"></label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="username"
            autocomplete="username"
            class="block w-full border-0 border-b-2 border-purple-400"
            maxlength="21"
            v-model="username"
          />
          <div class="ml-auto">
            <input
              type="submit"
              :class="{
                'opacity-50': username === authStore.user?.displayName,
              }"
              class="p-2 ml-2 text-white transition bg-purple-400 rounded-lg hover:cursor-pointer hover:scale-105"
              :disabled="username === authStore.user?.displayName"
              value="Change username"
            />
          </div>
        </div>
      </form>
      <form @submit.prevent="handleUpdatePassword">
        <div class="flex items-center w-full">
          <LockClosedIcon class="inline-block h-5 mr-1" />
          <div class="flex flex-col gap-2 sm:flex-row">
            <label for="currentPassword" class="sr-only"></label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              autocomplete="current-password"
              class="block w-full border-0 border-b-2 border-purple-400"
              v-model="currentPassword"
            />
            <label for="newPassword" class="sr-only"></label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New Password"
              autocomplete="new-password"
              class="block w-full border-0 border-b-2 border-purple-400"
              v-model="newPassword"
            />
          </div>
          <div class="ml-auto">
            <input
              type="submit"
              :class="{
                'opacity-50': !currentPassword || !newPassword,
              }"
              class="p-2 ml-2 text-white transition bg-purple-400 rounded-lg hover:cursor-pointer hover:scale-105"
              :disabled="!currentPassword || !newPassword"
              value="Change password"
            />
          </div>
        </div>
      </form>
    </div>
    <ProfilePokemonsDisplay />
  </main>
</template>

<script setup lang="ts">
// Vue methods
import { ref, watch, onBeforeMount } from "vue";

// Pinia stores
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";

// Firebase instances and methods
import { firebaseDb } from "@/firebase";
import { collection, query, where, onSnapshot } from "@firebase/firestore";

// Vue components
import { AtSymbolIcon, LockClosedIcon, UserIcon } from "@heroicons/vue/solid";
import ProfilePokemonsDisplay from "@/components/Profile/ProfilePokemonsDisplay.vue";

// Watcher for user data and Firestore data
onBeforeMount(async () => {
  watch(
    () => authStore.user,
    async (user) => {
      if (user) {
        username.value = user.displayName;
        email.value = user.email;
        if (!profileStore.pokemons) {
          const docRef = collection(firebaseDb, "pokemons");
          const q = query(docRef, where("userUid", "==", authStore.user?.uid));
          try {
            onSnapshot(q, (snapshot) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              profileStore.pokemons = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
              });
            });
          } catch (e) {
            return;
          }
        }
      }
    },
    { immediate: true }
  );
});

const authStore = useAuthStore();
const profileStore = useProfileStore();

const email = ref();
const username = ref();
const currentPassword = ref();
const newPassword = ref();

const handleUpdateEmail = async () => {
  email.value && email.value !== authStore.user?.email
    ? await profileStore.changeUserEmail(email.value)
    : alert("You have already used this email");
};

const handleUpdateUsername = async () => {
  username.value && username.value !== authStore.user?.displayName
    ? await profileStore.changeUserUsername(username.value)
    : alert("Username is the same");
};

const handleUpdatePassword = async () => {
  newPassword.value && currentPassword.value !== newPassword.value
    ? await profileStore.changeUserPassword(newPassword.value)
    : alert("Passwords are the same");
};
</script>
