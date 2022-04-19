<template>
  <div>
    <Switch
      v-model="mode"
      :class="mode ? 'bg-teal-900' : 'bg-teal-700'"
      class="relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="mode ? 'translate-x-9' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"
      />
    </Switch>
  </div>
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
import { Switch } from "@headlessui/vue";

const searchStore = useSearchStore();
const errorStore = useErrorStore();

const mode = ref<boolean>();
const pokemonNameRegex = /^[a-zA-Z]+$/;
const searchInput = ref("");

const handleSearchForm = () => {
  pokemonNameRegex.test(searchInput.value)
    ? searchStore.searchPokeApi(searchInput.value.toLowerCase())
    : errorStore.displayError("Please enter a valid pokemon name");
};
</script>
