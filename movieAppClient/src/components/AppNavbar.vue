<script setup>
import { useRouter } from "vue-router";
import { state, logout } from "../store";
import { routes } from "../api";

const router = useRouter();

const handleLogout = () => {
  logout();
  router.push(routes.login);
};
</script>

<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">Movie App</router-link>
      <div class="navbar-nav ms-auto">
        <template v-if="state.user">
          <router-link class="nav-link" :to="routes.movies">Movies</router-link>
          <a class="nav-link" href="#" @click.prevent="handleLogout">Logout</a>
        </template>
        <template v-else>
          <router-link class="nav-link" :to="routes.login">Login</router-link>
          <router-link class="nav-link" :to="routes.register">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>
