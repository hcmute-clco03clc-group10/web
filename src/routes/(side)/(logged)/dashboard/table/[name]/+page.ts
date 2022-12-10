import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async (ev) => {
	return {
		tableRef: new WeakRef(
			api
				.use(ev.fetch)
				.get(`/table/${ev.params.name}`)
				.then((v) => {
					if (v.status === 200) {
						return v.json();
					}
					return undefined;
				}) as Promise<ITable | undefined>
		),
		tableItemsRef: new WeakRef(
			api
				.use(ev.fetch)
				.get(`/table/item/${ev.params.name}`)
				.then((v) => {
					if (v.status === 200) {
						return v.json();
					}
					return undefined;
				}) as Promise<ITable | undefined>
		)
	};
};
