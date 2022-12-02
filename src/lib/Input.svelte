<script lang="ts">
	export let value: string | undefined;
</script>

<input
	on:input
	bind:value
	{...$$restProps}
	class="rounded px-5 py-3 text-base text-slate-600 placeholder-slate-400 transition duration-200 ease-in-out transform border-slate-400 bg-slate-50 focus:outline-none focus:border-transparent focus:ring focus:ring-blue-600/60 {$$restProps.class}"
/>
