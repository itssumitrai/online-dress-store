<script>
    import Navbar from './Navbar.svelte';
    import logo from '../lib/header/svelte-logo.svg';
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
		<a href="https://kit.svelte.dev">
			<img height="32" width="32" src={logo} alt="SvelteKit" />
		</a>
	</div>
    <Navbar isUserLoggedIn={isUserLoggedIn} />
    <div class="profile">
        {#if isUserLoggedIn}
            <span>
                {#if profileData.photoURL}
                    <img src={profileData.photoURL} alt="profile picture" />
                {/if}
                {profileData.displayName}
            </span>
            <button on:click={logout}>Sign out</button>
        {:else}
            <button on:click={showSignIn}>Sign in</button>
        {/if}
    </div>
    <div class={`modal ${showSignInModal ? 'show' : ''}`}>
        <div class="modalContainer">
            <LoginForm onClose={onClose} />
        </div>
    </div>
</header>
<style>
    header {
        background-color: var(--nav-light);
        display: flex;
    }
    .profile {
        position: relative;
    }
    .profile img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
    .modal {
        position: fixed;
        width: 100%;
        height: 100%;
        display: none;
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