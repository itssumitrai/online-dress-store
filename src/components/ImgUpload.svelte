<script>
	export let image;
	export let index = 0;
	export let title = 'Image';
</script>

<div>
	<label
		><span>{title}:</span><input
			type="file"
			name={`image${index > 0 ? index + 1 : ''}`}
			{index}
		/></label
	>
    {#if image}
        <img src={image['80x112'] || image.orig} alt="" class="imagePreview" />
    {/if}
</div>

<style>
	.imagePreview {
		width: 80px;
	}
</style>
