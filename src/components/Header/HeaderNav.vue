<template>
  <nav class="flex p-2 rounded-md shadow-md gap-x-2">
    <router-link
      to="/"
      class="text-lg transition-transform hover:-translate-y-1"
      >Search</router-link
    >
    {{ "|" }}
    <router-link
      to="/create"
      class="text-lg transition-transform hover:-translate-y-1"
      >Create</router-link
    >
    {{ "|" }}
    <span
      v-if="user.token"
      class="text-lg transition-transform hover:-translate-y-1 hover:cursor-pointer"
      @click="user.logOut()"
      >Log Out, {{ user.username }}</span
    >
    <router-link
      v-else
      to="/auth"
      class="text-lg transition-transform hover:-translate-y-1"
      >Auth</router-link
    >
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const user = useUserStore();
</script>
