<script lang="ts">
	import { endpoint } from '$lib/api';
	import Input from '$lib/Input.svelte';
	import SymbolButton from '$lib/SymbolButton.svelte';
	import Spinner from '$lib/Spinner.svelte';
	import { fade } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	import Link from '$lib/Link.svelte';

	interface FormResult {
		ok: boolean;
		text: string;
	}

	let password = '';
	let email = '';
	let submitting = false;
	let result: FormResult | undefined = undefined;

	async function submit(this: HTMLFormElement, ev: SubmitEvent) {
		ev.preventDefault();
		if (submitting) {
			return;
		}
		const r = validate();
		if (r) {
			result = r;
			return;
		}
		submitting = true;
		const response = await fetch(endpoint('/login'), {
			method: 'post',
			body: JSON.stringify({
				email,
				password
			})
		}).finally(() => {
			submitting = false;
		});
		result = {
			ok: response.status === 200,
			text: await response.text()
		};
	}

	function validate(): FormResult | undefined {
		const emailRgx =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailRgx.test(email)) {
			return {
				ok: false,
				text: 'Please enter a valid email.'
			};
		}
		password = password.trim();
		if (!password.length) {
			return {
				ok: false,
				text: 'Please enter a password.'
			};
		}
	}
</script>

<section class="items-center px-5 ml-24">
	<div
		class="flex flex-col w-full max-w-md p-10 mx-auto transition duration-500 ease-in-out transform bg-slate-50 border rounded-lg md:mt-0"
	>
		<div>
			<h2 class="text-3xl font-extrabold text-slate-600">Log in.</h2>
		</div>
		<div class="mt-4">
			<div class="mt-6">
				<form action="#" method="POST" class="flex flex-col gap-y-8" on:submit={submit}>
					<div class="flex flex-col gap-y-2">
						<label for="email" class="block text-sm font-medium text-slate-600">
							Email address
						</label>
						<Input
							bind:value={email}
							id="email"
							name="email"
							type="email"
							spellcheck="false"
							placeholder="Your Email"
							required
							autofocus
						/>
					</div>

					<div class="flex flex-col gap-y-2">
						<label for="password" class="block text-sm font-medium text-slate-600">
							Password
						</label>
						<Input
							bind:value={password}
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							placeholder="Your Password"
							required
						/>
					</div>

					<div
						class="flex flex-col gap-y-2 gap-x-2 items-start justify-between sm:flex-row sm:items-center"
					>
						<div class="flex items-center">
							<Input
								type="checkbox"
								id="remember"
								name="remember"
								placeholder="Your Password"
								class="checked:text-blue-600"
							/>
							<label for="remember" class="block ml-2 text-sm text-slate-600"> Remember me </label>
						</div>

						<div class="text-sm">
							<Link href="#">
								Forgot your password?
							</Link>
						</div>
					</div>

					<div
						class="flex flex-col flex-wrap gap-y-2 gap-x-2 items-start justify-between sm:flex-row sm:items-center"
					>
						<SymbolButton solid bind:hover={submitting} type="submit" symbol="trending_flat">
							<div slot="symbol">
								{#if submitting}
									<div in:fade={{ duration: 150, easing: quadInOut }}>
										<Spinner class="h-5 w-5" />
									</div>
								{:else}
									<span
										in:fade={{ duration: 150, easing: quadInOut }}
										class="material-symbols-rounded align-middle">trending_flat</span
									>
								{/if}
							</div>
							<span slot="text"> Login </span>
						</SymbolButton>
						{#if result}
							<p class={`break-all ${result.ok ? 'text-green-600' : 'text-red-600'}`}>
								{result.text}
							</p>
						{/if}
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
