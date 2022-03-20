<template>
  <div class="flex flex-col gap-y-4">
    <h1>Search for a Pokemon!</h1>
    <div class="flex gap-x-4">
      <form></form>
      <input type="text" class="p-1 border rounded" v-model="inputText">
      <button type="submit" class="p-1 bg-white border rounded">Search</button>
    </div>
    {{ inputText }}
  </div>
</template>

<script setup lang="ts">
const inputText = ref('')
</script>
