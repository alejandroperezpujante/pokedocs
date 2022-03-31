<template>
  <div
    class="flex flex-col p-4 mx-2 mb-4 rounded-md shadow-md sm:flex-row gap-y-2 sm:gap-x-10"
  >
    <div class="flex gap-x-4 sm:flex-col sm:gap-y-2">
      <div>
        <p class="text-4xl">
          {{ capitalizeFirstLetter(searchStore.content.name) }}
        </p>
        <p class="font-mono text-neutral-400">
          #{{ searchStore.content.id.toString().padStart(3, 0) }}
        </p>
        <img
          :src="searchStore.content.sprite"
          :alt="`A ${searchStore.content.name} image`"
          class="rounded-md bg-neutral-100 sm:w-32 sm:h-32"
        />
      </div>
      <div class="flex p-2 mt-auto bg-blue-400 rounded-md sm:gap-x-3 h-fit">
        <div>
          <p v-if="searchStore.content.height.toString().length === 1">
            <span class="font-bold text-white">Height</span> 0,{{
              searchStore.content.height
            }}
            m
          </p>
          <p v-else>
            <span class="font-bold text-white">Height</span>
            {{ searchStore.content.height }} m
          </p>
          <p>
            <span class="font-bold text-white">Weight</span>
            {{ searchStore.content.weight }} Kg
          </p>
        </div>
        <div>
          <p class="font-bold text-white">Abilities</p>
          <p v-for="(ability, key) in searchStore.content.abilities" :key="key">
            {{ capitalizeFirstLetter(ability) }}
          </p>
        </div>
      </div>
    </div>
    <div class="grid gap-y-2">
      <div class="p-2 rounded-md bg-neutral-300 h-fit">
        <p v-for="(stat, key) in searchStore.content.stats" :key="key">
          <span class="font-bold text-white">{{
            capitalizeFirstLetter(stat.name)
          }}</span>
          {{ stat.value }}
        </p>
      </div>

      <div class="p-2 bg-purple-400 rounded-md">
        <p class="font-bold text-white">Type/s</p>
        <p v-for="(type, key) in searchStore.content.type" :key="key">
          {{ capitalizeFirstLetter(type) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from "@/stores/search";

const searchStore = useSearchStore();
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
</script>
