<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import SkeletonBar from '$lib/SkeletonBar.svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicIn, cubicOut, sineIn, sineOut } from 'svelte/easing';
	import '../../app.css';
	import Header from '$lib/Header.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let navigating = false;
	let promise: Promise<void> | undefined;
	beforeNavigate((nav) => {
		if (promise) {
			nav.cancel();
			return;
		}
		promise = new Promise((resolve) =>
			setTimeout(() => {
				resolve();
				promise = undefined;
			}, 200)
		);
		navigating = true;
	});
	afterNavigate(async () => {
		await promise;
		navigating = false;
		promise = undefined;
	});
</script>

<div
	class="w-full max-w-7xl mx-auto min-h-screen flex flex-col justify-start gap-y-10 bg-slate-50 py-4 px-6 md:px-10"
>
	<Header bind:logging={data.logging} />
	<main class="flex-grow">
		{#if navigating}
			<section
				in:fly={{ y: -7, delay: 100, duration: 150, easing: sineOut }}
				out:fade|local={{ duration: 100, easing: sineIn }}
				class="bsolute t-0 l-0 w-3/4 flex flex-col gap-y-6"
			>
				<SkeletonBar via="via-slate-300" class="w-2/3 h-12" />
				<SkeletonBar via="via-slate-300" class="w-3/4 h-6" />
				<SkeletonBar via="via-slate-300" class="w-1/3 h-4" />
				<SkeletonBar via="via-slate-300" class="w-1/4 h-4" />
				<SkeletonBar via="via-slate-300" class="w-2/5 h-4" />
				<SkeletonBar via="via-slate-300" class="w-1/4 h-12" />
				<SkeletonBar via="via-slate-300" class="w-2/5 h-8" />
				<SkeletonBar via="via-slate-300" class="w-1/2 h-4" />
			</section>
		{:else}
			<section
				in:fly={{ y: -7, delay: 100, duration: 150, easing: sineOut }}
				out:fade|local={{ duration: 100, easing: sineIn }}
			>
				<slot />
			</section>
		{/if}
	</main>
	<hr />
	<footer>
		<div
			class="mx-auto flex w-full xl:w-3/4 flex-col-reverse items-center justify-between space-y-6 space-y-reverse px-4 py-10 text-sm font-medium text-slate-500 md:flex-row md:items-start md:space-y-0"
		>
			<p>Cloudbase © 2022.</p>
			<nav
				class="flex flex-col flex-wrap items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
			>
				<a href="/about" class="hover:text-slate-900">About</a>
				<a href="https://github.com/hcmute-clco03clc-group10" class="hover:text-slate-900">GitHub</a
				>
			</nav>
		</div>
	</footer>
</div>
