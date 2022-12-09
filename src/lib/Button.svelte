<script lang="ts">
	export let solid = false;
	export let noPadding = false;
</script>

<button
	on:click
	{...$$restProps}
	class={`group relative flex items-center rounded ${
		!noPadding ? 'px-8 py-3' : ''
	} transition duration-200 ease-in-out focus:outline-none focus:border-transparent border focus:ring focus:ring-blue-600/60 disabled:border-slate-500 disabled:text-slate-500 disabled:bg-slate-200 ` +
		(solid ? 'bg-blue-600 text-slate-100 border-blue-700 ' : 'border-blue-600 text-blue-600 ') +
		($$restProps.class || '')}
>
	<span class="transition-transform duration-300 group-hover:duration-200 ease-in-out rotate-0 group-hover:rotate-180">
		<slot />
	</span>
</button>
