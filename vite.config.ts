import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import branchName from 'current-git-branch';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [tailwindcss(), sveltekit()],
		define: {
			'process.env.PUBLIC_CONVEX_URL': JSON.stringify(env.PUBLIC_CONVEX_URL),
			'process.env.BRANCH_NAME': JSON.stringify(branchName())
		}
	};
});
