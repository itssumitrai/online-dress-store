<script>
	import Product from './Product.svelte';
	export let items;
	export let title = '';
</script>

<section>
	{#if title}
		<h2>All Products</h2>
	{/if}
	<ul>
		{#each items as item}
			<li>
				<Product {item} />
			</li>
		{/each}
	</ul>
</section>

<style>
	ul {
		list-style: none;
		display: flex;
		justify-content: flex-start;
		padding: 0;
		margin: 0;
		flex-wrap: wrap;
	}
</style>
