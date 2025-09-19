// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [ tailwindcss(),
//           react()],
// })


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    chunkSizeWarningLimit: 1500, // 🚀 increase warning threshold
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          react: ["react", "react-dom"],

          // Router (if you use react-router-dom)
          router: ["react-router-dom"],

          // Utilities (optional: remove if not used)
         
        },
      },
    },
  },
});
