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
          {{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            pokemon.name
          }}
        </h2>
        <img
          :src="`${
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            pokemon.sprite
          }`"
          class="object-cover w-16 h-auto bg-gray-100 rounded-lg"
          :alt="`Sprite of ${
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            pokemon.name
          }`"
        />
      </div>
      <button
        @click="
          profileStore.deletePokemon(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            pokemon.id
          )
        "
        class="p-1 font-bold text-white transition bg-red-500 rounded-lg hover:scale-110"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from "@/stores/profileStore";

const profileStore = useProfileStore();
</script>
