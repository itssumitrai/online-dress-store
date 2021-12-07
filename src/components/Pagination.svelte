<script>
	export let meta = {};
	const { count, offset, pageSize } = meta;
</script>

<section>
	{#if pageSize > 1}
		<ul>
			<li>
				<a class={`item ${offset === 0 ? 'disabled' : ''}`} href={`?c=${count}&o=0`}>1</a>
			</li>
			<li>
				<a class={`item ${offset <= 0 ? 'disabled' : ''}`} href={`?c=${count}&o=${offset - 1}`}
					>Prev</a
				>
			</li>
			<li class="item label">{offset + 1}</li>
			<li>
				<a
					class={`item ${offset + 1 >= pageSize - 1 ? 'disabled' : ''}`}
					href={`?c=${count}&o=${offset + 1}`}>Next</a
				>
			</li>
			<li>
				<a
					class={`item ${offset === pageSize - 1 ? 'disabled' : ''}`}
					href={`?c=${count}&o=${pageSize}`}>Last</a
				>
			</li>
		</ul>
	{/if}
</section>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		max-width: 300px;
		margin: auto;
	}
	.item {
		padding: 0.5rem;
		display: inline-block;
	}
	a.item.disabled {
		color: var(--text3);
		pointer-events: none;
		background-color: var(--surface4);
		cursor: not-allowed;
	}
	.label {
		font-weight: bold;
		font-size: 1rem;
		background-color: var(--link);
		color: white;
	}
	a {
		color: var(--link);
		text-decoration: none;
		border: 1px solid var(--seperator);
		border-radius: 0.8rem;
		min-width: 30px;
		text-align: center;
	}
	a:hover,
	a:focus {
		background-color: var(--link);
		color: var(--surface1);
	}
</style>
