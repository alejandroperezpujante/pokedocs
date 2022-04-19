<template>
  <!-- Switch component  -->
  <div class="grid place-content-center">
    <SwitchGroup>
      <div class="flex items-center">
        <SwitchLabel
          class="mr-4 font-bold transition"
          :class="{
            'scale-125': !searchStore.getSearchMode,
            'text-neutral-200': searchStore.getSearchMode,
          }"
          >PokeAPI</SwitchLabel
        >
        <Switch
          v-model="searchStore.searchMode"
          :class="searchStore.getSearchMode ? 'bg-red-500' : 'bg-teal-500'"
          class="relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <span class="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            :class="
              searchStore.getSearchMode ? 'translate-x-9' : 'translate-x-0'
            "
            class="pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"
          />
        </Switch>
        <SwitchLabel
          class="ml-4 font-bold transition"
          :class="{
            'scale-125': searchStore.getSearchMode,
            'text-neutral-200': !searchStore.getSearchMode,
          }"
          >Pokedocs</SwitchLabel
        >
      </div>
    </SwitchGroup>
  </div>
  <!-- PokeAPI Form  -->
  <form
    @submit.prevent="handleSearchForm"
    class="flex items-center justify-center gap-2"
    v-if="!searchStore.getSearchMode"
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
  <!-- Algolia Pokedocs Form  -->
  <div v-else>
    <ais-instant-search
      :search-client="searchClient"
      index-name="pokedocs_pokemons"
      class="grid gap-2 place-content-center"
    >
      <ais-search-box
        v-model="searchInput"
        @submit.prevent="handleSearchForm"
        class="flex items-center justify-center mx-auto w-fit"
      >
        <template v-slot:submit-icon>
          <input
            type="submit"
            class="p-2 ml-2 font-bold text-white transition bg-purple-300 border rounded-lg hover:cursor-pointer"
            value="Search"
          />
        </template>
      </ais-search-box>

      <ais-hits :class-names="{ 'ais-Hits-list': 'grid gap-4' }">
        <template v-slot:item="{ item }">
          <article
            @click="handleSearchClick(item.name)"
            class="flex items-center justify-center gap-2 mx-auto transition hover:cursor-pointer hover:scale-125 w-fit p-y-1"
          >
            <h1>
              <ais-highlight :hit="item" attribute="name" />
            </h1>
            <img
              :src="item.avatar"
              class="object-cover w-12 h-auto rounded-full"
            />
          </article>
        </template>
      </ais-hits>
    </ais-instant-search>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import { useErrorStore } from "@/stores/errorStore";
import { SwitchGroup, SwitchLabel, Switch } from "@headlessui/vue";
import algoliasearch from "algoliasearch/lite";
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisHighlight,
} from "vue-instantsearch/vue3/es";

const searchStore = useSearchStore();
const errorStore = useErrorStore();

const ALGOLIA_APP_ID = "AJOJXOVRS4";
const ALGOLIA_SEARCH_API_KEY = "fad6e33444616f39a040bd344da8020b";
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);

const pokemonNameRegex = /^[a-zA-Z]+$/;
const searchInput: Ref<string> = ref<string>("");

const handleSearchForm = () => {
  if (!pokemonNameRegex.test(searchInput.value)) {
    errorStore.setError("Invalid pokemon name");
    return;
  }

  !searchStore.searchMode
    ? searchStore.searchPokeApi(searchInput.value)
    : searchStore.searchPokedocs(searchInput.value);
};

const handleSearchClick = (name: string) => {
  searchStore.searchPokedocs(name);
};
</script>
