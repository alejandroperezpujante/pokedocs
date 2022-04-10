<template>
  <form @submit.prevent="handleAuthForm" class="grid gap-4">
    <div class="rounded">
      <label for="email" class="sr-only"></label>
      <AtSymbolIcon class="inline-block mr-1 h-7" />
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        autocomplete="email"
        class="w-full border-0 focus:ring-0"
        v-model="formData.email"
      />
    </div>
    <div>
      <label for="password" class="sr-only"></label>
      <LockClosedIcon class="inline-block h-6 mr-1" />
      <input
        id="password"
        name="password"
        :type="!showPassword ? 'password' : 'text'"
        placeholder="Password"
        autocomplete="new-password"
        class="border-0 focus:ring-0"
        v-model="formData.password"
      />
      <EyeIcon
        v-if="showPassword"
        @click="changePasswordVisibility"
        class="inline-block h-6 ml-1"
      />
      <EyeOffIcon
        v-else
        @click="changePasswordVisibility"
        class="inline-block h-6 ml-1"
      />
    </div>
    <hr class="w-1/2 mx-auto border border-black rounded-full" />
    <input
      v-if="props.mode === 'register'"
      class="p-3 mx-auto border rounded-full w-fit"
      type="submit"
      value="Register"
    />
    <input
      v-if="props.mode === 'login'"
      class="p-3 mx-auto border rounded-full w-fit"
      type="submit"
      value="Login"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useErrorStore } from "@/stores/errorStore";
import {
  AtSymbolIcon,
  LockClosedIcon,
  EyeIcon,
  EyeOffIcon,
} from "@heroicons/vue/solid";

const authStore = useAuthStore();
const errorStore = useErrorStore();

const props = defineProps<{
  mode: string;
}>();

const formData = ref({
  email: "",
  password: "",
});
const showPassword = ref<boolean>(false);

const verifyFormData = (): boolean => {
  if (!formData.value.email || !formData.value.password) {
    errorStore.displayError("Please fill out all fields");
    return false;
  }
  return true;
};

const handleAuthForm = async () => {
  if (verifyFormData()) {
    if (props.mode === "register") {
      const response = await authStore.registerWithEmailAndPassword(
        formData.value
      );
      if (response) errorStore.displayError(response);
    }
    if (props.mode === "login") {
      const response = await authStore.loginWithEmailAndPassword(
        formData.value
      );
      if (response) errorStore.displayError(response);
    }
  }
};

const changePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  padding: 0.8rem;
  border-width: 1px;
  border-radius: 9999px;
}

input:focus {
  outline: none;
}
</style>
