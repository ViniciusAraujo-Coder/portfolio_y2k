import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite: servidor de desenvolvimento rápido + build otimizado.
// base "./" = caminhos relativos: o site funciona em qualquer endereço, inclusive numa subpasta
// como viniciusaraujo-coder.github.io/portfolio_y2k/ (GitHub Pages).
// Por isso, no código, arquivos de public/ são escritos SEM a barra inicial: "assets/...", não "/assets/...".
export default defineConfig({
  base: "./",
  plugins: [react()],
});
