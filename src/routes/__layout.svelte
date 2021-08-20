<script context="module">
</script>
<script>
	import Header from '../components/Header.svelte';
	import '../app.css';
    import { onMount } from "svelte";
    import { getStore } from '../store';
    onMount(() => {
        firebase.auth().onAuthStateChanged((user) => {
            // custom claims for the user.
            user.getIdTokenResult().then((idTokenResult) => {
                getStore('auth').set({
                    isLoggedIn: user !== null,
                    isAdmin: !!idTokenResult.claims.admin,
                    user
                });
            })
        });
    });
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

	@media (min-width: 480px) {
		footer {
			padding: 0.5rem 0;
		}
	}
</style>
