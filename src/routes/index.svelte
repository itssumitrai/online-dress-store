<script context="module">
	import loadProducts from '../actions/loadProducts.js';
	export const prerender = false;
	export async function load(context) {
		const [allProducts] = await Promise.all([loadProducts(context, {})]);
        const { meta, items } = allProducts;

		return {
			props: {
                meta,
				items
			}
		};
	}
</script>

<script>
	import Products from '../components/Products.svelte';
	export let items;
    export let meta;
</script>

<svelte:head>
	<title>Vinaayak Collection - Shop latest trends in women's ethnic clothing</title>
	<meta
		name="description"
		content="shop latest indian womens clothing comprising of latest & modern designs, and with handcrafted details on high quality material"
	/>
</svelte:head>

<section>
	<h1>All Products</h1>
	<Products items={items} meta={meta} />
</section>

<style>
</style>
