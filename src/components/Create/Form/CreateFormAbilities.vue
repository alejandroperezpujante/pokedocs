<template>
  <h2 class="font-mono text-3xl text-center">Abilities</h2>
  <div class="grid gap-4 place-content-center">
    <div class="grid place-content-center">
      <div class="flex gap-2">
        <div
          @click.capture="handleIncreaseAbilitiesInputCounter"
          class="p-1 border rounded-lg hover:cursor-pointer"
        >
          <PlusIcon class="w-5 h-5" />
        </div>
        <div
          @click.capture="handleDecreaseAbilitiesInputCounter"
          class="p-1 border rounded-lg hover:cursor-pointer"
        >
          <MinusIcon class="w-5 h-5" />
        </div>
      </div>
    </div>
    <div class="flex gap-2">
      <TransitionGroup name="abilities">
        <div
          v-for="(abilitiesInput, key) in createStore.getAbilitiesLength"
          :key="key"
        >
          <input
            type="text"
            :name="`type${abilitiesInput}`"
            v-model="createStore.abilities[abilitiesInput - 1]"
          />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCreateStore } from "@/stores/createStore";
import { useErrorStore } from "@/stores/errorStore";
import { PlusIcon, MinusIcon } from "@heroicons/vue/solid";

const createStore = useCreateStore();
const errorStore = useErrorStore();

const handleIncreaseAbilitiesInputCounter = () => {
  createStore.getAbilitiesLength === 3
    ? errorStore.displayError("You can't have more than 3 abilities")
    : createStore.abilities.push("");
};
const handleDecreaseAbilitiesInputCounter = () => {
  createStore.getAbilitiesLength === 1
    ? errorStore.displayError("You can't have less than 1 ability")
    : createStore.abilities.pop();
};
</script>

<style scoped>
input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
}
.abilities-enter-active,
.abilities-leave-active {
  transition: all 0.5s ease-in-out;
}
.abilities-enter-from,
.abilities-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
