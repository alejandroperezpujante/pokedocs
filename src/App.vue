<template>
  <HeaderComponent />
  <RouterView />
  <FooterComponent />
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

const authStore = useAuthStore();

onBeforeMount(() => {
  authStore.fetchUser();
});
</script>
