import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const tablePromise = api
		.use(fetch)
		.get(`/table?name=${params.name}`)
		.then((v) => v.json() as Promise<ITable>);
	return {
		tableRef: new WeakRef(tablePromise),
		itemRef: new WeakRef(
			tablePromise
				.then(async (v) => {
					const { KeySchema, AttributeDefinitions } = v;
					const data = {
						[KeySchema[0].AttributeName]: {
							[AttributeDefinitions.find(
								(attr) => attr.AttributeName === KeySchema[0].AttributeName
							)!.AttributeType]: params.pk
						}
					};
					if (KeySchema[1]) {
						data[KeySchema[1].AttributeName] = {
							[AttributeDefinitions.find(
								(attr) => attr.AttributeName === KeySchema[1].AttributeName
							)!.AttributeType]: params.sk
						};
					}
					let base64 = btoa(JSON.stringify(data));
					const index = base64.indexOf('=');
					if (index !== -1) {
						base64 = base64.substring(0, index);
					}
					return api
						.use(fetch)
						.get(`/table/${params.name}/item/${base64.replaceAll('+', '-').replaceAll('/', '_')}`);
				})
				.then((v) => v.json() as Promise<{ [key: string]: { [key: string]: any } }>)
		)
	};
};
