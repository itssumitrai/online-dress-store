<script context="module">
	export const prerender = true;
    export async function load({ page, fetch }) {
        const res = await fetch('http://localhost:3000/xhr/popular', {
            method: 'GET'
        });
        if (res.ok) {
            return {
                props: {
                    popularItems: await res.json()
                }
            };
        }
        return {
            props: {
                popularItems: []
            }
        };
    }
</script>

<script>
    import Popular from '../components/Popular.svelte';
    export let popularItems;
</script>

<svelte:head>
	<title>Online Dress Store</title>
</svelte:head>

<section>
	<h1>Online Dress Store</h1>
    <Popular items={popularItems}/>
</section>
<style>
</style>
