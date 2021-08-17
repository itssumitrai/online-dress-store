<script>
    export let item;
</script>
<section>
    <img class="mainImage" alt={item.title} src={item.image} loading="lazy" />
    <div class="productDetail">
        <h3>{item.title}</h3>
        <p class="desc">{item.description}</p>
        <p class="price">{item.currency}&nbsp;{item.price}</p>
    </div>
    <!-- svelte-ignore a11y-missing-content -->
    <a class="productLink" href={`/products/${item.sku}`} alt={item.title}/>
</section>
<style>
    .mainImage {
        width: 100%;
        min-width: 250px;
        min-height: 300px;
    }
    section {
        position: relative;
        z-index: 1;
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
</style>
