<script lang="ts">
	import SideBarItem from './SideBarItem.svelte';
	import SkeletonBar from './SkeletonBar.svelte';
	import SymbolLink from './SymbolLink.svelte';

	export let items: ISideBarItem[];
	export let user: Promise<IUser>;
</script>

<div class="flex min-h-screen flex-col justify-between border-r bg-slate-50">
	<div class="px-4 py-6">
		<a href="/" class="flex flex-row gap-x-2 items-center">
			<img
				class="h-6 w-auto sm:h-8 object-fill"
				src="/images/cloudbase.png"
				alt="Cloudbase logo."
			/>
			<h2 class="font-bold text-xl text-blue-600">Cloudbase</h2>
		</a>

		<nav aria-label="Main Nav" class="mt-6 flex flex-col gap-y-2">
			{#each items as item (item)}
				<SideBarItem {item} />
			{/each}
		</nav>
	</div>

	<div
		class="sticky text-sm inset-x-0 bottom-0 border-t border-slate-200 flex flex-col items-start p-4 gap-y-2 bg-slate-50"
	>
		{#await user}
			<SkeletonBar class="w-full h-4" />
		{:then user}
			<p>{user.email}</p>
		{/await}
		<SymbolLink href="/signout" class="w-fit bg-blue-600 border border-blue-700 py-1 px-4">
			<span slot="text" class="whitespace-nowrap font-medium text-slate-50">Sign out</span>
			<span
				slot="symbol"
				class="material-symbols-rounded text-slate-50 transition group-hover:-translate-x-2"
				>trending_flat</span
			>
		</SymbolLink>
	</div>
</div>
