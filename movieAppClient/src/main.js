import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.vue";
import router from "./router";
import { loadUser } from "./store";

// Restore the logged-in user (if a token exists) before the first navigation guard runs.
loadUser().finally(() => {
  createApp(App).use(router).mount("#app");
});
