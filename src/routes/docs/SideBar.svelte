<script lang="ts">
	import Link from '$lib/Link.svelte';

	const links = [
		{ href: '/docs/user', text: 'User' },
		{ href: '/docs/token', text: 'Token' },
		{ href: '/docs/table', text: 'Table' },
		{ href: '/docs/item', text: 'Item' }
	];
</script>

<section class="flex flex-col gap-y-4 items-end text-xl border-r py-4 pr-8 pl-20 min-h-screen">
	<a href="/" class="flex flex-row gap-x-2 items-center">
		<img
			class="block h-6 w-auto sm:h-8 object-fill"
			src="/images/cloudbase.png"
			alt="Cloudbase logo."
		/>
		<h2 class="font-bold text-2xl text-blue-600">Cloudbase</h2>
	</a>
	<ul class="flex flex-col gap-y-4 text-right">
		{#each links as link}
			<li>
				<Link href={link.href}>{link.text}</Link>
			</li>
		{/each}
	</ul>
</section>
