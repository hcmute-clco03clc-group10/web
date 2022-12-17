<script lang="ts">
	export let solid = false;
	export let hover = false;
	export let href: string;
	export let ml = 'ml-4';
</script>

<a
	{...$$restProps}
	{href}
	class={'group relative flex items-center overflow-hidden rounded transition transform duration-200 ease-in-out focus:outline-none focus:ring focus:ring-blue-600/60 ' +
		(solid ? 'bg-blue-600 text-slate-100 border-blue-700 ' : 'border-blue-600 text-blue-600 ') +
		($$restProps.class || '')}
>
	<span
		class="absolute left-0 -translate-x-full flex items-center transition-transform {hover
			? '-translate-x-0'
			: 'group-hover:-translate-x-0'}"
	>
		<slot name="symbol" />
	</span>
	<span class="font-medium transition-all {hover ? ml.substring(ml.indexOf(':') + 1) : ml}">
		<slot name="text" />
	</span>
</a>
