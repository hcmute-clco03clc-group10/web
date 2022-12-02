<script lang="ts">
	export let solid: boolean = false;
	export let symbol: string = '';
</script>

<button
	{...$$restProps}
	class={'group relative flex items-center overflow-hidden rounded px-8 py-3 transition transform duration-200 ease-in-out focus:outline-none focus:border-transparent border focus:ring focus:ring-blue-600/60 ' +
		(solid
			? 'bg-blue-600 text-slate-100 border-blue-700'
			: 'border-blue-600 text-blue-600 ') +
		($$restProps.class || '')}
>
	{#if symbol}
	<span
		class="absolute right-0 translate-x-full flex items-center transition-transform group-hover:-translate-x-4"
	>
		<span class="material-symbols-rounded">{symbol}</span>
	</span>
	{/if}
	<span class="text-sm font-medium transition-all group-hover:mr-4">
		<slot />
	</span>
</button>
