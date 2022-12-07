import { endpoint } from "$lib/api";
import type { PageLoad } from ".svelte-kit/types/src/routes/$types";

export const prerender = false;
export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
	const { status } = await fetch(endpoint('/token'), { method: 'get', credentials: 'include' });
	return {
		loggedIn: status === 200
	};
}
