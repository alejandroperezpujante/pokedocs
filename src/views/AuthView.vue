<template>
  <main class="flex flex-col mt-auto">
    <div class="grid p-4 place-content-center gap-y-4">
      <div class="p-4 mx-auto bg-white shadow-lg rounded-xl w-fit">
        <SwitchGroup>
          <div class="flex items-center justify-center">
            <SwitchLabel class="mr-4">Log In</SwitchLabel>
            <Switch
              v-model="mode"
              class="relative inline-flex items-center h-6 transition-colors bg-teal-200 rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300"
            >
              <span
                :class="mode ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block w-4 h-4 transition-transform transform bg-white rounded-full"
              />
            </Switch>
            <SwitchLabel class="ml-4">Register</SwitchLabel>
          </div>
        </SwitchGroup>
      </div>
      <AuthRegister v-if="mode" />
      <AuthLogin v-else />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import AuthRegister from "@/components/Auth/AuthRegister.vue";
import AuthLogin from "@/components/Auth/AuthLogin.vue";

const mode = ref<boolean>(false);
</script>
