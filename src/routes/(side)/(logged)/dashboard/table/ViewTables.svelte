<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { quadOut, sineOut } from 'svelte/easing';
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';
	import TableList from './TableList.svelte';
	import Button from '$lib/Button.svelte';
	import ThreeDotsLoader from '$lib/ThreeDotsLoader.svelte';
	import { api } from '$lib/api';
	import Spinner from '$lib/Spinner.svelte';

	export let data: PageData;
	let refreshDisabled = false;
	let deleting = false;
	let selecteds: boolean[] = [];
	let message = {
		text: '',
		color: 'bg-slate-400',
		timeoutMs: 0
	};

	const refresh = () => {
		refreshDisabled = true;
		selecteds = [];
		invalidate('/dashboard/table#view-tables')
			.then(() => data.tablesRef.deref()!)
			.finally(() => {
				refreshDisabled = false;
			});
	};

	const setMessage = (color: string, text: string, ms: number = 3000) => {
		if (message.timeoutMs) {
			clearTimeout(message.timeoutMs);
		}
		message.color = color;
		message.text = text;
		message.timeoutMs = setTimeout(() => {
			message.timeoutMs = 0;
			message.text = '';
		}, ms) as any as number;
	};

	const deleteTables = async () => {
		deleting = true;
		const deletings = (await data.tablesRef.deref()!)
			.filter((_, k) => selecteds[k])
			.map((table) => table.TableName);
		if (!deletings || !deletings.length) {
			deleting = false;
			return;
		}
		api
			.use(fetch)
			.post('/table/delete', { body: JSON.stringify(deletings) })
			.then(async (v) => {
				if (v.status === 200) {
					setMessage('text-green-600', `Đã xóa thành công ${(await v.json()).deletedCount} bảng.`);
				} else {
					setMessage('text-red-600', await v.text());
				}
			})
			.finally(() => {
				refresh();
				deleting = false;
			});
	};
</script>

<div
	in:fly|local={{ x: -5, duration: 300, easing: quadOut }}
	class="flex flex-col gap-y-2 justify-start"
>
	<div class="flex flex-col sm:flex-row gap-x-4 gap-y-2 sm:items-stretch">
		<nav>
			<ul class="flex gap-x-2 p-1 border rounded-lg w-fit drop-shadow-sm">
				<li>
					<Button
						type="button"
						disabled={refreshDisabled}
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
						on:click={deleteTables}
						noPadding
						disabled={deleting || !selecteds.some((selected) => selected)}
						class="relative px-1 py-1 rounded-lg"
					>
						<div
							class="absolute left-1/2 -translate-x-1/2 transition-opacity opacity-0"
							class:opacity-100={deleting}
						>
							<Spinner class="w-5 h-5" />
						</div>
						<span
							class:opacity-0={deleting}
							class="material-symbols-rounded align-middle transition-transform duration-300 hover:duration-100 group-hover:duration-200 ease-in-out rotate-0 group-hover:rotate-180"
							>delete</span
						>
					</Button>
				</li>
			</ul>
		</nav>
		{#if message.text}
			<p
				transition:fade|local={{ duration: 300, easing: quadOut }}
				class="{message.color} font-bold rounded text-sm bg-slate-200 border px-4 py-2 flex items-center"
			>
				{message.text}
			</p>
		{/if}
	</div>

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
