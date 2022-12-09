import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	return {
		tablesRef: new WeakRef(api.use(fetch).get('/table').then(v => v.json()))
	}
};
