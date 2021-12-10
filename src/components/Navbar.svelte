<script>
	import { page } from '$app/stores';
	export let isUserLoggedIn = false;
	let navData = [
		{
			url: '/',
			label: 'Home'
		}
	];
	if (isUserLoggedIn) {
		navData = [
			...navData,
			{
				url: '/addProduct',
				label: 'Add Product'
			}
		];
	}
</script>

<nav>
	<ul>
		{#each navData as nav}
			<li class:active={$page.path === nav.url}>
				<a sveltekit:prefetch href={nav.url}>{nav.label}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 2.5rem;
		height: 100%;
	}
	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	nav {
		width: 100%;
	}
	li a {
		color: white;
		text-decoration: none;
	}
	li a:hover,
	li a:focus {
		text-decoration: underline;
	}
</style>
