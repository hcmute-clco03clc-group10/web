<script lang="ts">
	import { page } from '$app/stores';
	import Link from '$lib/Link.svelte';
	import type { PageData } from './$types';
	import { store } from './store';
	import CreateTable from './CreateTable.svelte';
	import ViewTables from './ViewTables.svelte';
	import { invalidate } from '$app/navigation';

	export let data: PageData;
	let hash: string;
	$: {
		const newHash = $page.url.hash;
		if (hash && hash !== '#view-tables' && newHash === '#view-tables') {
			setTimeout(() => {
				invalidate('/dashboard/table#view-tables');
			}, 1);
		}
		hash = newHash;
	}
</script>

<svelte:head>
	<title>Cloudbase • Dashboard • Database</title>
</svelte:head>

<h1 class="text-2xl font-bold">Table</h1>
<nav class="mt-2 border-b">
	<ul class="flex flex-row gap-x-4">
		<li>
			<Link href="#view-tables" type="button" active={!hash || hash === '#view-tables'}
				>View tables</Link
			>
		</li>
		<li>
			<Link href="#create-table" type="button" active={hash === '#create-table'}>Create table</Link>
		</li>
	</ul>
</nav>
<section class="mt-4">
	{#if hash === '#create-table'}
		<CreateTable form={$store.addForm} />
	{:else if !hash || hash === '#view-tables'}
		<ViewTables {data} />
	{/if}
</section>
