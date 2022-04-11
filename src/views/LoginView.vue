<template>
  <main class="grid gap-y-6">
    <ErrorMessageComponent />
    <LoadingIcon />
    <AuthGoogleComponent mode="login" />
    <AuthFormComponent mode="login" />
  </main>
</template>

<script setup lang="ts">
import ErrorMessageComponent from "@/components/ErrorMessageComponent.vue";
import AuthGoogleComponent from "@/components/Auth/AuthGoogleComponent.vue";
import AuthFormComponent from "@/components/Auth/AuthFormComponent.vue";
import LoadingIcon from "@/components/Icons/LoadingIcon.vue";
</script>
