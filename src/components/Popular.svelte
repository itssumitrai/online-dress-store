<script>
	export let items;
</script>

<section>
	<h2>Popular right now</h2>
	<ul>
		{#each items as item}
			<li>
				<img
					alt={item.title}
					src={item.images['1x']}
					srcset={`${item.images['1x']} 1x, ${item.images['2x']} 2x`}
					loading="lazy"
				/>
				<h5>{item.title}</h5>
				<p class="desc">{item.description}</p>
				<p class="price">{item.price}</p>
			</li>
		{/each}
	</ul>
</section>
