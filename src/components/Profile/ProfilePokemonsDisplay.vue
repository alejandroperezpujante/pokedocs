<template>
  <div
    v-if="profileStore.pokemons"
    class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 place-content-center"
  >
    <div
      v-for="(pokemon, key) in profileStore.pokemons"
      :key="key"
      class="flex flex-col items-center justify-center gap-4 p-4 border rounded-lg"
    >
      <div class="flex flex-col items-center justify-center gap-2">
        <h2 class="text-4xl">
          {{ pokemon.name }}
        </h2>
        <img
          :src="`${pokemon.sprite}`"
          class="object-cover w-16 h-auto bg-gray-100 rounded-lg"
          :alt="`Sprite of ${pokemon.name}`"
        />
      </div>
      <RouterLink
        :to="`/pokemon/${pokemon.id}`"
        class="p-2 bg-teal-300 rounded-md"
        >Details</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useProfileStore } from "@/stores/profileStore";

const profileStore = useProfileStore();
</script>
