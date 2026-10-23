import { reactive } from "vue";

// Simple shared state: user is { id, email, isAdmin } or null
export const state = reactive({ user: null });

// The API puts { id, email, isAdmin } inside the JWT, so read the user from the token.
function decodeToken(token) {
  const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(decodeURIComponent(escape(atob(payload))));
}

export function loadUser() {
  const token = localStorage.getItem("token");
  try {
    const data = decodeToken(token);
    state.user = { id: data.id, email: data.email, isAdmin: data.isAdmin === true };
  } catch {
    localStorage.removeItem("token");
    state.user = null;
  }
  return Promise.resolve();
}

export function logout() {
  localStorage.removeItem("token");
  state.user = null;
}
