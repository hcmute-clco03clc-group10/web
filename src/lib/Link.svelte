<script lang="ts">
	export let href: string;
</script>

<a
	{href}
	{...$$restProps}
	class="relative font-medium text-blue-600 after:absolute after:bg-blue-600 after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 {$$restProps.class}"
>
	<slot />
</a>
