<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quadOut, sineOut } from 'svelte/easing';
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';
	import TableList from '$lib/TableList.svelte';
	import Button from '$lib/Button.svelte';
	import ThreeDotsLoader from '$lib/ThreeDotsLoader.svelte';

	export let data: PageData;
	let disabledRefresh = false;
	let disabledDelete = false;
	let selecteds: boolean[] = [];

	const refresh = () => {
		disabledRefresh = true;
		selecteds = [];
		invalidate('/dashboard/table#view-tables')
			.then(() => data.tablesRef.deref()!)
			.finally(() => {
				disabledRefresh = false;
			});
	};
</script>

<div
	in:fly|local={{ x: -5, duration: 300, easing: quadOut }}
	class="flex flex-col gap-y-4 justify-start"
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
			in:fly|local={{ y: -10, delay: 100, duration: 200, easing: quadOut }}
			out:fly|local={{ y: 10, duration: 100, easing: sineOut }}
		>
			<ThreeDotsLoader class="w-3 h-3 bg-slate-300" />
		</div>
	{:then tables}
		<div
			in:fly|local={{ y: -10, delay: 100, duration: 300, easing: quadOut }}
			out:fly|local={{ y: 10, duration: 100, easing: sineOut }}
		>
			<TableList items={tables} bind:selecteds />
		</div>
	{/await}
</div>
