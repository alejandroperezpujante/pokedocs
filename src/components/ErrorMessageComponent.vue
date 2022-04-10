<template>
  <Transition name="errorTip">
    <div
      v-if="errorStore.isError"
      class="absolute left-0 right-0 px-4 py-2 mx-auto text-center text-white bg-red-500 rounded-lg bottom-3/4 w-fit"
    >
      <p>{{ errorStore.errorMessage }}</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useErrorStore } from "@/stores/errorStore";

const errorStore = useErrorStore();
</script>

<style scoped>
.errorTip-enter-active,
.errorTip-leave-active {
  transition: all 0.3s ease-in-out;
}

.errorTip-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.errorTip-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
