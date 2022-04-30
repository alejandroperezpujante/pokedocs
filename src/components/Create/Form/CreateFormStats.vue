<template>
  <h2 class="font-mono text-3xl text-center">Stats</h2>
  <div class="grid grid-cols-2 gap-4 mx-auto sm:grid-cols-3">
    <div class="grid w-fit">
      <label for="hp">HP</label>
      <input
        type="number"
        name="hp"
        placeholder="HP"
        v-model.number="createStore.stats[0].value"
      />
    </div>
    <div class="grid w-fit">
      <label for="attack">Attack</label>
      <input
        type="number"
        name="attack"
        placeholder="Attack"
        v-model.number="createStore.stats[1].value"
      />
    </div>
    <div class="grid w-fit">
      <label for="defense">Defense</label>
      <input
        type="number"
        name="defense"
        placeholder="Defense"
        v-model.number="createStore.stats[2].value"
      />
    </div>
    <div class="grid w-fit">
      <label for="special_attack">Special Attack</label>
      <input
        type="number"
        name="special_attack"
        placeholder="Special Attack"
        v-model.number="createStore.stats[3].value"
      />
    </div>
    <div class="grid w-fit">
      <label for="special_defense">Special Defense</label>
      <input
        type="number"
        name="special_defense"
        placeholder="Special Defense"
        v-model.number="createStore.stats[4].value"
      />
    </div>
    <div class="grid w-fit">
      <label for="speed">Speed</label>
      <input
        type="number"
        name="speed"
        placeholder="Speed"
        v-model.number="createStore.stats[5].value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateStore } from "@/stores/createStore";
const createStore = useCreateStore();
</script>

<style scoped>
input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
