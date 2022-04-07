<template>
  <nav class="flex p-2 font-bold rounded-md shadow-md gap-x-2">
    <div v-if="authStore.user" class="flex gap-x-2">
      <RouterLink to="/search">Search</RouterLink>
      <span>|</span>
      <RouterLink to="/create">Create</RouterLink>
      <span>|</span>
      <RouterLink to="/profile">Profile</RouterLink>
      <span>|</span>
      <button @click="authStore.logout()" class="font-bold">Log Out</button>
    </div>

    <div v-if="!authStore.user" class="flex gap-x-2">
      <RouterLink to="/register">Register</RouterLink>
      <span>|</span>
      <RouterLink to="/login">Log In</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>
