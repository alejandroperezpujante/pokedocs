<template>
  <h2 class="font-mono text-3xl text-center">Basic Info</h2>
  <div class="flex flex-col gap-4 mx-auto w-fit sm:flex-row">
    <div class="grid">
      <label for="name">Name</label>
      <input type="text" name="name" v-model="createStore.name" />
    </div>
    <div class="grid">
      <label for="height">Height</label>
      <input type="number" name="height" v-model.number="createStore.height" />
    </div>
    <div class="grid">
      <label for="weight">Weight</label>
      <input type="number" name="weight" v-model.number="createStore.weight" />
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
