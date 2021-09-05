<script>
	let selectedIndex = 0;
	export let onSelect;
	export let colors = [];
</script>

<section>
	<div>Color:</div>
	{#each colors as color, index}
		<button
			style={`background-color:${color};border-color: ${
				selectedIndex === index ? 'var(--link)' : 'var(--seperator)'
			};`}
			class="colorSwatch"
		/>
	{/each}
</section>

<style>
	.colorSwatch {
		width: 1.5rem;
		height: 1.5rem;
		padding: 2px;
		border: 1px solid var(--seperator);
	}
	section {
		display: flex;
		gap: 0.8rem;
		vertical-align: middle;
	}
</style>
