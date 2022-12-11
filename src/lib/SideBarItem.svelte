<script lang="ts">
	import 'animate.css';
	import { onMount } from 'svelte';
	export let item: ISideBarItem;
	export let activeRef: WeakRef<ISideBarItem> | undefined;
	let active = false;
	let open = false;
	$: active = activeRef?.deref() === item;

	const shouldOpen = (item?: ISideBarItem) => {
		if (!item?.children) {
			return false;
		}
		for (const child of item.children) {
			if (child === activeRef!.deref()) {
				return true;
			}
			const should = shouldOpen(child);
			if (should) {
				return true;
			}
		}
		return false;
	};
	onMount(() => {
		if (item.children) {
			const interval = setInterval(() => {
				if (!activeRef) {
					return;
				}
				clearInterval(interval);
				open = shouldOpen(item);
			}, 10);
		}
	});
</script>

{#if item.children}
	<details class="group flex flex-col gap-y-2 select-none" bind:open>
		<summary
			class="flex cursor-pointer items-center rounded-lg px-4 py-2 gap-x-3 border transition-colors focus:ring focus:ring-blue-600/60 {active
				? 'bg-blue-100  border-blue-200 text-slate-800'
				: 'border-transparent text-slate-700 hover:bg-blue-100'}"
		>
			{#if item.symbol}
				<span class="material-symbols-rounded"> {item.symbol} </span>
			{/if}
			<span class="font-medium hidden lg:inline"> {item.text} </span>

			<span class="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</summary>
		<nav
			class="ml-5 flex flex-col gap-y-2 mt-2 {open
				? 'opacity-100'
				: 'opacity-0'} animate__animated animate__faster"
			class:animate__flipInX={open}
		>
			{#each item.children as child (child)}
				<svelte:self item={child} {activeRef} />
			{/each}
		</nav>
	</details>
{:else if item.href}
	<a
		href={item.href}
		class={'flex select-none items-center gap-x-3 rounded-lg px-4 py-2 transition transform border focus:ring focus:ring-blue-600/60 ' +
			(active
				? 'bg-blue-100 border-blue-200 text-slate-800'
				: 'hover:bg-blue-100 text-slate-700 border-transparent')}
	>
		{#if item.symbol}
			<span class="material-symbols-rounded"> {item.symbol} </span>
		{/if}
		<span class="font-medium hidden lg:inline"> {item.text} </span>
	</a>
{:else}
	<button
		type="button"
		class={active
			? 'flex items-center gap-x-3 rounded-lg px-4 py-2 bg-blue-100 border border-blue-200 text-slate-800  focus:ring focus:ring-blue-600/60'
			: 'flex items-center gap-x-3 rounded-lg px-4 py-2 text-slate-700 hover:bg-blue-100 focus:ring focus:ring-blue-600/60'}
	>
		{#if item.symbol}
			<span class="material-symbols-rounded"> {item.symbol} </span>
		{/if}
		<span class="font-medium hidden lg:inline"> {item.text} </span>
	</button>
{/if}
