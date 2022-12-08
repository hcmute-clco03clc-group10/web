<script lang="ts">
	export let from = 'from-transparent';
	export let via = 'via-stone-200';
	export let to = 'to-transparent';
</script>

<div
	class="animate-pulse animate-shimmer bg-gradient-to-r {from} {via} {to} bg-[length:400%_100%] rounded-lg {$$restProps.class}"
/>
