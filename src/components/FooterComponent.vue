<template>
  <footer class="mt-auto">
    <div class="flex items-center mb-2 gap-x-4">
      <FooterGithubLink />
      <router-link
        class="p-2 transition-transform rounded-md shadow-md hover:-translate-y-2"
        to="/about"
        >About</router-link
      >
    </div>
  </footer>
</template>

<script setup lang="ts">
import FooterGithubLink from "@/components/Footer/FooterGithubLink.vue";
</script>
