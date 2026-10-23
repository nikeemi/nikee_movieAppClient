import { createRouter, createWebHistory } from "vue-router";
import { routes as paths } from "./api";
import { state } from "./store";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Movies from "./views/Movies.vue";
import MovieView from "./views/MovieView.vue";
import AddMovie from "./views/AddMovie.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: paths.movies },
    { path: paths.register, component: Register, meta: { guestOnly: true } },
    { path: paths.login, component: Login, meta: { guestOnly: true } },
    { path: paths.movies, component: Movies, meta: { auth: true } },
    { path: `${paths.movies}/:movieId`, component: MovieView, meta: { auth: true } },
    { path: "/addMovie", component: AddMovie, meta: { auth: true, admin: true } },
    { path: "/:pathMatch(.*)*", redirect: paths.movies }
  ]
});

router.beforeEach((to) => {
  if (to.meta.auth && !state.user) return paths.login;
  if (to.meta.guestOnly && state.user) return paths.movies;
  if (to.meta.admin && !state.user.isAdmin) return paths.movies;
});

export default router;
