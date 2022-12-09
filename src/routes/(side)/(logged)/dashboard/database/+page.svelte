<script lang="ts">
	import { invalidate } from '$app/navigation';

	import Button from '$lib/Button.svelte';
	import SkeletonBar from '$lib/SkeletonBar.svelte';
	import TableAddForm from '$lib/TableAddForm.svelte';

	import TableList from '$lib/TableList.svelte';
	import type { PageData } from './$types';
	import { store } from './store';

	export let data: PageData;
	let disabledRefresh = false;
	let disabledAdd = false;

	const refresh = () => {
		disabledRefresh = true;
		invalidate((url) => url.pathname.endsWith('/table')).then(() => {
			Promise.allSettled([
				new Promise((resolve) => setTimeout(resolve, 5000)),
				data.tablesRef.deref()!
			]).finally(() => {
				disabledRefresh = false;
			});
		});
		store.update((v) => {
			v.page = 'list';
			return v;
		});
	};

	const add = () => {
		disabledAdd = true;
		store.update((v) => {
			v.page = 'add';
			return v;
		});
		invalidate((url) => url.pathname.endsWith('/table')).then(() => {
			disabledAdd = false;
		});
	};
</script>

<svelte:head>
	<title>Cloudbase • Dashboard • Database</title>
</svelte:head>

<h1 class="text-2xl font-bold">Database</h1>
<nav class="mt-2">
	<ul class="flex flex-row gap-4">
		<li>
			<Button
				type="button"
				disabled={disabledRefresh}
				on:click={refresh}
				noPadding
				class="px-1 py-1"
			>
				<span class="material-symbols-rounded align-middle">refresh</span>
			</Button>
		</li>
		<li>
			<Button
				type="buttin"
				disabled={disabledAdd || $store.page === 'add'}
				on:click={add}
				noPadding
				class="px-1 py-1"
			>
				<span class="material-symbols-rounded align-middle">add</span>
			</Button>
		</li>
	</ul>
</nav>
<section class="mt-4">
	{#if $store.page === 'list'}
		{#await data.tablesRef.deref()}
			<div class="flex flex-col gap-y-4">
				<SkeletonBar class="w-full h-10" />
				<SkeletonBar class="w-full h-10" />
				<SkeletonBar class="w-full h-10" />
				<SkeletonBar class="w-full h-10" />
				<SkeletonBar class="w-full h-10" />
			</div>
		{:then tables}
			<TableList items={tables} />
		{/await}
	{:else if $store.page === 'add'}
		<TableAddForm form={$store.addForm} />
	{/if}
</section>
