<script>
	export let item;
	export let lazy = true;
</script>

<section>
	<div class="imgContainer">
		<img
			class="mainImage"
			alt={item.title}
			src={item.images[0]['250x350']}
			loading={lazy ? 'lazy' : 'eager'}
		/>
	</div>
	<div class="productDetail">
		<h4>{item.brand}</h4>
		<h3>{item.title}</h3>
		<p class="price">{item.currency}&nbsp;{item.price}</p>
	</div>
	<!-- svelte-ignore a11y-missing-content -->
	<a class="productLink" href={`/products/${item.sku}`} alt={item.title} />
</section>

<style>
	.mainImage {
		width: 100%;
	}
	section {
		position: relative;
		z-index: 1;
		padding: 0.5rem;
		max-width: 250px;
	}
	.productLink {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 2;
	}
	.productDetail {
		margin-top: 1rem;
	}
	.imgContainer {
		background-color: lightgray;
		min-width: 250px;
		min-height: 300px;
	}
	.productLink:hover,
	.productLink:focus-visible {
		border: 1px solid var(--link-active);
	}
	h4 {
		margin: 0;
		margin-bottom: 0.5rem;
	}
	h3 {
		margin-top: 0;
		margin-bottom: 1rem;
		word-wrap: normal;
	}
	@media (max-width: 450px) {
		section {
			max-width: 140px;
		}
		.imgContainer {
			min-width: 140px;
			min-height: 196px;
		}
		.imgContainer img {
			width: 140px;
			height: 196px;
		}
	}
</style>
