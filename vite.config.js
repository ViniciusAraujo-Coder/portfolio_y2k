import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite: servidor de desenvolvimento rápido + build otimizado.
// Arquivos em public/ (imagens, ícones) são servidos na raiz: "/assets/...".
export default defineConfig({
  plugins: [react()],
});
