<script lang="ts">
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import Spinner from './Spinner.svelte';
	import SymbolLink from './SymbolLink.svelte';
	import ThreeDotsLoader from './ThreeDotsLoader.svelte';

	export let logging: WeakRef<Promise<boolean>>;
</script>

<div class="relative">
	<div class="w-full">
		<div class="flex items-center justify-between border-b-2 py-6 md:justify-start md:space-x-10">
			<div class="flex justify-start lg:w-0 lg:flex-1">
				<a href="/" class="flex flex-row gap-x-2 items-center">
					<img
						class="h-8 w-auto sm:h-12 object-fill"
						src="/images/cloudbase.png"
						alt="Cloudbase logo."
					/>
					<h2 class="font-bold text-2xl text-blue-600">Cloudbase</h2>
				</a>
			</div>
			<div class="-my-2 -mr-2 md:hidden">
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
					aria-expanded="false"
				>
					<span class="sr-only">Open menu</span>
					<!-- Heroicon name: outline/bars-3 -->
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
			</div>
			<nav class="hidden space-x-10 md:flex">
				<a href="/docs" class="text-base font-medium text-slate-500 hover:text-slate-900">Docs</a>
			</nav>
			<div class="relative hidden items-center justify-end md:flex md:flex-1 lg:w-0">
				{#await logging.deref()}
					<div transition:fade={{ duration: 150, easing: sineInOut }} class="absolute t-0 l-0">
						<ThreeDotsLoader class="w-2.5 h-2.5 bg-slate-400" />
					</div>
				{:then logged}
					{#if logged}
						<div in:fade={{ duration: 100, easing: sineInOut }}>
							<SymbolLink href="/signout">
								<span slot="symbol" class="material-symbols-rounded">trending_flat</span>
								<span
									slot="text"
									class="whitespace-nowrap font-medium text-slate-500 group-hover:text-slate-900 group-hover:mr-3"
									>Sign out</span
								>
							</SymbolLink>
						</div>
					{:else}
						<div in:fade={{ duration: 100, easing: sineInOut }}>
							<a
								href="/login"
								class="whitespace-nowrap text-base font-medium text-slate-500 hover:text-slate-900"
								>Log in</a
							>
							<a
								href="/signup"
								class="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
								>Sign up</a
							>
						</div>
					{/if}
				{/await}
			</div>
		</div>
	</div>

	<!--
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  -->
	<div class="hidden absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
		<div
			class="divide-y-2 divide-slate-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
		>
			<div class="px-5 py-4">
				<div class="flex items-center justify-between">
					<div>
						<img class="h-8 w-auto" src="/images/cloudbase.png" alt="Cloudbase logo." />
					</div>
					<div class="-mr-2">
						<button
							type="button"
							class="inline-flex items-center justify-center rounded-md bg-white p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
						>
							<span class="sr-only">Close menu</span>
							<!-- Heroicon name: outline/x-mark -->
							<svg
								class="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div class="space-y-6 py-6 px-5">
				<div class="grid grid-cols-2 gap-y-4 gap-x-8">
					<a href="/" class="text-base font-medium text-slate-900 hover:text-slate-700">Docs</a>
				</div>
				<div>
					{#await logging.deref()}
						<Spinner class="text-slate-300" />
					{:then logged}
						{#if logged}
							<SymbolLink
								href="/signout"
								class="w-fit bg-blue-600 border border-blue-700 py-1 px-4"
							>
								<span slot="symbol" class="material-symbols-rounded text-slate-50"
									>trending_flat</span
								>
								<span slot="text" class="whitespace-nowrap font-medium text-slate-50">Sign out</span
								>
							</SymbolLink>
						{:else}
							<a
								href="/signup"
								class="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
								>Sign up</a
							>
							<p class="mt-6 text-center text-base font-medium text-slate-500">
								Existing customer?
								<a href="/login" class="text-blue-600 hover:text-blue-500">Log in</a>
							</p>
						{/if}
					{/await}
				</div>
			</div>
		</div>
	</div>
</div>
