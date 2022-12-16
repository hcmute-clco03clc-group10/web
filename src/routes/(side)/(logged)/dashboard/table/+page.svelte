<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import Link from '$lib/Link.svelte';
	import TableAddForm from '$lib/TableAddForm.svelte';
	import TableList from '$lib/TableList.svelte';
	import ThreeDotsLoader from '$lib/ThreeDotsLoader.svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { store } from './store';

	export let data: PageData;
	let disabledRefresh = false;
	let disabledDelete = false;
	let hash: string;
	let selecteds: boolean[] = [];
	$: {
		const newHash = $page.url.hash;
		if (hash && hash !== '#view-tables' && newHash === '#view-tables') {
			setTimeout(() => {
				refresh();
			}, 100);
		}
		hash = newHash;
	}
	$: disabledDelete = !selecteds.some((selected) => selected);

	const refresh = () => {
		disabledRefresh = true;
		invalidate('/dashboard/table#view-tables')
			.then(() => data.tablesRef.deref()!)
			.finally(() => {
				disabledRefresh = false;
			});
	};
</script>

<svelte:head>
	<title>Cloudbase • Dashboard • Database</title>
</svelte:head>

<h1 class="text-2xl font-bold">Table</h1>
<nav class="mt-2">
	<ul class="flex flex-row gap-x-4">
		<li>
			<Link href="#view-tables" type="button" active={!hash || hash === '#view-tables'}>View tables</Link>
		</li>
		<li>
			<Link href="#create-table" type="button" active={hash === '#create-table'}>Create table</Link>
		</li>
	</ul>
</nav>
<section class="mt-4">
	{#if hash === '#create-table'}
		<div
			class="border rounded-lg p-2 bg-white"
			in:fade={{ delay: 100, duration: 200, easing: sineInOut }}
			out:fade={{ duration: 100, easing: sineInOut }}
		>
			<TableAddForm form={$store.addForm} />
		</div>
	{:else if !hash || hash === '#view-tables'}
		<div
			in:fade={{ delay: 100, duration: 200, easing: sineInOut }}
			out:fade={{ duration: 100, easing: sineInOut }}
			class="flex flex-col gap-y-2 justify-start border rounded-lg p-2 bg-white"
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
						<Button type="button" disabled={disabledDelete} noPadding class="px-1 py-1 rounded-lg">
							<span
								class="material-symbols-rounded align-middle transition-transform duration-300 group-hover:duration-200 ease-in-out rotate-0 group-hover:rotate-180"
								>delete</span
							>
						</Button>
					</li>
				</ul>
			</nav>
			{#await data.tablesRef.deref()}
				<div
					in:fade={{ delay: 120, duration: 100, easing: sineInOut }}
					out:fade={{ duration: 100, easing: sineInOut }}
				>
					<ThreeDotsLoader class="w-3 h-3 bg-slate-300" />
				</div>
			{:then tables}
				<div
					in:fade={{ delay: 120, duration: 100, easing: sineInOut }}
					out:fade={{ duration: 100, easing: sineInOut }}
				>
					<TableList items={tables} bind:selecteds />
				</div>
			{/await}
		</div>
	{/if}
</section>
