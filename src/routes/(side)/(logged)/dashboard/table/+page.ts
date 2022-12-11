import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url, depends }) => {
	depends('/dashboard/table#list');
	return {
		tablesRef: new WeakRef(
			url.href.includes('#create-table')
				? []
				: api
						.use(fetch)
						.get('/table')
						.then((v) => v.json())
		)
	};
};
