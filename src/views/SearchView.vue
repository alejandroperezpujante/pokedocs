<template>
  <main class="grid gap-12 p-4">
    <ErrorMessageComponent />
    <SearchForm />
    <SearchDisplay />
  </main>
</template>

<script setup lang="ts">
import SearchForm from "@/components/Search/SearchForm.vue";
import ErrorMessageComponent from "@/components/ErrorMessageComponent.vue";
import SearchDisplay from "@/components/Search/SearchDisplay.vue";
</script>
