import { endpoint } from '$lib/api';
import type { PageLoad } from './$types';

export const prerender = true;
export const ssr = true;

export const load: PageLoad = ({ fetch }) => {
	return {
		logging: new WeakRef(
			fetch(endpoint('/token'), { method: 'get', credentials: 'include' }).then(
				({ status }) => status === 200
			)
		)
	};
};
