<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Button from '$lib/Button.svelte';
	import TableAddForm from '$lib/TableAddForm.svelte';
	import TableList from '$lib/TableList.svelte';
	import ThreeDotsLoader from '$lib/ThreeDotsLoader.svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { store } from './store';

	export let data: PageData;
	let disabledRefresh = false;

	const refresh = () => {
		disabledRefresh = true;
		invalidate((url) => url.pathname.endsWith('/table'))
			.then(() => data.tablesRef.deref()!)
			.finally(() => {
				disabledRefresh = false;
			});
		store.update((v) => {
			v.page = 'list';
			return v;
		});
	};

	const add = () => {
		store.update((v) => {
			v.page = 'add';
			return v;
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
				disabled={$store.page === 'add'}
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
			<div
				in:fade={{ delay: 100, duration: 100, easing: sineInOut }}
				out:fade={{ duration: 100, easing: sineInOut }}
			>
				<ThreeDotsLoader class="w-3 h-3 bg-slate-300" />
			</div>
		{:then tables}
			<div
				in:fade={{ delay: 100, duration: 100, easing: sineInOut }}
				out:fade={{ duration: 100, easing: sineInOut }}
			>
				<TableList items={tables} />
			</div>
		{/await}
	{:else if $store.page === 'add'}
		<div
			in:fade={{ delay: 100, duration: 300, easing: sineInOut }}
			out:fade={{ duration: 100, easing: sineInOut }}
		>
			<TableAddForm form={$store.addForm} />
		</div>
	{/if}
</section>
