<template>
  <h2 class="font-mono text-3xl text-center">Types</h2>
  <div class="grid place-content-center">
    <div class="flex gap-2">
      <div
        @click.capture="handleIncreaseTypesInputCounter"
        class="p-1 border rounded-lg hover:cursor-pointer"
      >
        <PlusIcon class="w-5 h-5" />
      </div>
      <div
        @click.capture="handleDecreaseTypesInputCounter"
        class="p-1 border rounded-lg hover:cursor-pointer"
      >
        <MinusIcon class="w-5 h-5" />
      </div>
    </div>
  </div>
  <TransitionGroup
    name="types"
    tag="div"
    class="grid grid-flow-col gap-2 place-content-center"
  >
    <div v-for="(typesInput, key) in createStore.getTypesLength" :key="key">
      <input
        type="text"
        :name="`type${typesInput}`"
        v-model="createStore.types[typesInput - 1]"
      />
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useCreateStore } from "@/stores/createStore";
import { useErrorStore } from "@/stores/errorStore";
import { PlusIcon, MinusIcon } from "@heroicons/vue/solid";

const createStore = useCreateStore();
const errorStore = useErrorStore();

const handleIncreaseTypesInputCounter = () => {
  createStore.getTypesLength === 3
    ? errorStore.displayError("You can't have more than 3 types")
    : createStore.types.push("");
};
const handleDecreaseTypesInputCounter = () => {
  createStore.getTypesLength === 1
    ? errorStore.displayError("You can't have less than 1 type")
    : createStore.types.pop();
};
</script>

<style scoped>
input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
}
.types-enter-active,
.types-leave-active {
  transition: all 0.5s ease-in-out;
}
.types-enter-from,
.types-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
