import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  server: {
    https: true,
  },
  define: {
    'process.env': { ...process.env },
  },
  plugins: [react(), mkcert()],
});
