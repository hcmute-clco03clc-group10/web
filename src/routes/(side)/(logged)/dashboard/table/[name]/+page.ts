import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	return {
		tableRef: new WeakRef(
			api
				.use(fetch)
				.get(`/table?name=${params.name}`)
				.then((v) => {
					if (v.status === 200) {
						return v.json();
					}
					return undefined;
				}) as Promise<ITable | undefined>
		),
		tableItemsRef: new WeakRef(
			api
				.use(fetch)
				.get(`/table/items/${params.name}`)
				.then((v) => {
					if (v.status === 200) {
						return v.json();
					}
					return undefined;
				}) as Promise<ITable | undefined>
		)
	};
};
