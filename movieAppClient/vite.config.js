import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// The API only allows CORS from http://localhost:8000, so the client runs on 8000.
export default defineConfig({
  plugins: [vue()],
  server: { port: 8000, strictPort: true }
});
