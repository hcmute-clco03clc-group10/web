<script>
	import { page } from '$app/stores';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import Skeleton from '$lib/Skeleton.svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import status from 'http-status';
	import SymbolButton from '$lib/SymbolButton.svelte';
	import Spinner from '$lib/Spinner.svelte';
	import SymbolLink from '$lib/SymbolLink.svelte';
</script>

<svelte:head>
	<title>{$page.status} - {status[$page.status]}</title>
</svelte:head>

<div
	class="w-full max-w-7xl mx-auto min-h-screen flex flex-col justify-start gap-y-10 bg-slate-50 py-4 px-6 md:px-10"
>
	<main class="flex-grow flex flex-col items-center justify-center">
		<p class="text-9xl font-bold text-center text-slate-500">
			{$page.status}
		</p>
		<h1 class="text-6xl font-bold text-center text-slate-500">
			{status[$page.status]}
		</h1>
		<p class="mt-6 text-2xl text-center text-slate-600">
			{status[`${$page.status}_MESSAGE`]}
		</p>
		<p class="mt-8 text-xl text-center">
			<span class="text-slate-600 font-medium">Reason: "</span>{$page.error?.message}<span
				class="text-slate-600 font-medium">"</span
			>
		</p>
		<SymbolLink solid href="/" type="submit" class="mt-4 px-8 py-3">
			<span slot="symbol" class="material-symbols-rounded group-hover:-translate-x-4">
				trending_flat
			</span>
			<span slot="text"> Back home </span>
		</SymbolLink>
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
