<script>
	export let image;
	export let index = 0;
	export let title = 'Image';
	let isLoading = image ? false : false;
	function onChange() {
		isLoading = true;
	}
</script>

<div>
	<label
		><span class="title">{title}:</span><input
			type="file"
			name={`image${index > 0 ? index + 1 : ''}`}
			on:change={onChange}
			{index}
		/></label
	>
	<div class="imgPlaceholder">
		{#if image}
			<img src={image['80x112'] || image.orig} alt="" class="imagePreview" />
		{:else if isLoading}
			<img src="/spinner.svg" alt="" class="spinnerImg" />
		{/if}
	</div>
</div>

<style>
	.imagePreview {
		width: 80px;
	}
	.imgPlaceholder {
		width: 80px;
		height: 112px;
		background-color: lightgray;
	}
	.spinnerImg {
		width: 30px;
	}
	.title {
		margin-right: 1rem;
	}
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}
</style>
