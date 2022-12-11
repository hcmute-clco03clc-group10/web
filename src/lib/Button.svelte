<script lang="ts">
	export let solid = false;
	export let noPadding = false;
</script>

<button
	on:click
	{...$$restProps}
	class="group relative flex items-center rounded transition duration-200 ease-in-out focus:outline-none focus:border-transparent border focus:ring focus:ring-blue-600/60 disabled:border-slate-400 disabled:text-slate-400 disabled:bg-slate-300
	{!noPadding ? 'px-8 py-3' : ''}
		{solid
		? 'bg-blue-600 text-slate-100 border-blue-700 '
		: 'border-blue-600 text-blue-600 '} {$$restProps.class || ''}"
>
	<slot />
</button>
