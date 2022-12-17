<script lang="ts">
	import Input from '$lib/Input.svelte';
	import SymbolButton from '$lib/SymbolButton.svelte';
	import { fade, fly } from 'svelte/transition';
	import { quadInOut, sineInOut, sineOut } from 'svelte/easing';
	import Spinner from '$lib/Spinner.svelte';
	import { api } from '$lib/api';
	import Button from '$lib/Button.svelte';
	import { flip } from 'svelte/animate';
	import Badge from '$lib/Badge.svelte';
	import { goto } from '$app/navigation';

	type Attribute = ITable['AttributeDefinitions'][0] & {
		AttributeValue: string;
		Removing?: boolean;
	};

	export let table: ITable;
	export let item: { [key: string]: { [key: string]: any } };

	let attributes: Attribute[] = table.KeySchema.map(
		(k) => table.AttributeDefinitions.find((attr) => attr.AttributeName === k.AttributeName)!
	)
		.map((attr) => ({
			...attr,
			AttributeValue: item[attr.AttributeName][attr.AttributeType]
		}))
		.concat(
			Object.entries(item)
				.filter(([k]) => !table.AttributeDefinitions.find((attr) => attr.AttributeName === k))
				.map(([k, v]) => {
					const type = Object.keys(v)[0];
					return {
						AttributeName: k,
						AttributeType: type,
						AttributeValue: item[k][type]
					};
				})
		);
	let draftAttributes: Attribute[] = [];
	let submitting = false;
	let message = { color: '', text: '' };

	async function submit(this: HTMLFormElement, ev: Event) {
		ev.preventDefault();
		submitting = true;
		const data: { [key: string]: { [key: string]: any } } = {};
		const pk = attributes.find((attr) => attr.AttributeName === table.KeySchema[0].AttributeName)!;
		const sk =
			table.KeySchema.length === 2
				? attributes.find((attr) => attr.AttributeName === table.KeySchema[1].AttributeName)!
				: undefined;
		let shouldDelete = pk.AttributeValue !== item[pk.AttributeName][pk.AttributeType];
		if (sk) {
			shouldDelete ||= sk.AttributeValue !== item[sk.AttributeName][sk.AttributeType];
		}
		for (const attr of attributes) {
			if (attr.Removing) {
				continue;
			} else {
				data[attr.AttributeName] = { [attr.AttributeType]: attr.AttributeValue };
			}
		}
		for (const attr of draftAttributes) {
			if (!attr.AttributeName || !attr.AttributeValue) {
				continue;
			}
			data[attr.AttributeName] = { [attr.AttributeType]: attr.AttributeValue };
		}
		if (shouldDelete) {
			const deleteData = {
				[pk.AttributeName]: item[pk.AttributeName]
			};
			if (sk) {
				deleteData[sk.AttributeName] = item[sk.AttributeName];
			}
			const results = await Promise.all([
				api.use(fetch).post(`/table/${table.TableName}/item/delete`, {
					body: JSON.stringify([deleteData])
				}),
				api.use(fetch).post(`/table/${table.TableName}/item`, {
					body: JSON.stringify(data)
				})
			]);

			if (results[1].status === 200) {
				message.color = 'text-green-600';
				message.text = 'Cập nhật item thành công.';
				await goto(`/dashboard/table/${table.TableName}`);
			} else {
				message.color = 'text-red-600';
				message.text = await results[1].text();
				submitting = false;
			}
			return;
		}

		const result = await api.use(fetch).put(`/table/${table.TableName}/item`, {
			body: JSON.stringify(data)
		});
		if (result.status === 200) {
			message.color = 'text-green-600';
			message.text = 'Cập nhật item thành công.';
			await goto(`/dashboard/table/${table.TableName}`);
		} else {
			message.color = 'text-red-600';
			message.text = await result.text();
			submitting = false;
		}
	}

	const addAttribute = () => {
		draftAttributes.push({
			AttributeName: '',
			AttributeType: 'S',
			AttributeValue: ''
		});
		draftAttributes = draftAttributes;
	};

	const removeDraftAttribute = (attribute: Attribute) => {
		const index = draftAttributes.indexOf(attribute);
		draftAttributes.splice(index, 1);
		draftAttributes = draftAttributes;
	};

	const removeUnusedAttributes = () => {
		draftAttributes = draftAttributes.filter((v) => v.AttributeName);
	};

	const removeAttribute = (attribute: Attribute) => {
		if (attribute.Removing) {
			delete attribute.Removing;
		} else {
			attribute.Removing = true;
		}
		attributes = attributes;
	};
