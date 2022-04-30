<template>
  <div class="grid gap-2 mt-4 sm:grid-cols-2">
    <div class="grid gap-2">
      <div class="mx-auto">
        <h2 class="text-4xl">
          {{ createStore.name }}
        </h2>
      </div>
      <div class="w-12 h-12 mx-auto">
        <img
          :src="`${createStore.sprite || '/default_avatar.png'}`"
          class="object-cover bg-gray-100 rounded-lg"
          :alt="`Sprite of ${createStore.name}`"
        />
      </div>
      <div class="grid grid-flow-col gap-2 p-2 bg-teal-300 rounded-md">
        <div>
          <div class="flex items-center gap-1">
            <p class="text-white">Height</p>
            <p v-if="createStore.height.toString().length < 2" class="text-sm">
              0.{{ createStore.height }} m
            </p>
            <p v-else class="text-sm">{{ createStore.height }} m</p>
          </div>
          <div class="flex items-center gap-1">
            <p class="text-white">Weight</p>
            <p class="text-sm">{{ createStore.weight }} Kg</p>
          </div>
        </div>
        <div>
          <p class="text-white">Abilities</p>
          <p v-for="(ability, key) in createStore.abilities" :key="key">
            {{ ability }}
          </p>
        </div>
      </div>
    </div>
    <div class="grid gap-2">
      <div class="p-2 rounded-md bg-amber-300">
        <h2 class="text-xl">Stats</h2>
        <div class="grid gap-1">
          <div v-for="(stat, key) in createStore.stats" :key="key">
            <div class="flex items-center gap-1">
              <p class="text-white">
                {{ stat.name }}
              </p>
              <p class="text-sm">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2 bg-purple-400 rounded-md">
        <h2 class="text-xl text-white">Type/s</h2>
        <div class="gap-2 sm:flex">
          <p v-for="(type, key) in createStore.types" :key="key">
            {{ type }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <input
    type="submit"
    class="p-2 mx-auto border rounded-md w-fit hover:cursor-pointer"
    value="Create Pokemon"
  />
</template>

<script setup lang="ts">
import { useCreateStore } from "@/stores/createStore";

const createStore = useCreateStore();
</script>
