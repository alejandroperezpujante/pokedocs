<template>
  <button
    @click="handleAuthWithGoogle"
    class="flex items-center justify-center p-3 mx-auto border rounded-full w-fit"
  >
    <GoogleIcon class="inline-block h-6 mr-2" />
    <p v-if="props.mode === 'login'" class="font-semibold">
      Log In with Google
    </p>
    <p v-if="props.mode === 'register'" class="font-semibold">
      Register with Google
    </p>
  </button>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import GoogleIcon from "@/components/Icons/GoogleIcon.vue";

const authStore = useAuthStore();

const props = defineProps<{
  mode: string;
}>();

const handleAuthWithGoogle = async () => {
  await authStore.authWithGoogle();
};
</script>
