import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url, depends }) => {
	depends('/dashboard/table#view-tables');
	return {
		tablesRef: new WeakRef(
			url.href.includes('#') && !url.href.includes('#view-tables')
				? []
				: api
						.use(fetch)
						.get('/table')
						.then((v) => v.json())
		)
	};
};
