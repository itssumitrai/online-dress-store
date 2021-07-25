<script context="module">
	export const prerender = true;
    export async function load({ page, fetch }) {
        const res = await fetch('/signup');
        if (!res.ok) {
			return {
                props: {}
            };
		}

        return {
            props: {
                Hello: {}
            }
        };
    }
</script>

<script>
import  SignupForm from '../components/SignupForm.svelte';

</script>

<svelte:head>
	<title>Signup</title>
</svelte:head>

<section>
	<h1>Sign up</h1>
    <SignupForm />
</section>
<style>
</style>
