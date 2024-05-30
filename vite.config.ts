import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: "127.0.0.1",
		proxy: {
			"/api": {
				target: "http://localhost:8080",
				changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
			}
		},
	},
});
