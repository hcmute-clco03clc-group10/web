<script lang="ts">
	import TableItems from '$lib/TableItems.svelte';
	import Button from '$lib/Button.svelte';
	import { api } from '$lib/api';
	import type { PageData } from './$types';
	import { sineInOut } from 'svelte/easing';
	import ThreeDotsLoader from '$lib/ThreeDotsLoader.svelte';
	import { fade } from 'svelte/transition';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: PageData;
	let selecteds: boolean[] = [];
	let deleting = false;
	let disabledRefresh = false;

	const deleteItems = async () => {
		const [items, table] = await Promise.all([data.tableItemsRef.deref(), data.tableRef.deref()]);
		if (!items || !table) {
			return;
		}
		const deletings = items.filter((_, k) => selecteds[k]);
		if (!deletings) {
			return;
		}
		const keySchema = table.KeySchema;
		const deleteData = deletings.map((i) => {
			const data: { [key: string]: any } = {};
			for (const key of keySchema) {
				data[key.AttributeName] = i[key.AttributeName];
			}
			return data;
		});
		deleting = true;
		const result = await api
			.use(fetch)
			.post(`/table/${table.TableName}/item/delete`, {
				body: JSON.stringify(deleteData)
			})
			.finally(() => {
				deleting = false;
			});
		if (result.status === 200) {
			refresh();
		}
	};
	const refresh = async () => {
		disabledRefresh = true;
		selecteds = [];
		invalidate('dashboard/table/[name]')
			.then(() => data.tableItemsRef.deref())
			.finally(() => {
				disabledRefresh = false;
			});
	};
	onMount(() => {
		setTimeout(refresh, 1);
	});
</script>

<div
	in:fade={{ delay: 100, duration: 200, easing: sineInOut }}
	out:fade={{ duration: 100, easing: sineInOut }}
	class="flex flex-col gap-y-2 justify-start"
>
	<nav>
		<ul class="flex gap-x-2 p-1 border rounded-lg w-fit drop-shadow-sm">
			<li>
				<Button
					type="button"
					disabled={disabledRefresh}
					on:click={refresh}
					noPadding
					class="px-1 py-1 rounded-lg"
				>
					<span
						class="material-symbols-rounded align-middle transition-transform duration-300 group-hover:duration-200 ease-in-out rotate-0 group-hover:rotate-180"
						>refresh</span
					>
				</Button>
			</li>
			<li>
				<Button
					type="button"
					disabled={deleting || !selecteds.some((v) => v)}
					noPadding
					class="px-1 py-1 rounded-lg"
					on:click={deleteItems}
				>
					<span
						class="material-symbols-rounded align-middle transition-transform duration-300 group-hover:duration-200 ease-in-out rotate-0 group-hover:rotate-180"
						>delete</span
					>
				</Button>
			</li>
		</ul>
	</nav>
	{#await Promise.all([data.tableRef.deref(), data.tableItemsRef.deref()])}
		<div in:fade={{ delay: 100, duration: 100, easing: sineInOut }}>
			<ThreeDotsLoader class="w-3 h-3 bg-slate-300" />
		</div>
	{:then [table, items]}
		{#if table && items}
			<div
				in:fade={{ delay: 50, duration: 150, easing: sineInOut }}
				out:fade={{ duration: 100, easing: sineInOut }}
			>
				<TableItems {items} {table} bind:selecteds />
			</div>
		{/if}
	{/await}
</div>
