<script setup>
import { ref, onMounted } from "vue";
import { API, routes, authHeaders } from "../api";
import { state } from "../store";

const movies = ref([]);
const message = ref("");

onMounted(() => {
  fetch(`${API}/movies/getMovies`, { headers: authHeaders() })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (ok) movies.value = data.movies;
      else message.value = data.message || "Unable to load movies";
    })
    .catch(() => (message.value = "Unable to reach the server"));
});
</script>

<template>
  <!-- Admin dashboard -->
  <div v-if="state.user.isAdmin">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="mb-0">Admin Dashboard</h2>
      <router-link class="btn btn-primary" to="/addMovie">Add Movie</router-link>
    </div>
    <div v-if="message" class="alert alert-info">{{ message }}</div>
    <div class="table-responsive">
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in movies" :key="m._id">
            <td>{{ m.title }}</td>
            <td>{{ m.director }}</td>
            <td>{{ m.year }}</td>
            <td>{{ m.genre }}</td>
            <td>{{ m.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Regular user: movie cards -->
  <div v-else>
    <h2 class="mb-3">Movies</h2>
    <div v-if="message" class="alert alert-info">{{ message }}</div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
      <div class="col" v-for="m in movies" :key="m._id">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ m.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ m.director }} &middot; {{ m.year }}</h6>
            <p class="card-text">{{ m.genre }}</p>
            <router-link class="btn btn-primary mt-auto" :to="`${routes.movies}/${m._id}`">View Movie</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
