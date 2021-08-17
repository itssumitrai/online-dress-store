<script>
    import { page } from '$app/stores';
    export let isUserLoggedIn;
    const navData = [
        {
            url: '/',
            label: 'Home'
        },
        {
            url: '/about',
            label: 'About'
        }
    ];
    if (isUserLoggedIn) {
        navData.push({
            url: '/addProduct',
            label: 'Add Product'
        });
    }
</script>
<nav>
    <ul>
        {#each navData as nav}
        <li class:active={$page.path === nav.url}><a sveltekit:prefetch href={nav.url}>{nav.label}</a></li>
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
        gap: 1.5rem;
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
</style>