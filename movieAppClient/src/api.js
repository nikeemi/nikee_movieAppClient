import config from "../movieAppClient.json";

export const API = config.url;
export const routes = config.endpoints; // client route paths: /register, /login, /movies

export const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
});
