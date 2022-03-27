<template>
  <form
    @submit.prevent="handleRegister()"
    class="grid p-4 bg-white shadow-lg place-content-center gap-y-4 rounded-xl"
  >
    <div class="grid grid-flow-row gap-4 sm:grid-flow-col">
      <div class="grid gap-y-4">
        <div>
          <label for="username" class="sr-only">Username</label>
          <input
            id="username"
            name="username"
            autocomplete="username"
            type="text"
            placeholder="Username"
            v-model="userData.username"
          />
        </div>
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            autocomplete="email"
            type="email"
            placeholder="Email"
            v-model="userData.email"
          />
        </div>
      </div>
      <div class="grid gap-y-4">
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            autocomplete="new-password"
            type="password"
            placeholder="Password"
            v-model="userData.password"
          />
        </div>
        <div>
          <label for="confirm-password" class="sr-only">Confirm Password</label>
          <input
            id="confirm-password"
            name="confirm-password"
            autocomplete="new-password"
            type="password"
            placeholder="Confirm Password"
            v-model="userData.confirmPassword"
          />
        </div>
      </div>
    </div>
    <input
      type="submit"
      value="Register"
      class="mx-auto text-xl transition-transform transform shadow-md w-fit hover:cursor-pointer hover:-translate-y-1"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
const userData = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

function handleRegister() {
  console.log(userData.value);
}
</script>

<style scoped>
input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
