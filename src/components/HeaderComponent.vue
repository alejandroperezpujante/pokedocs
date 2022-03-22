<template>
  <header class="">
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        {{ "|" }}
        <RouterLink to="/about">About</RouterLink>
        {{ "|" }}
        <RouterLink to="/auth">Auth</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
