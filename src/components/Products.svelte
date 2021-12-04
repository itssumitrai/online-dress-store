<script>
	import Product from './Product.svelte';
    import Pagination from './Pagination.svelte';
	export let items;
    export let meta;
	export let title = '';
	const lazyItems = 4;
</script>

<section>
	{#if title}
		<h2>{title}</h2>
	{/if}
	<ul>
		{#each items as item, index}
			<li>
				<Product {item} lazy={index >= lazyItems} />
			</li>
		{/each}
	</ul>
    {#if meta}
        <Pagination meta={meta}/>
    {/if}
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
