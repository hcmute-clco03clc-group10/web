<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import Skeleton from '$lib/Skeleton.svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import '../app.css';

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
			}, 300)
		);
		loading = true;
	});
	afterNavigate(async () => {
		await promise;
		loading = false;
	});
</script>

<div
	class="w-screen max-w-screen min-h-screen flex flex-col justify-start gap-y-10 bg-slate-50 py-4 px-6"
>
	<header>
		<div class="mx-auto flex w-full xl:w-3/4 items-center justify-between">
			<div class="flex items-center space-x-2">
				<a href="/">
					<h1 class="text-xl sm:text-4xl font-bold leading-relaxed uppercase">db:online</h1>
				</a>
			</div>
			<nav class="hidden items-center space-x-2 text-sm font-medium text-gray-800 md:flex">
				<a href="/about" class="rounded bg-slate-50 px-3 py-2 transition hover:bg-gray-100">About</a
				>
			</nav>
			<nav class="flex items-center space-x-1 text-sm font-medium text-gray-800">
				<a
					href="/login"
					class="hidden rounded bg-slate-50 px-3 py-2 transition hover:bg-gray-100 sm:inline"
					>Login</a
				>
				<a
					href="/signup"
					class="rounded bg-blue-600 px-3 py-2 text-slate-50 transition hover:bg-blue-700"
					>Sign Up</a
				>
			</nav>
		</div>
		<hr class="mt-4" />
	</header>
	<main class="flex-grow w-full xl:w-3/4 mx-auto">
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
			<div class="flex items-center space-x-4">
				<a href="/">
					<h1 class="text-xl sm:text-xl font-bold leading-relaxed uppercase">db:online</h1>
				</a>
				<p>DB:ONLINE © 2022.</p>
			</div>
			<nav
				class="flex flex-col flex-wrap items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
			>
				<a href="/about" class="hover:text-slate-900">About</a>
				<a href="https://github.com/hcmute-clco03clc-group11" class="hover:text-slate-900">GitHub</a
				>
			</nav>
		</div>
	</footer>
</div>
