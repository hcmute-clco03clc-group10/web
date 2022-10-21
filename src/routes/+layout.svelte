<script lang="ts">
	import '../app.css';
</script>

<div class="bg-slate-50 max-w-screen min-h-screen py-4 px-2 flex flex-col justify-start gap-y-10">
	<header class="mx-auto w-full lg:w-2/3 xl:w-1/2 2xl:w-2/5">
		<ul class="flex flex-row justify-between place-items-center">
			<li>
				<a href="/">
					<h1 class="text-xl sm:text-4xl font-bold leading-relaxed">Online DynamoDB</h1>
				</a>
			</li>
			<li>
				<ul class="flex flex-row justify-end gap-3">
					<li>
						<a href="https://github.com/hcmute-clco03clc-group11">Login</a>
					</li>
					<li>
						<a href="https://github.com/hcmute-clco03clc-group11">Register</a>
					</li>
				</ul>
			</li>
		</ul>
	</header>
	<main class="my-0 mx-auto min-h-1/2 lg:w-2/3 xl:w-1/2 2xl:w-2/5">
		<slot />
	</main>
	<footer class="p-0 my-0 mt-auto mx-auto lg:w-2/3 xl:w-1/2 2xl:w-2/5">
		<ul class="flex flex-row justify-start gap-3">
			<li>
				<a href="/about">About</a>
			</li>
		</ul>
	</footer>
</div>
