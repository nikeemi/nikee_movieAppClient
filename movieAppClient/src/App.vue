<script setup>
import AppNavbar from "./components/AppNavbar.vue";
</script>

<template>
  <AppNavbar />
  <div class="container py-4">
    <router-view />
  </div>
</template>
