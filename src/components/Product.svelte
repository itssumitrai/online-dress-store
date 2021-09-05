<script>
	export let item;
</script>

<section>
	<div class="imgContainer">
		<img class="mainImage" alt={item.title} src={item.images[0]} loading="lazy" />
	</div>
	<div class="productDetail">
		<h5>{item.brand}</h5>
		<h3>{item.title}</h3>
		<p class="desc">{item.description}</p>
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
		min-width: 250px;
		min-height: 350px;
	}
	.productLink:hover,
	.productLink:focus-visible {
		border: 1px solid var(--link-active);
	}
	.desc {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	h5 {
		margin: 0;
		margin-bottom: 0.5rem;
	}
	h3 {
		margin-top: 0;
		margin-bottom: 1rem;
	}
</style>
