<script>
	import SideBar from './SideBar.svelte';
</script>

<section class="flex gap-x-8">
	<SideBar />
	<div class="max-h-screen overflow-y-auto w-full py-4">
		<main class="py-2 prose prose-slate">
			<slot />
		</main>
	</div>
</section>
