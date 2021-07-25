<script context="module">
    // export async function load({ page, fetch }) {
    //     if (typeof window === 'undefined') {

    //     }
    // }
</script>
<script>
	import Header from '../components/Header.svelte';
	import '../app.css';
</script>

<Header />
<main>
	<slot />
</main>
<footer>
	<p>2021. All rights reserved.</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: var(--max-width);
		margin: 0 auto;
        background-color: var(--surface2);
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0.5rem;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 0.5rem 0;
		}
	}
</style>
