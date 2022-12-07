<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import Skeleton from '$lib/Skeleton.svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import '../app.css';
	import type { PageData } from './$types';
	import Header from '$lib/Header.svelte';

	export let data: PageData;
	let loading = false;
	let promise: Promise<void> | undefined;
	beforeNavigate((nav) => {
		if (nav.from?.routeId === nav.to?.routeId || promise) {
			nav.cancel();
			return;
		}
		promise = new Promise((resolve) =>
			setTimeout(() => {
				resolve();
				promise = undefined;
			}, 350)
		);
		loading = true;
	});
	afterNavigate(async () => {
		await promise;
		loading = false;
	});
</script>

<div
	class="w-screen max-w-7xl mx-auto min-h-screen flex flex-col justify-start gap-y-10 bg-slate-50 py-4 px-6 md:px-10"
>
	<div class="">
		<Header bind:loggedIn={data.loggedIn} />
	</div>
	<main class="flex-grow">
		{#if loading}
			<section
				in:fade|local={{ delay: 100, duration: 200, easing: cubicOut }}
				out:fly|local={{ y: 10, duration: 100, easing: cubicIn }}
			>
				<Skeleton />
			</section>
		{:else}
			<section
				in:fly|local={{ y: -10, delay: 100, duration: 200, easing: cubicOut }}
				out:fade|local={{ duration: 100, easing: cubicIn }}
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
