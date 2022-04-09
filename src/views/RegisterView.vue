<template>
  <main class="grid gap-6">
    <Transition name="errorTip">
      <div
        v-if="isLogInError"
        class="absolute left-0 right-0 px-4 py-2 mx-auto text-center text-white bg-red-500 rounded-lg bottom-3/4 w-fit"
      >
        <p>{{ logInErrorMessage }}</p>
      </div>
    </Transition>
    <button
      @click="handleLoginWithGoogle"
      class="flex items-center justify-center p-3 mx-auto border rounded-full w-fit"
    >
      <GoogleIcon class="inline-block h-6 mr-2" />
      <p class="font-semibold">Register with Google</p>
    </button>
    <form @submit.prevent="handleRegister" class="grid gap-4">
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
          v-model="registerData.email"
        />
      </div>
      <div>
        <label for="password" class="sr-only"></label>
        <LockClosedIcon class="inline-block h-6 mr-1" />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          autocomplete="new-password"
          class="border-0 focus:ring-0"
          v-model="registerData.password"
          ref="passwordInput"
        />
        <EyeIcon
          @click="changePasswordVisibility"
          class="inline-block h-6 ml-1"
          v-if="showPassword"
        />
        <EyeOffIcon
          @click="changePasswordVisibility"
          class="inline-block h-6 ml-1"
          v-else
        />
      </div>
      <hr class="w-1/2 mx-auto border border-black rounded-full" />
      <input
        class="p-3 mx-auto border rounded-full w-fit"
        type="submit"
        value="Register"
      />
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import {
  AtSymbolIcon,
  LockClosedIcon,
  EyeIcon,
  EyeOffIcon,
} from "@heroicons/vue/solid";
import GoogleIcon from "../components/Icons/GoogleIcon.vue";

const authStore = useAuthStore();

const registerData = ref({
  email: "",
  password: "",
});
const showPassword = ref<boolean>(false);
const passwordInput = ref<HTMLInputElement | null>(null);
const isLogInError = ref<boolean>(false);
const logInErrorMessage = ref<string | undefined>(undefined);

const changePasswordVisibility = (): void => {
  showPassword.value = !showPassword.value;
  showPassword.value
    ? (passwordInput.value!.type = "text")
    : (passwordInput.value!.type = "password");
};

const handleRegister = async () => {
  const response = await authStore.registerWithEmailAndPassword(
    registerData.value
  );
  if (response) handleRegisterError(response);
};

const handleLoginWithGoogle = async () => {
  await authStore.logInWithGoogle();
};

const handleRegisterError = (error: string) => {
  isLogInError.value = true;
  logInErrorMessage.value = error;
  setTimeout(() => {
    isLogInError.value = false;
    logInErrorMessage.value = undefined;
  }, 3000);
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
