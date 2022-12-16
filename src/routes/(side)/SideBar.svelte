<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Link from '$lib/Link.svelte';
	import SideBarItem from './SideBarItem.svelte';
	import SkeletonBar from '$lib/SkeletonBar.svelte';
	import SymbolLink from '$lib/SymbolLink.svelte';

	export let items: ISideBarItem[];
	export let user: Promise<IUser>;
	let activeRef: WeakRef<ISideBarItem> | undefined;
	const recursivelyFindActive = (
		pathname: string,
		items?: ISideBarItem[]
	): ISideBarItem | undefined => {
		if (!items) {
			return undefined;
		}
		for (const item of items) {
			const active = recursivelyFindActive(pathname, item.children);
			if (active) {
				return active;
			}
			if (item.href === pathname) {
				return item;
			}
		}
		return undefined;
	};
	afterNavigate((nav) => {
		const to = nav.to;
		if (!to) {
			return;
		}
		const active = recursivelyFindActive(to.url.pathname, items);
		if (active) {
			activeRef = new WeakRef(active);
		} else {
			activeRef = undefined;
		}
	});
</script>

<div class="flex min-h-screen flex-col justify-between border-r bg-slate-50">
	<div class="px-2 lg:px-4 py-6">
		<a href="/" class="flex flex-row gap-x-2 items-center justify-center lg:justify-start">
			<img
				class="h-6 w-auto sm:h-8 object-fill"
				src="/images/cloudbase.png"
				alt="Cloudbase logo."
			/>
			<h2 class="font-bold text-xl text-blue-600 hidden lg:block">Cloudbase</h2>
		</a>

		<nav aria-label="Main Nav" class="mt-6 flex flex-col gap-y-2">
			{#each items as item (item)}
				<SideBarItem {activeRef} {item} />
			{/each}
		</nav>
	</div>

	<div
		class="sticky text-sm inset-x-0 bottom-0 border-t border-slate-200 flex flex-col items-start p-4 gap-y-2 bg-slate-50"
	>
		{#await user}
			<SkeletonBar class="w-full h-4" />
		{:then user}
			<p class="hidden lg:block">{user.email}</p>
		{/await}
		<Link href="/signout">
			<span class="inline lg:hidden text-sm">Logout</span>
		</Link>
		<SymbolLink
			href="/signout"
			class="w-fit bg-blue-600 border border-blue-700 py-1 px-4 hidden lg:block"
		>
			<span slot="text" class="whitespace-nowrap font-medium text-slate-50"> Sign out </span>
			<span
				slot="symbol"
				class="material-symbols-rounded text-slate-50 transition group-hover:-translate-x-2"
				>trending_flat</span
			>
		</SymbolLink>
	</div>
</div>
