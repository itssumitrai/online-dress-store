<script context="module">
    import loadProducts from '../../actions/loadProducts';
	export const prerender = false;
    let currentError = null;
    export async function load(context) {
        const { page } = context;
        const { params } = page;
        const [productRes] = await Promise.allSettled([
            loadProducts(context, { sku: params.sku })
        ]);
        const item = productRes.status === 'fulfilled' ? productRes.value[0] : null;
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
    export let item;
    let selectedImageIndex = 0;
</script>

<svelte:head>
	<title>Online Dress Store - {item.title}</title>
</svelte:head>

<section class="productDetails">
    {#if currentError}
        <p>There was something wrong, please try again later. Sorry for the inconvenience.</p>
    {:else}
        <section class="previewImgContainer">
            {#each item.images as image, index}
                <button class="imgPreviewBtn" class:selected={selectedImageIndex === index} on:click="{() => selectedImageIndex = index}">
                    <img class="imgPreview" alt={item.title} src={image} />
                </button>
            {/each}
        </section>
        <section>
            <img class="mainImage" alt={item.title} src={item.images[selectedImageIndex]} />
        </section>
        <section>
            <h3 class="brand">{item.brand}</h3>
            <h1>{item.title}</h1>
            <div class="price">{item.currency}&nbsp;{item.price}</div>
            <!-- <ColorSelector colors={item.color.split(',')} /> -->
            <div class="sizeSelector">
                <span>Size: {item.size.split(',').map((sz) => `${sz} `).join(',')}</span>
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
                <dt>Stitching type:</dt>
                <dd>Semi-Stiched</dd>
                {#if item.measurements}
                    <dt>Measurements:</dt>
                    <dd>{item.measurements}</dd>
                {/if}
            </dl>
        </section>
    {/if}
</section>
<style>
    .imgPreview {
        width: 80px;
        min-height: 85px;
        border: 1px solid var(--seperator);
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
    .mainImage {
        max-width: 400px;
        min-width: 400px;
        min-height: 450px;
    }
    .productDetails {
        display: flex;
        flex-wrap: nowrap;
        gap: 1rem;
    }
    .brand {
        font-size: 1.1rem;
    }
    h1 {
        font-size: 1.3rem;
    }
    h2 {
        font-size: 1.15rem;
    }
    .sizeSelector {
        margin-top: 1rem;
    }
    .price {
        margin-bottom: 1.2rem;
        font-weight: bold;
        font-size: 1.1rem;
    }
    dt {
        font-weight: 500;
        font-size: 1rem;
    }
    select {
        cursor: pointer;
    }
</style>
