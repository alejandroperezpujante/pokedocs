<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>

<template>
  <main>
    <h1>This is the main view</h1>
    <p>
      The counter is at: <span>{{ counter.counter }}</span>
    </p>
    <button @click="counter.increment" class="border bg-blue-400 p-1 rounded">
      Add 1
    </button>
  </main>
</template>