</script>

<form action="#" method="post" on:submit={submit} class="flex flex-col gap-y-2 items-start">
	<nav>
		<ul class="flex gap-x-2 p-1 border rounded-lg w-fit drop-shadow-sm bg-slate-100">
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
	<div class="w-fit rounded-lg overflow-hidden border bg-slate-100 py-2 drop-shadow-sm">
		<table class="text-left">
			<tbody>
				{#each attributes.slice(0, table.KeySchema.length) as { AttributeName, AttributeType, AttributeValue }}
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
								bind:value={AttributeValue}
								type="text"
								spellcheck="false"
								required
								class="w-auto py-1 px-2"
							/>
						</td>
						<td colspan="2" /></tr
					>
				{/each}
				{#each attributes.slice(table.KeySchema.length) as attr}
					<tr
						in:fly|local={{ x: -10, duration: 150, easing: sineOut }}
						out:fly|local={{ x: -10, duration: 70, easing: sineInOut }}
						class="w-fit"
						class:bg-slate-200={attr.Removing}
					>
						<th scope="row" class="whitespace-nowrap w-0 px-4 py-2 divide-y divide-slate-300">
							<label for={attr.AttributeName} class="block font-medium text-slate-600">
								{attr.AttributeName}
								<span class="bg-slate-500 text-slate-50 rounded-sm px-1 text-sm">
									{attr.AttributeType}
								</span>
							</label>
						</th>
						<td class="px-4 py-2">
							<Input
								bind:value={attr.AttributeValue}
								type="text"
								spellcheck="false"
								class="w-auto py-1 px-2"
							/>
						</td>
						<td />
						<td class="px-4 py-2">
							<Button
								type="button"
								class="px-0.5 py-1 {attr.Removing
									? 'bg-red-600 border-red-700 focus:ring-red-600/60'
									: 'bg-slate-400 border-slate-500 focus:ring-slate-600/60'}"
								solid
								on:click={() => {
									removeAttribute(attr);
								}}
							>
								<span class="material-symbols-rounded align-middle font-light">clear</span>
							</Button>
						</td>
					</tr>{/each}
				{#each draftAttributes as attr (attr)}
					<tr
						in:fly|local={{ x: -10, duration: 150, easing: sineOut }}
						out:fly|local={{ y: -15, duration: 100, easing: sineInOut }}
						animate:flip={{ delay: 50, duration: 200, easing: sineOut }}
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
								<option value="B" disabled class="disabled:text-slate-300">Binary</option>
								<option value="NULL" disabled class="disabled:text-slate-300">Null</option>
								<option value="SS" disabled class="disabled:text-slate-300">String set</option>
								<option value="NS" disabled class="disabled:text-slate-300">Number set</option>
								<option value="BS" disabled class="disabled:text-slate-300">Binary set</option>
								<option value="L" disabled class="disabled:text-slate-300">List</option>
								<option value="M" disabled class="disabled:text-slate-300">Map</option>
							</select>
						</td>
						<td class="px-4 py-2">
							<Button
								type="button"
								class="px-0.5 py-1 bg-red-600 border-red-700 focus:ring-red-600/60"
								solid
								on:click={() => {
									removeDraftAttribute(attr);
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
	<div class="flex flex-col sm:flex-row sm:items-stretch gap-x-4 gap-y-2">
		<SymbolButton solid bind:hover={submitting} type="submit" disabled={submitting}>
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
			<span slot="text"> Save changes </span>
		</SymbolButton>
		{#if message.text}
			<Badge class={message.color}>
				{message.text}
			</Badge>
		{/if}
	</div>
</form>
