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
				<a href="/" class="text-base font-medium text-slate-500 hover:text-slate-900">Pricing</a>
				<a href="/" class="text-base font-medium text-slate-500 hover:text-slate-900">Docs</a>

				<div class="relative">
					<!-- Item active: "text-slate-900", Item inactive: "text-slate-500" -->
					<button
						type="button"
						class="text-slate-500 group inline-flex items-center rounded-md text-base font-medium hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						aria-expanded="false"
					>
						<span>More</span>
						<!--
              Heroicon name: mini/chevron-down

              Item active: "text-slate-600", Item inactive: "text-slate-400"
            -->
						<svg
							class="text-slate-400 ml-2 h-5 w-5 group-hover:text-slate-500"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>

					<!--
            'More' flyout menu, show/hide based on flyout menu state.

            Entering: "transition ease-out duration-200"
              From: "opacity-0 translate-y-1"
              To: "opacity-100 translate-y-0"
            Leaving: "transition ease-in duration-150"
              From: "opacity-100 translate-y-0"
              To: "opacity-0 translate-y-1"
          -->
					<div
						class="hidden absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0"
					>
						<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
							<div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
								<a href="/" class="-m-3 flex items-start rounded-lg p-3 hover:bg-slate-50">
									<!-- Heroicon name: outline/lifebuoy -->
									<svg
										class="h-6 w-6 flex-shrink-0 text-blue-600"
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
											d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
										/>
									</svg>
									<div class="ml-4">
										<p class="text-base font-medium text-slate-900">Help Center</p>
										<p class="mt-1 text-sm text-slate-500">
											Get all of your questions answered in our forums or contact support.
										</p>
									</div>
								</a>

								<a href="/" class="-m-3 flex items-start rounded-lg p-3 hover:bg-slate-50">
									<!-- Heroicon name: outline/bookmark-square -->
									<svg
										class="h-6 w-6 flex-shrink-0 text-blue-600"
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
											d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
										/>
									</svg>
									<div class="ml-4">
										<p class="text-base font-medium text-slate-900">Guides</p>
										<p class="mt-1 text-sm text-slate-500">
											Learn how to maximize our platform to get the most out of it.
										</p>
									</div>
								</a>

								<a href="/" class="-m-3 flex items-start rounded-lg p-3 hover:bg-slate-50">
									<!-- Heroicon name: outline/calendar -->
									<svg
										class="h-6 w-6 flex-shrink-0 text-blue-600"
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
											d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
										/>
									</svg>
									<div class="ml-4">
										<p class="text-base font-medium text-slate-900">Events</p>
										<p class="mt-1 text-sm text-slate-500">
											See what meet-ups and other events we might be planning near you.
										</p>
									</div>
								</a>

								<a href="/" class="-m-3 flex items-start rounded-lg p-3 hover:bg-slate-50">
									<!-- Heroicon name: outline/shield-check -->
									<svg
										class="h-6 w-6 flex-shrink-0 text-blue-600"
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
											d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
										/>
									</svg>
									<div class="ml-4">
										<p class="text-base font-medium text-slate-900">Security</p>
										<p class="mt-1 text-sm text-slate-500">
											Understand how we take your privacy seriously.
										</p>
									</div>
								</a>
							</div>
							<div class="bg-slate-50 px-5 py-5 sm:px-8 sm:py-8">
								<div>
									<h3 class="text-base font-medium text-slate-500">Recent Posts</h3>
									<ul role="list" class="mt-4 space-y-4">
										<li class="truncate text-base">
											<a href="/" class="font-medium text-slate-900 hover:text-slate-700"
												>Boost your conversion rate</a
											>
										</li>

										<li class="truncate text-base">
											<a href="/" class="font-medium text-slate-900 hover:text-slate-700"
												>How to use search engine optimization to drive traffic to your site</a
											>
										</li>

										<li class="truncate text-base">
											<a href="/" class="font-medium text-slate-900 hover:text-slate-700"
												>Improve your customer experience</a
											>
										</li>
									</ul>
								</div>
								<div class="mt-5 text-sm">
									<a href="/" class="font-medium text-blue-600 hover:text-blue-500">
										View all posts
										<span aria-hidden="true"> &rarr;</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
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
					<a href="/" class="text-base font-medium text-slate-900 hover:text-slate-700">Pricing</a>

					<a href="/" class="text-base font-medium text-slate-900 hover:text-slate-700">Docs</a>

					<a href="/" class="text-base font-medium text-slate-900 hover:text-slate-700"
						>Help Center</a
					>

					<a href="/" class="text-base font-medium text-slate-900 hover:text-slate-700">Guides</a>

					<a href="/" class="text-base font-medium text-slate-900 hover:text-slate-700">Events</a>

					<a href="/" class="text-base font-medium text-slate-900 hover:text-slate-700">Security</a>
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
