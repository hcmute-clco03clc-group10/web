<script>
	import Input from '$lib/Input.svelte';
</script>

<section class="">
	<div class=" items-center px-5 ml-24">
		<div
			class="flex flex-col w-full max-w-md p-10 mx-auto transition duration-500 ease-in-out transform bg-slate-50 border rounded-lg md:mt-0"
		>
			<div>
				<h2 class="text-3xl font-extrabold text-slate-600">Log in</h2>
			</div>
			<div class="mt-4">
				<div class="mt-6">
					<form action="#" method="POST" class="space-y-6">
						<div class="flex flex-col gap-y-2">
							<label for="email" class="block text-sm font-medium text-slate-600">
								Email address
							</label>
							<Input
								id="email"
								name="email"
								type="email"
								spellcheck="false"
								placeholder="Your Email"
							/>
						</div>

						<div class="flex flex-col gap-y-2">
							<label for="password" class="block text-sm font-medium text-slate-600">
								Password
							</label>
							<Input
								id="password"
								name="password"
								type="password"
								autocomplete="current-password"
								placeholder="Your Password"
							/>
						</div>

						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<Input
									type="checkbox"
									id="remember"
									name="remember"
									placeholder="Your Password"
									class="checked:text-blue-600"
								/>
								<label for="remember" class="block ml-2 text-sm text-slate-600">
									Remember me
								</label>
							</div>

							<div class="text-sm">
								<a href="/" class="font-medium text-blue-600 hover:text-blue-500">
									Forgot your password?
								</a>
							</div>
						</div>

						<div>
							<button
								type="submit"
								class="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>Login</button
							>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>

