import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const prerender = 'auto';

export const load: PageLoad = async ({ fetch, params, depends, url }) => {
	depends('dashboard/table/[name]');
	return {
		tableRef: new WeakRef(
			api
				.use(fetch)
				.get(`/table?name=${params.name}`)
				.then((v) => {
					if (v.status === 200) {
						return v.json() as Promise<ITable>;
					}
					return undefined;
				})
		),
		tableItemsRef: new WeakRef(
			!url.href.includes('#') || url.href.includes('#view-items')
				? api
						.use(fetch)
						.get(`/table/${params.name}/item`)
						.then((v) => {
							if (v.status === 200) {
								return v.json() as Promise<{ [key: string]: any }[]>;
							}
							return [];
						})
				: []
		)
	};
};
