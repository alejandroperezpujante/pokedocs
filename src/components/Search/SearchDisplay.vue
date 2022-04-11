<template>
  <div class="grid gap-4 place-content-center">
    <LoadingIcon />
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
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from "@/stores/searchStore";
import LoadingIcon from "@/components/Icons/LoadingIcon.vue";

const searchStore = useSearchStore();
</script>
