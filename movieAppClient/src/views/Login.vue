<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { API, routes } from "../api";
import { loadUser } from "../store";

const router = useRouter();
const email = ref("");
const password = ref("");
const error = ref("");

const handleSubmit = () => {
  error.value = "";

  fetch(`${API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value })
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (ok && data.access) {
        localStorage.setItem("token", data.access);
        return loadUser().then(() => router.push(routes.movies));
      }
      error.value = data.message || data.error?.message || "Login failed";
    })
    .catch(() => (error.value = "Unable to reach the server"));
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mx-auto" style="max-width: 420px">
    <h2 class="mb-3">Login</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input type="email" class="form-control" required v-model="email" />
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input type="password" class="form-control" required v-model="password" />
    </div>
    <button type="submit" class="btn btn-primary w-100">Login</button>
  </form>
</template>
