<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { API, routes, authHeaders } from "../api";

const router = useRouter();
const form = reactive({ title: "", director: "", year: "", description: "", genre: "" });
const error = ref("");

const handleSubmit = () => {
  error.value = "";

  fetch(`${API}/movies/addMovie`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ ...form, year: Number(form.year) })
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (ok) router.push(routes.movies);
      else error.value = data.message || data.error?.message || "Unable to add movie";
    })
    .catch(() => (error.value = "Unable to reach the server"));
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="mx-auto" style="max-width: 520px">
    <h2 class="mb-3">Add Movie</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input class="form-control" required v-model="form.title" />
    </div>
    <div class="mb-3">
      <label class="form-label">Director</label>
      <input class="form-control" required v-model="form.director" />
    </div>
    <div class="mb-3">
      <label class="form-label">Year</label>
      <input type="number" class="form-control" required v-model="form.year" />
    </div>
    <div class="mb-3">
      <label class="form-label">Genre</label>
      <input class="form-control" required v-model="form.genre" />
    </div>
    <div class="mb-3">
      <label class="form-label">Description</label>
      <textarea rows="3" class="form-control" required v-model="form.description"></textarea>
    </div>
    <button type="submit" class="btn btn-primary me-2">Add Movie</button>
    <button type="button" class="btn btn-secondary" @click="router.push(routes.movies)">Cancel</button>
  </form>
</template>
