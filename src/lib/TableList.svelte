<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quadIn, quadOut } from 'svelte/easing';
	export let header = 'Tables';
	export let items: string[] = [];
	onMount(() => {
		let count = 1;
		let interval = setInterval(() => {
			items.push(`Table no. ${count++}`);
			if (count === 10) {
				clearInterval(interval);
			}
			items = items.sort(() => Math.random() - 0.5);
		}, 300);
	});
</script>

<section class="w-fit text-xl p-3 rounded border border-slate-300">
	<header class="flex justify-between items-center gap-4">
		<h2 class="text-2xl font-semibold">{header}</h2>
		<button
			type="button"
			class="material-symbols-rounded align-middle rounded-full transition-color duration-200
		hover:text-blue-600 hover:ring-1 hover:-ring-offset-2 hover:ring-blue-600"
		>
			add_circle
		</button>
	</header>
	<nav class="hidden md:block">
		<ul class="flex flex-col">
			{#each items as item (item)}
				<a
					class="group mt-3 bg-slate-200 rounded p-2
					hover:bg-blue-200 transition-color duration-100
					hover:ring-1 hover:ring-blue-600"
					animate:flip={{ duration: 500, easing: quadOut }}
					href="/"
					in:fly={{ y: -10, duration: 300, easing: quadIn }}
				>
					<li>
						<span
							class="material-symbols-rounded align-middle text-slate-600 duration-100 transition-color
							group-hover:text-slate-900"
						>
							table_view
						</span>
						{item}
					</li>
				</a>
			{/each}
		</ul>
	</nav>
</section>

<style>
	section {
		min-width: 6em;
	}
</style>
