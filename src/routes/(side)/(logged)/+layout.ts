import { endpoint } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async ({ fetch }) => {
	const logged = await fetch(endpoint('/token'), {
		method: 'get',
		credentials: 'include'
	}).then(({ status }) => status === 200);
	if (!logged) {
		throw error(403, 'not logged in');
	}
	return {
		logged
	};
};
