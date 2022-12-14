<script lang="ts">
	import Input from '$lib/Input.svelte';
	import SymbolButton from '$lib/SymbolButton.svelte';
	import { fade, fly } from 'svelte/transition';
	import { quadIn, quadInOut, quadOut } from 'svelte/easing';
	import Spinner from './Spinner.svelte';
	import { api } from './api';
	import Button from './Button.svelte';
	import { flip } from 'svelte/animate';
	import { invalidate } from '$app/navigation';

	interface Result {
		ok: boolean;
		text: string;
	}

	type Attribute = ITable['AttributeDefinitions'][0] & { AttributeValue: string };

	export let table: ITable;
	let draftAttributes: Attribute[] = [];
	let submitting = false;
	let result: Result;
	const keyAttributes = table.AttributeDefinitions.filter((attr) =>
		table.KeySchema.find((key) => key.AttributeName === attr.AttributeName)
	);

	async function submit(this: HTMLFormElement, ev: Event) {
		ev.preventDefault();
		const data = new FormData(this);
		const obj: { [key: string]: { [key: string]: any } } = {};
		for (const attr of table.AttributeDefinitions) {
			if (!attr.AttributeName || data.get(attr.AttributeName)!.toString().length === 0) {
				continue;
			}
			obj[attr.AttributeName] = { [attr.AttributeType]: data.get(attr.AttributeName) };
		}
		const newIndexes: number[] = [];
		draftAttributes.forEach((attr, k) => {
			if (!attr.AttributeName || !attr.AttributeValue) {
				return;
			}
			obj[attr.AttributeName] = { [attr.AttributeType]: attr.AttributeValue };
			newIndexes.push(k);
		});
		submitting = true;
		const response = await api
			.use(fetch)
			.post(`/table/${table.TableName}/item`, {
				body: JSON.stringify(obj),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.finally(() => {
				submitting = false;
				for (const index of newIndexes) {
					table.AttributeDefinitions.push({
						AttributeName: draftAttributes[index].AttributeName,
						AttributeType: draftAttributes[index].AttributeType
					});
				}
				table.AttributeDefinitions = table.AttributeDefinitions;
				draftAttributes = draftAttributes.filter((_, index) => !newIndexes.includes(index));
			});
		result = {
			ok: response.status === 201,
			text: await response.text()
		};
	}

	const addAttribute = () => {
		draftAttributes.push({
			AttributeName: '',
			AttributeType: 'S',
			AttributeValue: ''
		});
		draftAttributes = draftAttributes;
	};

	const removeAttribute = (attribute: Attribute) => {
		const index = draftAttributes.indexOf(attribute);
		draftAttributes.splice(index, 1);
		draftAttributes = draftAttributes;
	};

	const removeUnusedAttributes = () => {
		draftAttributes = draftAttributes.filter((v) => v.AttributeName);
	};
</script>

<form action="#" method="post" on:submit={submit} class="flex flex-col gap-y-2 items-start">
	<nav>
		<ul class="flex gap-x-2 p-1 border rounded-lg w-fit drop-shadow-sm">
			<li>
				<Button type="button" on:click={addAttribute} noPadding class="px-1 py-1 rounded-lg">
					<span
						class="material-symbols-rounded align-middle transition-transform duration-300 group-hover:duration-200 ease-in-out rotate-0 group-hover:rotate-180"
						>add</span
					>
				</Button>
			</li>
			<li>
				<Button
					type="button"
					on:click={removeUnusedAttributes}
					disabled={!draftAttributes.some((v) => !v.AttributeName)}
					noPadding
					class="px-1 py-1 rounded-lg"
				>
					<span
						class="material-symbols-rounded align-middle transition-transform duration-300 group-hover:duration-200 ease-in-out rotate-0 group-hover:rotate-180"
						>auto_delete</span
					>
				</Button>
			</li>
		</ul>
	</nav>
	<div class="w-fit rounded-lg overflow-hidden border">
		<table class="text-left bg-slate-100">
			<tbody>
				{#each keyAttributes as { AttributeName, AttributeType }}
					<tr class="w-fit">
						<th scope="row" class="whitespace-nowrap w-0 px-4 py-2 divide-y divide-slate-300">
							<label for={AttributeName} class="block text-blue-600 font-bold">
								{AttributeName}
								<span class="bg-blue-600 text-slate-50 rounded-sm px-1 text-sm"
									>{AttributeType}</span
								>
							</label>
						</th>
						<td class="px-4 py-2">
							<Input
								name={AttributeName}
								type="text"
								spellcheck="false"
								required
								class="w-auto py-1 px-2"
							/>
						</td>
						<td colspan="2" /></tr
					>
				{/each}
				{#each table.AttributeDefinitions.slice(table.KeySchema.length) as { AttributeName, AttributeType }}
					<tr
						in:fly={{ x: -10, duration: 150, easing: quadOut }}
						out:fly={{ x: -10, duration: 70, easing: quadIn }}
						class="w-fit"
					>
						<th scope="row" class="whitespace-nowrap w-0 px-4 py-2 divide-y divide-slate-300">
							<label for={AttributeName} class="block font-medium text-slate-600">
								{AttributeName}
								<span class="bg-slate-500 text-slate-50 rounded-sm px-1 text-sm">
									{AttributeType}
								</span>
							</label>
						</th>
						<td class="px-4 py-2">
							<Input name={AttributeName} type="text" spellcheck="false" class="w-auto py-1 px-2" />
						</td>
						<td colspan="2" /></tr
					>
				{/each}
				{#each draftAttributes as attr (attr)}
					<tr
						in:fly={{ x: -10, duration: 150, easing: quadOut }}
						out:fly={{ x: -10, duration: 70, easing: quadIn }}
						animate:flip={{ delay: 50, duration: 200, easing: quadOut }}
					>
						<th scope="row" class="px-4 py-2 divide-y divide-slate-300">
							<Input
								bind:value={attr.AttributeName}
								type="text"
								spellcheck="false"
								class="w-auto max-w-[7em] py-1 px-2 font-medium"
							/>
						</th>
						<td class="px-4 py-2">
							<Input
								bind:value={attr.AttributeValue}
								type="text"
								spellcheck="false"
								class="w-auto py-1 px-2"
							/>
						</td>
						<td class="px-4 py-2">
							<select
								bind:value={attr.AttributeType}
								class="rounded pr-9 py-1 bg-slate-50 border border-slate-400 text-slate-600 transition focus:border-transparent focus:ring focus:ring-blue-600/60 w-auto"
							>
								<option value="S">String</option>
								<option value="N">Number</option>
								<option value="BOOL">Boolean</option>
								<option value="B">Binary</option>
								<option value="NULL">Null</option>
								<option value="SS">String set</option>
								<option value="NS">Number set</option>
								<option value="BS">Binary set</option>
								<option value="L">List</option>
								<option value="M">Map</option>
							</select>
						</td>
						<td class="px-4 py-2">
							<Button
								type="button"
								class="px-0.5 py-1 bg-red-600 border-red-700 focus:ring-red-600/60"
								solid
								on:click={() => {
									removeAttribute(attr);
								}}
							>
								<span class="material-symbols-rounded align-middle font-light">delete</span>
							</Button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<SymbolButton solid bind:hover={submitting} type="submit">
		<div slot="symbol">
			{#if submitting}
				<div in:fade={{ duration: 150, easing: quadInOut }}>
					<Spinner class="h-5 w-5 text-slate-50" />
				</div>
			{:else}
				<span
					in:fade={{ duration: 150, easing: quadInOut }}
					class="material-symbols-rounded align-middle">trending_flat</span
				>
			{/if}
		</div>
		<span slot="text"> Create </span>
	</SymbolButton>
	{#if result}
		<p class={`break-all ${result.ok ? 'text-green-600' : 'text-red-600'}`}>
			{result.text}
		</p>
	{/if}
</form>
