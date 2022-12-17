<script>
	import { error } from '@sveltejs/kit';

	class PackService {
		constructor(id, name, description, price) {
			this.id = id;
			this.name = name;
			this.description = description;
			this.price = price;
		}
	}
	let idPack = 0;
	let dataPost = { id: idPack, method: 'GET PACK' };
	let servicePacks = [
		new PackService(1, 'FREE', '10 GB', 0),
		new PackService(2, 'STANDARD', '100 GB', 50)
	];

	async function sendRequest(url, idPack) {
		dataPost.id = idPack;
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataPost)
			});
			const result = await response.json();
			alert(result);
		} catch (err) {
			alert(error);
		}
	}
</script>

<div class="pack-title">
	<h1>PRICING</h1>
</div>
<div class="pack">
	{#each servicePacks as { id, name, description, price }}
		<div class="pack-info">
			<div class="pack-name"><h1>{name}</h1></div>
			<div class="pack-content">
				<p>{description}</p>
			</div>
			<div class="pack-price">
				<h3>{price}$</h3>
			</div>
			<div class="pack-btn">
				<button on:click={sendRequest.bind(null, '#', id)}>GET</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.pack-title {
		font-weight: bold;
		text-align: center;
		font-size: 50px;
		margin-bottom: 40px;
	}
	.pack {
		text-align: center;
	}

	.pack-name {
		font-weight: bold;
		text-align: center;
		font-size: 30px;
		margin-top: 20px;
		margin-bottom: 30px;
	}

	.pack-content {
		text-align: center;
		font-size: 20px;
		height: 180px;
	}
	.pack-info {
		display: inline-block;
		width: 300px;
		height: 400px;
		border: 3px solid black;
		border-radius: 15px;
		margin: 20px;
		text-align: center;
		margin-left: 50px;
		margin-right: 50px;
	}
	.pack-btn button {
		color: white;
		font-weight: bold;
		background: #3232f5ee;
		width: 100px;
		padding: 8px;
		text-align: center;
		border-radius: 7px;
	}

	.pack-price {
		font-size: 25px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.pack-btn button:hover,
	.pack-btn button:active {
		color: #3939f7;
		background-color: white;
	}
</style>
