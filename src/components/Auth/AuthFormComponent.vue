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
        v-model="formEmail"
      />
    </div>
    <div v-if="mode === 'register'" class="rounded">
      <label for="username" class="sr-only"></label>
      <UserAddIcon class="inline-block mr-1 h-7" />
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        autocomplete="username"
        class="w-full border-0 focus:ring-0"
        v-model="formUsername"
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
        v-model="formPassword"
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
  UserAddIcon,
  LockClosedIcon,
  EyeIcon,
  EyeOffIcon,
} from "@heroicons/vue/solid";

const authStore = useAuthStore();
const errorStore = useErrorStore();

const props = defineProps<{
  mode: string;
}>();

const formEmail = ref<string>("");
const formUsername = ref<string>("");
const formPassword = ref<string>("");
const showPassword = ref<boolean>(false);

const verifyFormData = (): boolean => {
  if (
    props.mode === "register" &&
    !formEmail.value &&
    !formUsername.value &&
    !formPassword.value
  ) {
    errorStore.setError("Please fill out all fields.");
    return false;
  }
  if (props.mode === "login" && !formEmail.value && !formPassword.value) {
    errorStore.setError("Please fill out all fields.");
    return false;
  }
  return true;
};

const handleAuthForm = async () => {
  if (verifyFormData()) {
    if (props.mode === "register") {
      const formData = {
        email: formEmail.value,
        username: formUsername.value,
        password: formPassword.value,
      };
      await authStore.registerWithEmailAndPassword(formData);
    }
    if (props.mode === "login") {
      const formData = {
        email: formEmail.value,
        password: formPassword.value,
      };
      await authStore.loginWithEmailAndPassword(formData);
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
