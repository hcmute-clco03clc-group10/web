<script lang="ts">
	export let items: ITable[] = [];
</script>

<div class="overflow-hidden overflow-x-auto rounded-lg border border-slate-200">
	<table class="min-w-full divide-y divide-slate-200">
		<thead class="bg-slate-100">
			<tr>
				<th class="bg-slate-100 px-4 py-2 text-left">
					<label class="sr-only" for="SelectAll">Select All</label>

					<input class="h-5 w-5 rounded border-slate-200" type="checkbox" id="SelectAll" />
				</th>
				<th class="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-900"> Name </th>
				<th class="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-900"> ... </th>
				<th class="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-900"> ... </th>
				<th class="whitespace-nowrap px-4 py-2 text-left font-medium text-slate-900"> ... </th>
			</tr>
		</thead>

		<tbody class="divide-y divide-slate-200">
			{#each items as item, i (item)}
				<tr>
					<td class="bg-white px-4 py-2">
						<label class="sr-only" for="Row1">Row {i + 1}</label>

						<input class="h-5 w-5 rounded border-slate-200" type="checkbox" />
					</td>
					<td class="whitespace-nowrap px-4 py-2 font-medium"> {item.name} </td>
					<td class="whitespace-nowrap px-4 py-2 text-slate-700">...</td>
					<td class="whitespace-nowrap px-4 py-2 text-slate-700">...</td>
					<td class="whitespace-nowrap px-4 py-2 text-slate-700">...</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
