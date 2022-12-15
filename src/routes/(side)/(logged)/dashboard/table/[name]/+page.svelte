<script lang="ts">
	import { page } from '$app/stores';
	import Link from '$lib/Link.svelte';
	import SkeletonBar from '$lib/SkeletonBar.svelte';
	import ThreeDotsLoader from '$lib/ThreeDotsLoader.svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import CreateItem from './CreateItem.svelte';
	import ViewItems from './ViewItems.svelte';

	export let data: PageData;
	let hash: string;
	$: hash = $page.url.hash;
</script>

<svelte:head>
	{#await data.tableRef.deref() then table}
		{#if table}
			<title>Cloudbase • {table.TableName}</title>
		{/if}
	{/await}
</svelte:head>

<h1 class="text-2xl font-bold">
	{#await data.tableRef.deref()}
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
		<ViewItems {data} />
	{:else if hash === '#create-item'}
		{#await data.tableRef.deref()}
			<div in:fade={{ delay: 100, duration: 100, easing: sineInOut }}>
				<ThreeDotsLoader class="w-3 h-3 bg-slate-300" />
			</div>
		{:then table}
			{#if table}
				<div
					in:fade={{ delay: 100, duration: 150, easing: sineInOut }}
					out:fade={{ duration: 100, easing: sineInOut }}
				>
					<CreateItem {table} />
				</div>
			{/if}
		{/await}
	{:else if hash === '#details'}
		#details
	{/if}
</section>
