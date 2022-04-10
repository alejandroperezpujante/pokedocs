<template>
  <main class="grid gap-24">
    <div class="grid gap-4 m-6">
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
            class="block w-full border-0 border-b-2 border-purple-400"
            maxlength="21"
            v-model="displayName"
          />
          <div class="ml-auto">
            <input
              type="submit"
              :class="{
                'opacity-50': displayName === authStore.user?.displayName,
              }"
              class="p-2 ml-2 text-white transition bg-purple-400 rounded-lg hover:cursor-pointer hover:scale-105"
              :disabled="displayName === authStore.user?.displayName"
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
    <div class="grid place-content-center">
      <h2>My Pokemons will be displayed here</h2>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { AtSymbolIcon, LockClosedIcon, UserIcon } from "@heroicons/vue/solid";

onMounted(() => {
  watch(
    () => authStore.user,
    (user) => {
      if (user) {
        displayName.value = user.displayName;
        email.value = user.email;
      }
    },
    { immediate: true }
  );
});

const authStore = useAuthStore();

const email = ref();
const displayName = ref();
const currentPassword = ref();
const newPassword = ref();

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
