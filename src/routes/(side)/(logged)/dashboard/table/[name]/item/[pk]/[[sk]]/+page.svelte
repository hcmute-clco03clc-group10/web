<script lang="ts">
	import { page } from '$app/stores';
	import Badge from '$lib/Badge.svelte';
	import LeftSymbolLink from '$lib/LeftSymbolLink.svelte';
	import SkeletonBar from '$lib/SkeletonBar.svelte';
	import SymbolLink from '$lib/SymbolLink.svelte';
	import ThreeDotsLoader from '$lib/ThreeDotsLoader.svelte';
	import { quadOut, sineOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import EditItem from './EditItem.svelte';

	export let data: PageData;
</script>

<h1 class="text-2xl font-bold mb-2">
	{#await data.tableRef.deref()}
		<SkeletonBar via="via-slate-300" class="w-48 h-4 my-3" />
	{:then table}
		{#if table}
			<LeftSymbolLink href="/dashboard/table/{table.TableName}" class="w-fit" ml="group-hover:ml-6">
				<span slot="text" class="">
					{table.TableName}
				</span>
				<span slot="symbol" class="material-symbols-rounded text-2xl"> navigate_before </span>
			</LeftSymbolLink>
		{:else}
			Table
		{/if}
	{/await}
</h1>
{#await Promise.all([data.tableRef.deref(), data.itemRef.deref()])}
	<div
		in:fly={{ x: -10, duration: 200, easing: quadOut }}
		out:fly|local={{ x: 10, duration: 100, easing: sineOut }}
		class="absolute"
	>
		<ThreeDotsLoader class="w-3 h-3 bg-slate-300" />
	</div>
{:then [table, item]}
	<div
		in:fly={{ x: -10, duration: 200, easing: quadOut }}
		out:fly|local={{ x: 10, duration: 100, easing: sineOut }}
	>
		{#if table && item && Object.keys(item).length}
			<EditItem {table} {item} />
		{:else}
			<Badge class="text-red-500">Item is not found in the table.</Badge>
		{/if}
	</div>
{/await}
