<template>
  <main class="grid gap-6">
    <ErrorMessageComponentVue />
    <LoadingIcon />
    <AuthGoogleComponent mode="register" />
    <AuthFormComponent mode="register" />
  </main>
</template>

<script setup lang="ts">
import ErrorMessageComponentVue from "@/components/ErrorMessageComponent.vue";
import AuthGoogleComponent from "@/components/Auth/AuthGoogleComponent.vue";
import AuthFormComponent from "@/components/Auth/AuthFormComponent.vue";
import LoadingIcon from "@/components/Icons/LoadingIcon.vue";
</script>
