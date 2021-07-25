<script context="module">
	export const prerender = true;
    // export async function load({ page, fetch }) {
    //     const res = await fetch('/login');
    //     if (!res.ok) {
	// 		return {
    //             props: {}
    //         };
	// 	}

    //     const { userCredential } = await res.json();
    //     if (!userCredential) {
    //         return {
    //             props: {}
    //         };
    //     }
    //     // login with user credential
    //     await firebase.auth().signInWithCredential(userCredential);

    //     return {
    //         props: {
    //             userCredential: userCredential
    //         }
    //     };
    // }
</script>

<script>
    import LoginForm from "../components/LoginForm.svelte";
    export let userCredential;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<section>
	<h1>Login</h1>
    <LoginForm />
    {#if userCredential}
        <div>Woohhooo {userCredential.user}</div>
    {/if}
</section>
<style>
</style>
