<script>
	import ImgUpload from './ImgUpload.svelte';
	export let images = [];
	export let additionalImages = images.length === 0 ? [] : [];
	export const onChange = Function.prototype;
	images.forEach((image, index) => {
		if (index > 0) {
			additionalImages.push(true);
		}
	});
	function addMoreImage() {
		additionalImages = [...additionalImages, true];
	}
</script>

<ImgUpload index={0} image={images[0]} />
{#each additionalImages as img, i}
	<ImgUpload index={i + 1} image={images[i + 1]} />
{/each}
<button type="button" on:click={addMoreImage}>Add another image</button>

<style>
	button {
		margin: 0.8rem auto;
		background-color: var(--link);
		color: white;
		padding: 6px 10px;
		border: 0;
		border-radius: 4px;
	}
</style>
