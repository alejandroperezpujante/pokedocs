<template>
  <main class="grid mt-12 place-content-center gap-y-6">
    <SearchInput />
    <SearchContent v-if="searchStore.content" />
  </main>
</template>

<script setup lang="ts">
import { useSearchStore } from "@/stores/search";
import SearchInput from "@/components/Search/SearchInput.vue";
import SearchContent from "@/components/Search/SearchContent.vue";

const searchStore = useSearchStore();
</script>
