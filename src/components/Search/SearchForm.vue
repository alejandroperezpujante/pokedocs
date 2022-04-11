<template>
  <form
    @submit.prevent="handleSearchForm"
    class="flex items-center justify-center gap-2"
  >
    <div>
      <label for="pokemonName" class="sr-only"></label>
      <input
        type="text"
        name="pokemonName"
        id="pokemonName"
        class="p-2 border-0 border-b-2 border-b-purple-400 focus:ring-0 focus:border-purple-400"
        placeholder="Pokemon name"
        v-model="searchInput"
      />
    </div>
    <input
      type="submit"
      :disabled="!searchInput"
      :class="{ 'opacity-50': !searchInput }"
      class="p-2 font-bold text-white transition bg-purple-300 border rounded-lg"
      value="Search"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import { useErrorStore } from "@/stores/errorStore";

const searchStore = useSearchStore();
const errorStore = useErrorStore();

const pokemonNameRegex = /^[a-zA-Z]+$/;
const searchInput = ref("");

const handleSearchForm = () => {
  pokemonNameRegex.test(searchInput.value)
    ? searchStore.searchPokeApi(searchInput.value.toLowerCase())
    : errorStore.displayError("Please enter a valid pokemon name");
};
</script>
