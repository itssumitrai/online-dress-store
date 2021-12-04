<script>
	/* global firebase */
	import Navbar from './Navbar.svelte';
	import { getStore } from '../store';
	import LoginForm from './LoginForm.svelte';

	let isUserLoggedIn = false;
	let showSignInModal = false;
	let profileData = null;
	getStore('auth').subscribe(({ isLoggedIn, user }) => {
		isUserLoggedIn = isLoggedIn;
		profileData = user;
	});
	function showSignIn() {
		showSignInModal = true;
	}
	function onClose() {
		showSignInModal = false;
	}
	async function logout() {
		await firebase.auth().signOut();
	}
</script>

<header>
	<div class="corner">
		<!-- Put Logo here -->
	</div>
	<Navbar {isUserLoggedIn} />
	<div class="profile">
		{#if isUserLoggedIn}
			<div class="user">
				<div>
					{#if profileData.photoURL}
						<!-- svelte-ignore a11y-img-redundant-alt -->
						<img src={profileData.photoURL} alt="profile picture" />
					{/if}
				</div>
				<div>
					<div class="displayName">{profileData.displayName}</div>
					<button class="logBtn" on:click={logout}>Sign out</button>
				</div>
			</div>
		{:else}
			<button class="logBtn" on:click={showSignIn}>Sign in</button>
		{/if}
	</div>
	<div class={`modal ${showSignInModal ? 'show' : ''}`}>
		<div class="modalContainer">
			<LoginForm {onClose} />
		</div>
	</div>
</header>

<style>
	header {
		background-color: var(--nav-light);
		display: flex;
		padding: 0 1rem;
	}
	.profile {
		position: relative;
	}
	.profile img {
		height: 40px;
		width: 40px;
		border-radius: 50%;
	}
	.profile .user {
		display: flex;
		gap: 0.5rem;
		color: white;
	}
	.profile .displayName {
		white-space: nowrap;
	}
	.logBtn {
		cursor: pointer;
		white-space: nowrap;
		background-color: var(--link);
		color: white;
		border: 0;
		border-radius: 3px;
		font-weight: 500;
		padding: 0.2em 0.8em;
	}
	.logBtn:hover,
	.logBtn:focus {
		background-color: var(--link-active);
	}
	.modal {
		position: fixed;
		width: 100%;
		height: 100%;
		display: none;
		z-index: 50;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.modalContainer {
		background-color: var(--surface3);
		padding: 2rem;
	}
	.modal.show {
		display: flex;
	}
</style>
