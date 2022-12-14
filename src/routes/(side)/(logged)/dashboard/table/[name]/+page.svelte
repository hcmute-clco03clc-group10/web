<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import Link from '$lib/Link.svelte';
	import SkeletonBar from '$lib/SkeletonBar.svelte';
	import TableItems from '$lib/TableItems.svelte';
	import ThreeDotsLoader from '$lib/ThreeDotsLoader.svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import CreateTableItemForm from '$lib/CreateTableItemForm.svelte';

	export let data: PageData;
	let createItemFormAttributes: any[] = [];
	let hash: string;
	let disabledRefresh = false;
	let selecteds: boolean[] = [];
	const tablePromise = data.tableRef.deref();
	$: {
		const newHash = $page.url.hash;
		if (hash && hash !== '#items' && newHash === '#items') {
			setTimeout(() => {
				refresh();
			}, 100);
		}
		hash = newHash;
	}
	const refresh = async () => {
		disabledRefresh = true;
		const table = await tablePromise;
		invalidate((url) => url.pathname.endsWith(`/table/${table?.TableName}/item`))
			.then(() => data.tableItemsRef.deref())
			.finally(() => {
				disabledRefresh = false;
			});
	};
</script>

<svelte:head>
	{#await tablePromise then table}
		{#if table}
			<title>Cloudbase • {table.TableName}</title>
		{/if}
	{/await}
</svelte:head>

<h1 class="text-2xl font-bold">
	{#await tablePromise}
		<SkeletonBar via="via-slate-300" class="w-48 h-4 my-3" />
	{:then table}
		{#if table}
			{table.TableName}
		{:else}
			Table
		{/if}
	{/await}
</h1>
<nav class="mt-2">
	<ul class="flex flex-row gap-x-4">
		<li>
			<Link href="#view-items" type="button" active={!hash || hash === '#view-items'}
				>View items</Link
			>
		</li>
		<li>
			<Link href="#create-item" type="button" active={hash === '#create-item'}>Create item</Link>
		</li>
		<li>
			<Link href="#details" type="button" active={hash === '#details'}>Details</Link>
		</li>
	</ul>
</nav>
<section class="mt-4">
	{#if !hash || hash === '#view-items'}
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
						<Button
							type="button"
							disabled={!selecteds.some((v) => v)}
							noPadding
							class="px-1 py-1 rounded-lg"
						>
							<span
								class="material-symbols-rounded align-middle transition-transform duration-300 group-hover:duration-200 ease-in-out rotate-0 group-hover:rotate-180"
								>delete</span
							>
						</Button>
					</li>
				</ul>
			</nav>
			{#await Promise.all([tablePromise, data.tableItemsRef.deref()])}
				<div
					in:fade={{ delay: 120, duration: 100, easing: sineInOut }}
					out:fade={{ duration: 100, easing: sineInOut }}
				>
					<ThreeDotsLoader class="w-3 h-3 bg-slate-300" />
				</div>
			{:then [table, items]}
				{#if table && items}
					<div
						in:fade={{ delay: 120, duration: 100, easing: sineInOut }}
						out:fade={{ duration: 100, easing: sineInOut }}
					>
						<TableItems {items} {table} bind:selecteds />
					</div>
				{/if}
			{/await}
		</div>
	{:else if hash === '#create-item'}
		<div
			class="border rounded-lg p-2 bg-white"
			in:fade={{ delay: 100, duration: 200, easing: sineInOut }}
			out:fade={{ duration: 100, easing: sineInOut }}
		>
			{#await tablePromise then table}
				{#if table}
					<CreateTableItemForm {table} attributes={createItemFormAttributes} />
				{/if}
			{/await}
		</div>
	{:else if hash === '#details'}
		<div
			class="border rounded-lg p-2 bg-white"
			in:fade={{ delay: 100, duration: 200, easing: sineInOut }}
			out:fade={{ duration: 100, easing: sineInOut }}
		>
			#details
		</div>
	{/if}
</section>
