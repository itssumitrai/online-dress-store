<script context="module">
	import loadProducts from '../actions/loadProducts';
	export const prerender = false;
	export async function load(context) {
		const [allRes] = await Promise.allSettled([loadProducts(context, {})]);

		return {
			props: {
				allItems: allRes.status === 'fulfilled' ? allRes.value : []
			}
		};
	}
</script>

<script>
	import AllProducts from '../components/Products.svelte';
	export let allItems;
</script>

<svelte:head>
	<title>Vinaayak Collection - Shop latest trends in women's ethnic clothing</title>
    <meta name="description" content="shop latest indian womens clothing comprising of latest & modern designs, and with handcrafted details on high quality material" />
</svelte:head>

<section>
	<h1>All Products</h1>
	<AllProducts items={allItems} />
</section>

<style>
</style>
