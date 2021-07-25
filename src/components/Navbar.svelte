<script>
    import { page } from '$app/stores';
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
</script>
<nav>
    <ul>
        {#each navData as nav}
        <li class:active={$page.path === nav.url}><a sveltekit:prefetch href={nav.url}>{nav.label}</a></li>
        {/each}
    </ul>
</nav>
<style>

</style>