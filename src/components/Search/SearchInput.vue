<template>
  <div class="flex justify-center">
    <form @submit.prevent="handleSearch" class="flex gap-x-4">
      <div>
        <label for="pokemon-name" class="sr-only"></label>
        <input
          id="pokemon-name"
          name="pokemon"
          type="text"
          v-model="searchName"
          placeholder="Pokemon name"
        />
      </div>
      <input type="submit" value="Search" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSearchStore } from "@/stores/search";

const searchAPI = useSearchStore();
const searchName = ref<string>("");

function handleSearch() {
  searchAPI.search(searchName.value);
}
</script>

<style scoped>
input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
