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
	<title>Online Dress Store - All Clothing</title>
</svelte:head>

<section>
	<h1>All Clothing</h1>
	<AllProducts items={allItems} />
</section>

<style>
</style>
