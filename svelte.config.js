import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [
		preprocess({ postcss: true }),
		mdsvex({
			extensions: ['.md']
		})
	],
	kit: {
		adapter: adapter({}),
		alias: {
			$lib: 'src/lib'
		}
	}
};

export default config;
