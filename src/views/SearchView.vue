<template>
  <main class="grid gap-12">
    <Transition name="errorTip">
      <div
        v-if="isSearchError"
        class="absolute left-0 right-0 px-4 py-2 mx-auto text-center text-white bg-red-500 rounded-lg bottom-3/4 w-fit"
      >
        <p>{{ searchErrorMessage }}</p>
      </div>
    </Transition>
    <form
      @submit.prevent="handleSearchWithPokeApi"
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
    <div class="grid gap-2 sm:grid-cols-2" v-if="searchStore.searchResults">
      <div class="grid gap-2">
        <div class="mx-auto">
          <h2 class="text-4xl">
            {{
              searchStore.searchResults.name[0].toUpperCase() +
              searchStore.searchResults.name.slice(1)
            }}
          </h2>
          <p class="font-mono text-gray-400">
            #{{ searchStore.searchResults.id.toString().padStart(3, "0") }}
          </p>
          <img
            :src="(searchStore.searchResults.sprite as string)"
            class="bg-gray-100 rounded-lg"
            :alt="`Sprite of ${searchStore.searchResults.name}`"
          />
        </div>
        <div class="grid grid-flow-col gap-2 p-2 bg-teal-300 rounded-md">
          <div>
            <div class="flex items-center gap-1">
              <p class="text-white">Height</p>
              <p
                v-if="searchStore.searchResults.height.toString().length < 2"
                class="text-sm"
              >
                0.{{ searchStore.searchResults.height }} m
              </p>
              <p v-else class="text-sm">
                {{ searchStore.searchResults.height }} m
              </p>
            </div>
            <div class="flex items-center gap-1">
              <p class="text-white">Weight</p>
              <p class="text-sm">{{ searchStore.searchResults.weight }} Kg</p>
            </div>
          </div>
          <div>
            <p class="text-white">Abilities</p>
            <p
              v-for="(ability, key) in searchStore.searchResults.abilities"
              :key="key"
            >
              {{ ability[0].toUpperCase() + ability.slice(1) }}
            </p>
          </div>
        </div>
      </div>
      <div class="grid gap-2">
        <div class="p-2 rounded-md bg-amber-300">
          <h2 class="text-xl">Stats</h2>
          <div class="grid gap-1">
            <div
              v-for="(stat, key) in searchStore.searchResults.stats"
              :key="key"
            >
              <div class="flex items-center gap-1">
                <p class="text-white">
                  {{ stat.name[0].toUpperCase() + stat.name.slice(1) }}
                </p>
                <p class="text-sm">{{ stat.base_stat }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-2 bg-purple-400 rounded-md">
          <h2 class="text-xl text-white">Type/s</h2>
          <p v-for="(type, key) in searchStore.searchResults.types" :key="key">
            {{ type[0].toUpperCase() + type.slice(1) }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSearchStore } from "@/firebase/search";

const searchStore = useSearchStore();

const pokemonNameRegex = /^[a-zA-Z]+$/;
const searchInput = ref("");
const isSearchError = ref(false);
const searchErrorMessage = ref("");

const handleSearchWithPokeApi = () => {
  pokemonNameRegex.test(searchInput.value)
    ? searchStore.searchPokeApi(searchInput.value.toLowerCase())
    : handleSearchError("Pokemon name must be alphabetic");
};

const handleSearchError = (error: any) => {
  isSearchError.value = true;
  searchErrorMessage.value = error;
  setTimeout(() => {
    isSearchError.value = false;
    searchErrorMessage.value = "";
  }, 3000);
};
</script>

<style scoped>
.errorTip-enter-active,
.errorTip-leave-active {
  transition: all 0.3s ease-in-out;
}

.errorTip-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.errorTip-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
