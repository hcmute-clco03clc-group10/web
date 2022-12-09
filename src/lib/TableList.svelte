<script lang="ts">
	import CheckboxInput from './CheckboxInput.svelte';
	import Input from './Input.svelte';
	import Link from './Link.svelte';

	export let items: ITable[] = [];
	let selecteds: boolean[] = [];

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'ACTIVE': {
				return 'text-green-600';
			}
			case 'DELETING': {
				return 'text-red-600';
			}
			case 'CREATING': {
				return 'text-yellow-600';
			}
			case 'UPDATING': {
				return 'text-blue-600';
			}
			case 'AVAILABLE': {
				return 'text-blue-600';
			}
			default: {
				return 'text-slate-700';
			}
		}
	};
	const getStatusSymbol = (status: string) => {
		switch (status) {
			case 'ACTIVE': {
				return 'check';
			}
			case 'DELETING': {
				return 'clear';
			}
			case 'CREATING': {
				return 'pending';
			}
			case 'UPDATING': {
				return 'schedule';
			}
			case 'AVAILABLE': {
				return 'check';
			}
			default: {
				return 'text-slate-700';
			}
		}
	};
	const getAttributeTypeSymbol = (type: string) => {
		switch (type) {
			case 'B': {
				return '0101';
			}
			case 'N': {
				return '1234';
			}
			case 'S': {
				return 'abcd';
			}
		}
	};
	const toggleSelectAll = (ev: Event) => {
		selecteds = new Array(selecteds.length).fill((ev.target as HTMLInputElement).checked);
	};
</script>

<div class="overflow-hidden overflow-x-auto rounded-lg border table-auto border-slate-300">
	<table class="min-w-full divide-y divide-slate-300">
		<thead class="bg-slate-200">
			<tr>
				<th class="bg-slate-200 px-4 py-2 text-left">
					<label class="sr-only" for="SelectAll">Select All</label>
					<Input
						type="checkbox"
						class="h-5 w-5 checked:text-blue-600"
						on:input={toggleSelectAll}
						checked={selecteds.length && selecteds.every((selected) => selected)}
					/>
				</th>
				<th class="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-900"> Name </th>
				<th class="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-900"> Status </th>
				<th class="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-900">
					Partition Key
				</th>
				<th class="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-900"> Sort Key </th>
				<th class="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-900"> Items </th>
				<th class="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-900"> Size </th>
			</tr>
		</thead>

		<tbody class="divide-y divide-slate-300">
			{#each items as item, i (item)}
				<tr
					class="hover:bg-slate-200 duration-50 ease-in-out transition-colors {selecteds[i]
						? 'bg-slate-200'
						: ''}"
				>
					<td class="px-4 py-2">
						<label class="sr-only" for="Row1">Row {i + 1}</label>
						<CheckboxInput
							bind:checked={selecteds[i]}
							type="checkbox"
							class="h-5 w-5 checked:text-blue-600"
						/>
					</td>
					<td class="whitespace-nowrap px-4 py-2">
						<Link href="/dashboard/database/{item.TableId}">
							<span> {item.TableName} </span>
						</Link>
					</td>
					<td
						class="whitespace-nowrap px-4 py-2 {getStatusColor(item.TableStatus)} font-bold text-sm"
					>
						<span class="material-symbols-rounded align-middle text-base font-bold">
							{getStatusSymbol(item.TableStatus)}
						</span>
						{item.TableStatus}
					</td>
					<td class="whitespace-nowrap px-4 py-2 text-slate-700">
						{item.KeySchema[0].AttributeName}
						<span
							class="text-xs font-medium px-1.5 py-1 rounded-lg bg-slate-300 text-slate-700 border border-slate-400 ml-2"
						>
							{getAttributeTypeSymbol(
								item.AttributeDefinitions.find(
									(v) => v.AttributeName === item.KeySchema[0].AttributeName
								).AttributeType
							)}
						</span>
					</td>
					<td class="whitespace-nowrap px-4 py-2 text-slate-700">
						{#if item.KeySchema.length === 2}
							{item.KeySchema[1].AttributeName}
						{/if}
						<span
							class="text-xs font-medium px-1.5 py-1 rounded-lg bg-slate-300 text-slate-700 border border-slate-400 ml-2"
						>
							{getAttributeTypeSymbol(
								item.AttributeDefinitions.find(
									(v) => v.AttributeName === item.KeySchema[0].AttributeName
								).AttributeType
							)}
						</span>
					</td>
					<td class="whitespace-nowrap px-4 py-2 text-slate-700"> {item.ItemCount} </td>
					<td class="whitespace-nowrap px-4 py-2 text-slate-700"> {item.TableSizeBytes} bytes </td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
