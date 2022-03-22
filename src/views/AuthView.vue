<template>
  <main class="flex flex-col mt-auto items-center justify-center">
    <div
      class="grid place-content-center border rounded shadow-md bg-slate-100 p-4 gap-y-4"
    >
      <SwitchGroup>
        <div class="flex items-center">
          <SwitchLabel class="mr-4" :class="enabled ? 'font text-tra' : ''"
            >Sign In</SwitchLabel
          >
          <Switch
            v-model="enabled"
            class="relative inline-flex items-center h-6 transition-colors rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 bg-teal-200"
          >
            <span
              :class="enabled ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
            />
          </Switch>
          <SwitchLabel class="ml-4">Sign Up</SwitchLabel>
        </div>
      </SwitchGroup>
      <div class="grid place-content-center">
        <p v-if="!enabled">Option 1</p>
        <p v-else>Option 2</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const enabled = ref(false);
</script>
