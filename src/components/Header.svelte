<script>
    import Navbar from './Navbar.svelte';
    import logo from '../lib/header/svelte-logo.svg';
</script>
<header>
    <div class="corner">
		<a href="https://kit.svelte.dev">
			<img height="32" width="32" src={logo} alt="SvelteKit" />
		</a>
	</div>
    <Navbar />
    <div>
        <a href="/">Sign in</a>
    </div>
</header>
<style>
    header {
        background-color: var(--nav-light);
        display: flex;
    }
</style>