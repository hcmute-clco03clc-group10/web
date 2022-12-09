<script lang="ts">
	export let solid = false;
	export let hover = false;
	export let noPadding = false;
</script>

<button
	{...$$restProps}
	class={`group relative flex items-center overflow-hidden rounded ${!noPadding ? 'px-8 py-3' : ''} transition transform duration-200 ease-in-out focus:outline-none focus:border-transparent border focus:ring focus:ring-blue-600/60 ` +
		(solid ? 'bg-blue-600 text-slate-100 border-blue-700 ' : 'border-blue-600 text-blue-600 ') +
		($$restProps.class || '')}
>
	<span
		class="absolute right-0 translate-x-full flex items-center transition-transform {hover
			? '-translate-x-4'
			: 'group-hover:-translate-x-4'}"
	>
		<slot name="symbol" />
	</span>
	<span class="text-sm font-medium transition-all {hover ? 'mr-4' : 'group-hover:mr-4'}">
		<slot name="text" />
	</span>
</button>
