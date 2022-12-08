import { endpoint } from '$lib/api';
import type { LayoutLoad } from './$types';

export const prerender = true;
export const ssr = true;

export const load: LayoutLoad = ({ fetch }) => {
	return {
		logging: new WeakRef(
			fetch(endpoint('/token'), { method: 'get', credentials: 'include' }).then(
				({ status }) => status === 200
			)
		)
	};
};
