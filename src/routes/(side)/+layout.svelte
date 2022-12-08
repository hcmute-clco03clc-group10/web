<script lang="ts">
	import '../../app.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import SideBar from '$lib/SideBar.svelte';

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
			}, 3500)
		);
		navigating = true;
	});
	afterNavigate(async () => {
		await promise;
		navigating = false;
	});
	const items: ISideBarItem[] = [
		{
			text: 'Database',
			symbol: 'storage',
			active: true,
			children: [
				{
					text: '1',
					symbol: 'storage'
				}
			]
		},
		{ text: 'User', symbol: 'person' }
	];
</script>

<section class="flex justify-start items-start hidden md:flex">
	<SideBar {items} userRef={$page.data.userRef} />
	<slot />
</section>
