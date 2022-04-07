<template>
  <main class="grid gap-y-6">
    <Transition>
      <div
        v-if="isLogInError"
        class="grid p-4 mb-12 text-white bg-red-500 rounded-lg absolute top-[25%] place-content-center"
      >
        <p>{{ logInErrorMessage }}</p>
      </div>
    </Transition>
    <button
      @click="handleLoginWithGoogle"
      class="flex items-center justify-center p-3 mx-auto border rounded-full"
    >
      <GoogleIcon class="inline-block h-6 mr-2" />
      <p class="font-semibold">Log In with Google</p>
    </button>
    <form @submit.prevent="handleLogin" class="grid gap-4">
      <div>
        <label for="email" class="sr-only"></label>
        <AtSymbolIcon class="inline-block mr-1 h-7" />
        <input
          class="w-full"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autocomplete="email"
          v-model="loginData.email"
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
          v-model="loginData.password"
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
        class="p-3 mx-auto border rounded-xl w-fit"
        type="submit"
        value="Log In"
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
import GoogleIcon from "@/components/Icons/GoogleIcon.vue";

const authStore = useAuthStore();

const loginData = ref({
  email: "",
  password: "",
});
const showPassword = ref<boolean>(false);
const passwordInput = ref();
const isLogInError = ref<boolean>(false);
const logInErrorMessage = ref<string | undefined>(undefined);

const changePasswordVisibility = (): void => {
  showPassword.value = !showPassword.value;
  showPassword.value
    ? (passwordInput.value.type = "text")
    : (passwordInput.value.type = "password");
};

const handleLogin = async () => {
  const response = await authStore.loginWithEmailAndPassword(loginData.value);
  if (response) handleLoginError(response);
};

const handleLoginWithGoogle = async () => {
  await authStore.logInWithGoogle();
};

const handleLoginError = (error: string) => {
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

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.v-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
