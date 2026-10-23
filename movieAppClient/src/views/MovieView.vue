<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { API, routes, authHeaders } from "../api";

const route = useRoute();
const movie = ref(null);
const error = ref("");

onMounted(() => {
  fetch(`${API}/movies/getMovie/${route.params.movieId}`, { headers: authHeaders() })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (ok) movie.value = data;
      else error.value = data.message || data.error?.message || "Movie not found";
    })
    .catch(() => (error.value = "Unable to reach the server"));
});
</script>

<template>
  <div v-if="error" class="alert alert-danger">{{ error }}</div>
  <div v-else-if="movie" class="card mx-auto" style="max-width: 640px">
    <div class="card-body">
      <h3 class="card-title">{{ movie.title }}</h3>
      <h6 class="card-subtitle mb-3 text-muted">
        {{ movie.director }} &middot; {{ movie.year }} &middot; {{ movie.genre }}
      </h6>
      <p class="card-text">{{ movie.description }}</p>
      <h5>Comments</h5>
      <ul v-if="movie.comments && movie.comments.length" class="list-group mb-3">
        <li class="list-group-item" v-for="c in movie.comments" :key="c._id">{{ c.comment }}</li>
      </ul>
      <p v-else class="text-muted">No comments yet.</p>
      <router-link class="btn btn-secondary" :to="routes.movies">Back</router-link>
    </div>
  </div>
</template>
