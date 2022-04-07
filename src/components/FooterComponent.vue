<template>
  <footer class="mt-auto">
    <div class="flex items-center justify-center mb-6 gap-x-2">
      <FooterGithubLink />
      <span class="h-4 border border-black"></span>
      <FooterAboutLink />
    </div>
  </footer>
</template>

<script setup lang="ts">
import FooterGithubLink from "@/components/Footer/FooterGithubLink.vue";
import FooterAboutLink from "./Footer/FooterAboutLink.vue";
</script>
