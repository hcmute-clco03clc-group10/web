<script lang="ts">
	import '../../app.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import SideBar from '$lib/SideBar.svelte';
	import SkeletonBar from '$lib/SkeletonBar.svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import { TEMPORARY_REDIRECT } from 'http-status';

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
			}, 500)
		);
		navigating = true;
	});
	afterNavigate(async () => {
		await promise;
		navigating = false;
	});
	let items: ISideBarItem[] = [
		{
			text: 'Database',
			symbol: 'dns',
			children: [{ text: 'Tables', symbol: 'view_list', href: '/dashboard/table' }]
		},
		{ text: 'User', symbol: 'account_circle', href: '/dashboard/user' }
	];
</script>

<section class="flex justify-start items-start">
	{#if $page.data.userRef}
		<SideBar {items} user={$page.data.userRef.deref()} />
	{/if}
	<main class="relative p-6 w-full min-h-screen">
		{#await promise}
			<div
				class="absolute t-0 l-0 w-3/4 flex flex-col gap-y-6"
				in:fade={{ delay: 100, duration: 200, easing: cubicOut }}
				out:fly={{ x: 10, duration: 100, easing: cubicIn }}
			>
				<SkeletonBar via="via-slate-300" class="w-1/2 h-12" />
				<SkeletonBar via="via-slate-300" class="w-3/4 h-6" />
				<SkeletonBar via="via-slate-300" class="w-1/3 h-4" />
				<SkeletonBar via="via-slate-300" class="w-1/4 h-4" />
				<SkeletonBar via="via-slate-300" class="w-1/5 h-4" />
				<SkeletonBar via="via-slate-300" class="w-1/4 h-12" />
				<SkeletonBar via="via-slate-300" class="w-2/5 h-8" />
				<SkeletonBar via="via-slate-300" class="w-1/2 h-4" />
				<SkeletonBar via="via-slate-300" class="w-1/5 h-10" />
				<SkeletonBar via="via-slate-300" class="w-1/4 h-6" />
				<SkeletonBar via="via-slate-300" class="w-3/4 h-4" />
				<SkeletonBar via="via-slate-300" class="w-2/3 h-8" />
				<SkeletonBar via="via-slate-300" class="w-1/3 h-4" />
				<SkeletonBar via="via-slate-300" class="w-1/4 h-4" />
				<SkeletonBar via="via-slate-300" class="w-2/5 h-10" />
			</div>
		{:then}
			<section
				in:fly={{ x: -10, delay: 100, duration: 200, easing: cubicOut }}
				out:fade={{ duration: 100, easing: cubicIn }}
			>
				<slot />
			</section>
		{/await}
	</main>
</section>
