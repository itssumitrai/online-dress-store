<script context="module">
	import loadProducts from '../../actions/loadProducts.js';
	export const prerender = false;
	let currentError = null;
	export async function load(context) {
		const { page } = context;
		const { params } = page;
		const [productRes] = await Promise.all([loadProducts(context, { sku: params.sku })]);
		const item = productRes?.items?.[0];
		if (!item) {
			currentError = {
				status: 404,
				error: 'Not found'
			};
			return {
				props: {
					item: {}
				}
			};
		}

		return {
			props: {
				item
			}
		};
	}
</script>

<script>
	// import ColorSelector from '../../components/ColorSelector.svelte';
	import { getStore } from '../../store';
	export let item;
	let selectedImageIndex = 0;
	let isAdminUser = false;
	getStore('auth').subscribe(({ isAdmin }) => {
		isAdminUser = isAdmin;
	});
</script>

<svelte:head>
	<title>Vinaayak Collection - {item.title}</title>
	<meta name="description" content={`view more details for ${item.title} on Vinaayak Collection`} />
</svelte:head>

<section class="productDetails">
	{#if currentError}
		<p>There was something wrong, please try again later. Sorry for the inconvenience.</p>
	{:else}
		<section class="previewImgContainer">
			{#each item.images as image, index}
				<button
					class="imgPreviewBtn"
					class:selected={selectedImageIndex === index}
					on:click={() => (selectedImageIndex = index)}
				>
					<img class="imgPreview" alt={item.title} src={image['80x112']} />
				</button>
			{/each}
		</section>
		<section class="imageShow">
			<img class="mainImage" alt={item.title} src={item.images[selectedImageIndex]['400x560']} />
		</section>
		<section class="imageList">
			{#each item.images as image, index}
				<img class="mainImage" alt={item.title} src={image['400x560']} />
			{/each}
		</section>
		<section class="detailContainer">
			<div class="topSection">
				{#if isAdminUser}
					<a class="editProductLink" href={`/addProduct?sku=${item.sku}`}>Edit Product</a>
				{/if}
				<h3 class="brand">{item.brand}</h3>
				<h1>{item.title}</h1>
			</div>
			<div class="detailSection">
				<div class="price">{item.currency}&nbsp;{item.price}</div>
				<!-- <ColorSelector colors={item.color.split(',')} /> -->
				<div class="sizeSelector">
					<span>Size: {item.size.split(',').join(', ')}</span>
					<!-- <select>
                        {#each item.size.split(',') as size}
                        <option value={size}>{size}</option>
                        {/each}
                    </select> -->
				</div>
				<h2>Product Details</h2>
				<p class="desc">{item.description}</p>
				<dl>
					<dt>Material:</dt>
					<dd>{item.material}</dd>
					{#if item.stitchingType}
						<dt>Stitching type:</dt>
						<dd>{item.stitchingType}</dd>
					{/if}
					{#if item.measurements}
						<dt>Measurements:</dt>
						<dd>{item.measurements}</dd>
					{/if}
				</dl>
			</div>
		</section>
	{/if}
</section>

<style>
	.imgPreview {
		width: 80px;
		min-height: 85px;
		border: 1px solid var(--seperator);
	}
	.editProductLink {
		text-decoration: none;
		background-color: var(--link);
		font-weight: bold;
		color: white;
		padding: 6px 12px;
		border-radius: 6px;
	}
	.editProductLink:hover,
	.editProductLink:focus {
		background-color: var(--link-active);
	}
	.imgPreviewBtn {
		border: 1px solid transparent;
		padding: 0;
		margin: 0;
		cursor: pointer;
	}
	.imgPreviewBtn.selected {
		border: 1px solid var(--link);
	}
	.previewImgContainer {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
	.imageShow {
		width: 400px;
		background-color: lightgray;
	}
	.mainImage {
		width: 100%;
		min-height: 450px;
	}
	.imageList {
		display: none;
		justify-content: flex-start;
		flex-flow: row nowrap;
		scroll-snap-type: x mandatory;
		gap: 5px;
		overflow-x: auto;
	}
	.productDetails {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.brand {
		font-size: 1rem;
		margin-top: 0.8rem;
		margin-bottom: 0.4rem;
	}
	h1 {
		font-size: 1.2rem;
		margin-top: 0;
		margin-bottom: 0.8rem;
	}
	h2 {
		font-size: 1.15rem;
		margin-top: 0.6rem;
		margin-bottom: 0.6rem;
	}
	.sizeSelector {
		margin-top: 1rem;
	}
	.price {
		margin-bottom: 1.2rem;
		font-weight: bold;
		font-size: 1.1rem;
	}
	.detailContainer {
		max-width: calc(100% - 526px);
	}
	dt {
		font-weight: 500;
		font-size: 1rem;
	}
	/* select {
        cursor: pointer;
    } */
	@media (max-width: 450px) {
		.detailContainer {
			max-width: initial;
		}
		.mainImage {
			width: 250px;
			min-height: initial;
		}
		.previewImgContainer,
		.imageShow {
			display: none;
		}
		.imageList {
			display: flex;
			background-color: lightgray;
			min-height: 316px;
		}
	}
</style>
