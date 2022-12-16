<script lang="ts">
	import CheckboxInput from '$lib/CheckboxInput.svelte';
	import Input from '$lib/Input.svelte';

	export let items: { [key: string]: { [key: string]: any } }[] = [];
	export let selecteds: boolean[] = [];
	export let table: ITable;
	let attributeDefinitions: ITable['AttributeDefinitions'];
	$: {
		const set = new Set<string>(table.AttributeDefinitions.map((v) => v.AttributeName));
		attributeDefinitions = table.AttributeDefinitions;

		for (const item of items) {
			for (const key of Object.keys(item)) {
				if (set.has(key)) {
					continue;
				}
				set.add(key);
				attributeDefinitions.push({
					AttributeName: key,
					AttributeType: Object.keys(item[key])[0]
				});
			}
		}
	}
	const toggleSelectAll = (ev: Event) => {
		selecteds = new Array(selecteds.length).fill((ev.target as HTMLInputElement).checked);
	};
</script>

<div class="overflow-hidden overflow-x-auto rounded-lg border border-slate-300">
	<table class="divide-y divide-slate-300 table-auto min-w-full overflow-x-auto">
		<thead class="bg-slate-200">
			<tr>
				<th class="bg-slate-200 px-4 py-2 text-left">
					<label class="sr-only" for="SelectAll">Select All</label>
					<Input
						type="checkbox"
						class="px-0 py-0 lg:px-3 lg:py-2 xl:px-5 xl:py-3 checked:text-blue-600"
						on:input={toggleSelectAll}
						checked={selecteds.length && selecteds.every((selected) => selected)}
					/>
				</th>
				{#each attributeDefinitions as { AttributeName, AttributeType }}
					<th class="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-900">
						{AttributeName}
						<span class="bg-slate-500 text-slate-50 rounded-sm px-1 text-sm">{AttributeType}</span>
					</th>
				{/each}
			</tr>
		</thead>

		<tbody class="divide-y divide-slate-300">
			{#each items as item, i (item)}
				<tr
					class="hover:bg-slate-200 duration-[50ms] ease-in-out transition-colors {selecteds[i]
						? 'bg-slate-200'
						: ''}"
				>
					<td class="px-4 py-2">
						<label class="sr-only" for="Row1">Row {i + 1}</label>
						<CheckboxInput
							bind:checked={selecteds[i]}
							type="checkbox"
							class="px-0 py-0 lg:px-3 lg:py-2 xl:px-5 xl:py-3 checked:text-blue-600"
						/>
					</td>
					{#each attributeDefinitions as { AttributeName, AttributeType }}
						<td class="whitespace-nowrap px-4 py-2">
							{#if item[AttributeName]}
								{item[AttributeName][AttributeType]}
							{:else}
								<span class="sr-only">Undefined</span>
								<div class="w-full bg-slate-500 max-w-[1em] h-1.5" />
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
