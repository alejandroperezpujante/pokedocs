<template>
  <nav class="flex gap-x-2">
    <NuxtLink to="/" class="transition-all hover:-translate-y-1 hover:scale-105">Home</NuxtLink>
    {{"|"}}
    <NuxtLink to="/create" class="transition-all hover:-translate-y-1 hover:scale-105">Create Your Pokemon</NuxtLink>
    {{"|"}}
    <NuxtLink to="/about" class="transition-all hover:-translate-y-1 hover:scale-105">About</NuxtLink>
    {{"|"}}
    <NuxtLink to="/auth" class="transition-all hover:-translate-y-1 hover:scale-105">Log In</NuxtLink>
  </nav>
</template>
