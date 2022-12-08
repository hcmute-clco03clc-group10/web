import { endpoint } from '$lib/api';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch(endpoint('/token'), {
		method: 'get',
		credentials: 'include'
	});
	if (response.status !== 200) {
		throw error(403, 'not logged in');
	}

	return {
		userRef: new WeakRef(response.json())
	};
};
