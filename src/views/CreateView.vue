<template>
  <main class="grid gap-4">
    <ErrorMessageComponent />
    <div class="flex items-center justify-center gap-2">
      <div class="w-12 h-1 transition-colors bg-blue-400 border"></div>
      <div
        class="w-12 h-1 transition-colors border"
        :class="{ 'bg-blue-400': formStep >= 1, 'bg-black': formStep < 1 }"
      ></div>
      <div
        class="w-12 h-1 transition-colors border"
        :class="{ 'bg-blue-400': formStep >= 2, 'bg-black': formStep < 2 }"
      ></div>
      <div
        class="w-12 h-1 transition-colors border"
        :class="{ 'bg-blue-400': formStep >= 3, 'bg-black': formStep < 3 }"
      ></div>
      <div
        class="w-12 h-1 transition-colors border"
        :class="{ 'bg-blue-400': formStep >= 4, 'bg-black': formStep < 4 }"
      ></div>
      <div
        class="w-12 h-1 transition-colors border"
        :class="{ 'bg-blue-400': formStep >= 5, 'bg-black': formStep < 5 }"
      ></div>
    </div>
    <form @submit.prevent="createStore.createPokemon()">
      <div class="grid place-content-center gap-4 mx-2 h-[400px]">
        <CreateFormBasic v-if="formStep === 0" />
        <CreateFormStats v-if="formStep === 1" />
        <CreateFormTypes v-if="formStep === 2" />
        <CreateFormAbilities v-if="formStep === 3" />
        <CreateFormSprite v-if="formStep === 4" />
        <CreateFormResume v-if="formStep === 5" />
      </div>
    </form>
    <div class="flex items-center justify-center gap-2 mt-12">
      <button
        @click="handlePreviousFormStep"
        class="transition bg-cyan-400"
        :class="{ 'opacity-50': formStep === 0 }"
        :disabled="formStep === 0"
      >
        Previous
      </button>
      <button
        @click="handleNextFormStep"
        class="bg-red-400"
        :class="{ 'opacity-50': formStep === 5 }"
        :disabled="formStep === 5"
      >
        Next
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useCreateStore } from "@/stores/createStore";
import { useErrorStore } from "@/stores/errorStore";
import CreateFormBasic from "@/components/Create/Form/CreateFormBasic.vue";
import CreateFormStats from "@/components/Create/Form/CreateFormStats.vue";
import CreateFormSprite from "@/components/Create/Form/CreateFormSprite.vue";
import CreateFormTypes from "@/components/Create/Form/CreateFormTypes.vue";
import CreateFormAbilities from "@/components/Create/Form/CreateFormAbilities.vue";
import ErrorMessageComponent from "@/components/ErrorMessageComponent.vue";
import CreateFormResume from "@/components/Create/Form/CreateFormResume.vue";

const createStore = useCreateStore();
const errorStore = useErrorStore();
const formStep = ref<number>(0);

const handlePreviousFormStep = (): void => {
  formStep.value === 0
    ? errorStore.displayError("You can't go back from this step")
    : formStep.value--;
  console.log(formStep.value);
};

const handleNextFormStep = (): void => {
  formStep.value === 5
    ? errorStore.displayError("You can't go forward from this step")
    : formStep.value++;
  console.log(formStep.value);
};
</script>

<style scoped>
button {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
