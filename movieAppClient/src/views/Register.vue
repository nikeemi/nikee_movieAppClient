<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { API, routes } from "../api";

const router = useRouter();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const success = ref("");

const handleSubmit = () => {
  error.value = "";
  success.value = "";

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  fetch(`${API}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value })
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (ok) {
        success.value = "Registered successfully! Redirecting to login...";
        setTimeout(() => router.push(routes.login), 1000);
      } else {
        error.value = data.message || data.error?.message || "Registration failed";
      }
    })
    .catch(() => (error.value = "Unable to reach the server"));
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mx-auto" style="max-width: 420px">
    <h2 class="mb-3">Register</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="success" class="alert alert-success">{{ success }}</div>
    <div class="mb-3">
      <label class="form-label">Email</label>
      <input type="email" class="form-control" required v-model="email" />
    </div>
    <div class="mb-3">
      <label class="form-label">Password</label>
      <input type="password" class="form-control" required minlength="8" v-model="password" />
      <div class="form-text">At least 8 characters.</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Confirm Password</label>
      <input type="password" class="form-control" required v-model="confirmPassword" />
    </div>
    <button type="submit" class="btn btn-primary w-100">Register</button>
  </form>
</template>
