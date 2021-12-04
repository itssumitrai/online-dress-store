<script>
	import Product from './Product.svelte';
	export let items;
	export let title = '';
	const lazyItems = 4;
</script>

<section>
	{#if title}
		<h2>All Products</h2>
	{/if}
	<ul>
		{#each items as item, index}
			<li>
				<Product {item} lazy={index >= lazyItems} />
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
