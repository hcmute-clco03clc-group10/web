<script lang="ts">
	import Input from '$lib/Input.svelte';
	import SymbolButton from '$lib/SymbolButton.svelte';
	import { fade } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import Spinner from './Spinner.svelte';
	import type { AddForm } from 'src/routes/(side)/(logged)/dashboard/database/store';

	interface Result {
		ok: boolean;
		text: string;
	}

	export let form: AddForm;
	let submitting = false;
	let result: any;

	const submit = (ev: Event) => {
		ev.preventDefault();
		submitting = true;
	};
	$: console.log(form);
</script>

<form action="#" method="post" on:submit={submit}>
	<ul class="flex flex-col gap-y-8">
		<li class="flex flex-col gap-y-2">
			<label for="tableName" class="block text-sm font-medium text-slate-600"> Table name </label>
			<Input
				bind:value={form.tableName}
				id="tableName"
				name="tableName"
				type="text"
				spellcheck="false"
				placeholder="Enter table name..."
				required
				autofocus
			/>
		</li>

		<li class="flex flex-col gap-y-2">
			<label for="partitionKey" class="block text-sm font-medium text-slate-600">
				Partition key
			</label>
			<Input
				bind:value={form.partitionKey}
				id="partitionKey"
				name="partitionKey"
				type="text"
				spellcheck="none"
				placeholder="Enter partition key..."
				required
			/>
		</li>

		<li>
			<fieldset class="flex flex-col items-start sm:flex-row sm:items-center gap-y-4 gap-x-6 pt-2">
				<legend class="text-slate-600 font-medium text-sm">Partition key type</legend>
				<div class="flex items-center gap-x-2">
					<input
						bind:group={form.partitionKeyType}
						type="radio"
						id="pk-typeB"
						name="partitionKeyType"
						value="B"
						class="rounded px-5 py-3 text-base text-slate-600 placeholder-slate-400 transition duration-200 ease-in-out transform border-slate-400 bg-slate-50 focus:outline-none focus:border-transparent focus:ring focus:ring-blue-600/60 checked:text-blue-600"
					/>
					<label for="pk-typeB" class="block text-sm font-medium text-slate-600"> Binary </label>
				</div>
				<div class="flex items-center gap-x-2">
					<input
						bind:group={form.partitionKeyType}
						type="radio"
						id="pk-typeN"
						name="partitionKeyType"
						value="N"
						class="rounded px-5 py-3 text-base text-slate-600 placeholder-slate-400 transition duration-200 ease-in-out transform border-slate-400 bg-slate-50 focus:outline-none focus:border-transparent focus:ring focus:ring-blue-600/60 checked:text-blue-600"
					/>
					<label for="pk-typeN" class="block text-sm font-medium text-slate-600"> Number </label>
				</div>
				<div class="flex items-center gap-x-2">
					<input
						bind:group={form.partitionKeyType}
						type="radio"
						id="pk-typeS"
						name="partitionKeyType"
						value="S"
						class="rounded px-5 py-3 text-base text-slate-600 placeholder-slate-400 transition duration-200 ease-in-out transform border-slate-400 bg-slate-50 focus:outline-none focus:border-transparent focus:ring focus:ring-blue-600/60 checked:text-blue-600"
					/>
					<label for="pk-typeS" class="block text-sm font-medium text-slate-600"> String </label>
				</div>
			</fieldset>
		</li>
		<li class="flex flex-col gap-y-2">
			<label for="sortKey" class="block text-sm font-medium text-slate-600"> Sort key </label>
			<Input
				bind:value={form.sortKey}
				id="sortKey"
				name="sortKey"
				type="text"
				spellcheck="none"
				placeholder="Enter sort key..."
				required
			/>
		</li>
		<li>
			<fieldset class="flex flex-col items-start sm:flex-row sm:items-center gap-y-4 gap-x-6 pt-2">
				<legend class="text-slate-600 font-medium text-sm">Sort key type</legend>
				<div class="flex items-center gap-x-2">
					<input
						bind:group={form.sortKeyType}
						type="radio"
						id="sk-typeB"
						name="sortKeyType"
						value="B"
						class="rounded px-5 py-3 text-base text-slate-600 placeholder-slate-400 transition duration-200 ease-in-out transform border-slate-400 bg-slate-50 focus:outline-none focus:border-transparent focus:ring focus:ring-blue-600/60 checked:text-blue-600"
					/>
					<label for="sk-typeB" class="block text-sm font-medium text-slate-600"> Binary </label>
				</div>
				<div class="flex items-center gap-x-2">
					<input
						bind:group={form.sortKeyType}
						type="radio"
						id="sk-typeN"
						name="sortKeyType"
						value="N"
						class="rounded px-5 py-3 text-base text-slate-600 placeholder-slate-400 transition duration-200 ease-in-out transform border-slate-400 bg-slate-50 focus:outline-none focus:border-transparent focus:ring focus:ring-blue-600/60 checked:text-blue-600"
					/>
					<label for="sk-typeN" class="block text-sm font-medium text-slate-600"> Number </label>
				</div>
				<div class="flex items-center gap-x-2">
					<input
						bind:group={form.sortKeyType}
						type="radio"
						id="sk-typeS"
						name="sortKeyType"
						value="S"
						class="rounded px-5 py-3 text-base text-slate-600 placeholder-slate-400 transition duration-200 ease-in-out transform border-slate-400 bg-slate-50 focus:outline-none focus:border-transparent focus:ring focus:ring-blue-600/60 checked:text-blue-600"
					/>
					<label for="sk-typeS" class="block text-sm font-medium text-slate-600"> String </label>
				</div>
			</fieldset>
		</li>
		<li class="flex flex-col gap-y-2">
			<label for="provisionedReadCapacity" class="block text-sm font-medium text-slate-600">
				Provisioned read capacity
			</label>
			<Input
				bind:value={form.provisionedReadCapacity}
				id="provisionedReadCapacity"
				name="provisionedReadCapacity"
				type="number"
				min="1"
				max="10"
				placeholder="Enter provisioned read capacity..."
				required
			/>
		</li>
		<li class="flex flex-col gap-y-2">
			<label for="provisionedWriteCapacity" class="block text-sm font-medium text-slate-600">
				Provisioned write capacity
			</label>
			<Input
				bind:value={form.provisionedWriteCapacity}
				id="provisionedWriteCapacity"
				name="provisionedWriteCapacity"
				type="number"
				min="1"
				max="10"
				placeholder="Enter provisioned write capacity..."
				required
			/>
		</li>
		<li
			class="flex flex-col flex-wrap gap-y-2 gap-x-2 items-start justify-between sm:flex-row sm:items-center"
		>
			<SymbolButton solid bind:hover={submitting} type="submit" symbol="trending_flat">
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
		</li>
	</ul>
</form>
