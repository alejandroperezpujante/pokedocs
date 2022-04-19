<template>
  <h2 class="font-mono text-3xl text-center">Sprite</h2>
  <div class="inline-flex items-center justify-center space-x-4">
    <div class="shrink-0">
      <img
        :src="`${createStore.sprite || '/default_avatar.png'}`"
        class="object-cover w-16 h-16 rounded-full"
        alt=""
      />
    </div>
    <div>
      <input
        type="file"
        name="sprite"
        class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        accept=".svg,.png,.jpg,.jpeg"
        @input="handleSprite"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateStore } from "@/stores/createStore";
const createStore = useCreateStore();

const handleSprite = (event: any): void => {
  if (event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        createStore.sprite = reader.result;
      };
      createStore.rawSprite = file;
    }
  }
};
</script>
