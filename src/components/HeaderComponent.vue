<template>
  <header class="mb-auto">
    <div class="flex flex-col items-center justify-center mt-2 gap-y-4">
      <HeaderTitle />
      <HeaderNav />
    </div>
  </header>
</template>

<script setup lang="ts">
import HeaderTitle from "@/components/Header/HeaderTitle.vue";
import HeaderNav from "./Header/HeaderNav.vue";
</script>
