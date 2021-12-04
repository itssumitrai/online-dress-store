<script context="module">
    /* global firebase */
	import { getStore } from '../store.js';
	let idToken = '';
	let hasError = false;
	getStore('auth').subscribe(async ({ user }) => {
		try {
			idToken = await user.getIdTokenResult();
		} catch (ex) {
			hasError = true;
		}
	});
	async function onSubmit(e) {
		e.preventDefault();
		try {
			if (!idToken) {
				throw new Error('user not signed in');
			}
			const resp = await fetch(`/xhr/moderator?token=${idToken}`, {
				method: 'POST',
				body: new URLSearchParams(new FormData(e.currentTarget))
			});
			if (!resp.ok) {
				throw new Error('Error happened');
			}
			// Force token refresh. The token claims will contain the additional claims.
			firebase.auth().currentUser.getIdToken(true);
		} catch (ex) {
			hasError = true;
		}
	}
</script>

<svelte:head>
	<title>Vinaayak Collection - Add Moderator</title>
	<meta name="robots" content="noindex" />
</svelte:head>
<section>
	<h1>Add Moderator</h1>
	<form action={`/xhr/moderator?token=${idToken}`} method="POST" on:submit={onSubmit}>
		<label><span>Email:</span><input name="email" type="text" /></label>
		<button type="submit">Add Moderator</button>
	</form>
	{#if hasError}
		<p class="error">Only authorized moderators can add a moderator email.</p>
	{/if}
</section>

<style>
	.error {
		font-size: 1.2rem;
		color: var(--negative);
	}
</style>
