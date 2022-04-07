<template>
  <main class="grid gap-24">
    <div class="grid gap-4">
      <h1 class="text-5xl">Welcome, {{ displayName }}</h1>
      <form @submit.prevent="handleEmailUpdate">
        <div class="flex items-center w-full">
          <AtSymbolIcon class="inline-block mr-1 h-7" />
          <label for="email" class="sr-only"></label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            class="block w-full"
            v-model="email"
          />
          <div class="ml-auto">
            <input
              type="submit"
              :class="{
                'opacity-50': email === authStore.user?.email,
              }"
              :disabled="email === authStore.user?.email"
              class="p-2 ml-2 text-white transition bg-purple-400 rounded-lg hover:cursor-pointer hover:scale-105"
              value="Change email"
            />
          </div>
        </div>
      </form>
      <hr class="w-3/4 mx-auto border rounded-full" />
      <form @submit.prevent="handleDisplayNameUpdate">
        <div class="flex items-center w-full">
          <UserIcon class="inline-block mr-1 h-7" />
          <label for="displayName" class="sr-only"></label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            placeholder="username"
            autocomplete="username"
            class="block w-full"
            maxlength="21"
            v-model="displayName"
          />
          <div class="ml-auto">
            <input
              type="submit"
              :class="{
                'opacity-50': displayName === authStore.user?.displayName,
                disabled: displayName === authStore.user?.displayName,
              }"
              class="p-2 ml-2 text-white transition bg-purple-400 rounded-lg hover:cursor-pointer hover:scale-105"
              value="Change username"
            />
          </div>
        </div>
      </form>
      <hr class="w-3/4 mx-auto border rounded-full" />
      <form @submit.prevent="handleUpdatePassword">
        <div class="flex items-center w-full">
          <LockClosedIcon class="inline-block h-5 mr-1" />
          <div class="flex gap-1">
            <label for="currentPassword" class="sr-only"></label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              autocomplete="current-password"
              class="block w-full"
              v-model="currentPassword"
            />
            <label for="newPassword" class="sr-only"></label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New Password"
              autocomplete="new-password"
              class="block w-full"
              v-model="newPassword"
            />
          </div>
          <div class="ml-auto">
            <input
              type="submit"
              :class="{
                'opacity-50': !currentPassword || !newPassword,
                disabled: !currentPassword || !newPassword,
              }"
              class="p-2 ml-2 text-white transition bg-purple-400 rounded-lg hover:cursor-pointer hover:scale-105"
              value="Change password"
            />
          </div>
        </div>
      </form>
    </div>
    <div class="grid place-content-center">
      <h2>My Pokemons will be displayed here</h2>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { AtSymbolIcon, LockClosedIcon, UserIcon } from "@heroicons/vue/solid";

const authStore = useAuthStore();

const email = ref(authStore.user?.email);
const displayName = ref(authStore.user?.displayName);
const currentPassword = ref(undefined);
const newPassword = ref(undefined);

const handleEmailUpdate = () => {
  email.value && email.value !== authStore.user?.email
    ? authStore.updateEmail(email.value)
    : alert("You have already used this email");
};

const handleDisplayNameUpdate = () => {
  displayName.value && displayName.value !== authStore.user?.displayName
    ? authStore.updateDisplayName(displayName.value)
    : alert("Username is the same");
};

const handleUpdatePassword = () => {
  newPassword.value && currentPassword.value !== newPassword.value
    ? authStore.updatePassword(newPassword.value)
    : alert("Passwords are the same");
};
</script>
