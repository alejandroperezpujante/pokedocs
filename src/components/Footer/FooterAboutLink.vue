<template>
  <RouterLink to="/about">
    <p class="inline-block font-bold">About PokeDocs</p>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
p::after {
  content: "";
  width: 0px;
  height: 2px;
  display: block;
  background: black;
  transition: 200ms;
}

p:hover::after {
  width: 100%;
}
</style>
