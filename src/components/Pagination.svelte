<script>
	export let meta = {};
</script>

<section>
	<ul>
		<li>
			<a class="item" href={`?c=${meta.count}&o=0`}>1</a>
		</li>
		<li>
			<a class="item" href={`?c=${meta.count}&o=${meta.offset - meta.count}`}>Prev</a>
		</li>
		<li class="item label">{(meta.count > 0 ? Math.ceil(meta.offset / meta.count) : 0) + 1}</li>
		<li>
			<a class="item" href={`?c=${meta.count}&o=${meta.offset + meta.count}`}>Next</a>
		</li>
		<li>
			<a class="item" href={`?c=${meta.count}&o=${meta.pageSize * meta.count}`}>Last</a>
		</li>
	</ul>
</section>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: center;
		gap: 2rem;
	}
	.item {
		padding: 0.5rem;
		display: inline-block;
	}
	.label {
		font-weight: bold;
		font-size: 1rem;
	}
	a {
		color: var(--link);
		text-decoration: none;
		border: 1px solid var(--seperator);
		border-radius: 0.5rem;
		min-width: 30px;
		text-align: center;
	}
	a:hover,
	a:focus {
		background-color: var(--link);
		color: var(--surface1);
	}
</style>
