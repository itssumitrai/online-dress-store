<script>
	/* global firebase */
	export let onClose;
	let hasLoginError = false;
	let hasSignupError = false;
	let isLoading = false;
	let isRegistering = false;
	async function onLogin(e) {
		e.preventDefault();
		const { email, password } = e.currentTarget.elements;
		try {
			isLoading = true;
			await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
			handleClose();
		} catch (ex) {
			isLoading = false;
			hasLoginError = true;
		}
	}
	async function onSignup(e) {
		e.preventDefault();
		const { email, password, photoURL, firstName, lastName, phone } = e.currentTarget.elements;
		try {
			isLoading = true;
			const { user } = await firebase
				.auth()
				.createUserWithEmailAndPassword(email.value, password.value);
			await user.updateProfile({
				photoURL: photoURL.value,
				displayName: firstName.value + ' ' + lastName.value,
				phoneNumber: phone.value
			});
			// Send email verification
			firebase.auth().currentUser.sendEmailVerification(); // we don't need to wait for this operation hence no await
			handleClose();
		} catch (ex) {
			isLoading = false;
			hasSignupError = true;
		}
	}
	function showLogin() {
		isRegistering = false;
	}
	// function showRegister() {
	// 	isRegistering = true;
	// }
	// async function resetPassword() {
	// 	try {
	// 		const email = document.getElementById('loginForm').querySelector('input[name="email"]').value;
	// 		if (email) {
	// 			await firebase.auth().sendPasswordResetEmail(email);
	// 		}
	// 	} catch (ex) {}
	// }

	function handleClose(e) {
		isRegistering = false;
		isLoading = false;
		hasSignupError = false;
		hasLoginError = false;
		onClose(e);
	}
</script>

<section>
	{#if isRegistering}
		<h2>Sign up new user</h2>
		<form on:submit={onSignup}>
			<label><span>First Name:</span><input type="text" name="firstName" required /></label>
			<label><span>Last Name:</span><input type="text" name="lastName" required /></label>
			<label><span>Phone:</span><input type="tel" name="phone" /></label>
			<label><span>Profile image:</span><input type="url" name="photoURL" /></label>
			<label><span>Email id:</span><input type="email" name="email" required /></label>
			<label><span>Password:</span><input type="password" name="password" required /></label>
			<label
				><span>Confirm password:</span><input type="password" name="cpassword" required /></label
			>
			<button type="submit">Sign up</button>
		</form>
		<p>By signing up, you agree to our terms & conditions.</p>
		<button on:click={showLogin}>Login as existing user</button>
		{#if hasSignupError}
			<p class="errorMsg">Some Error happened while signin in, please try again</p>
		{/if}
	{:else}
		<h2>Log In</h2>
		<form on:submit={onLogin} id="loginForm">
			<label><span class="text">Email id:</span><input type="email" name="email" required /></label>
			<label
				><span class="text">Password:</span><input
					type="password"
					name="password"
					required
				/></label
			>
			<button class="submitBtn" type="submit">{isLoading ? 'Logging in...' : 'Login'}</button>
		</form>
		<!-- <button on:click={showRegister}>Create a new account</button> -->
		<!-- <button on:click={resetPassword}>Reset password</button> -->
		{#if hasLoginError}
			<p class="errorMsg">Some Error happened while logging in, please try again</p>
		{/if}
	{/if}
	<button class="closeBtn" aria-label="Close" title="Close" on:click={handleClose}>
		<svg
			class="closeIcon"
			width="16"
			style="stroke-width:0;vertical-align:bottom;"
			height="16"
			viewBox="0 0 48 48"
			data-icon="close"
			data-reactid="50"
			><path
				d="M37.98 34.827l-9.9-9.9 9.9-9.898c.78-.782.78-2.05 0-2.83-.78-.78-2.047-.78-2.828 0l-9.9 9.9-9.898-9.9c-.78-.78-2.048-.78-2.828 0-.78.78-.78 2.047 0 2.828l9.9 9.9-9.9 9.898c-.78.78-.78 2.047 0 2.828.78.78 2.047.78 2.828 0l9.9-9.9 9.898 9.9c.78.78 2.048.78 2.828 0 .782-.78.782-2.047 0-2.827z"
				data-reactid="51"
			/></svg
		>
	</button>
</section>

<style>
	section {
		position: relative;
	}
	label {
		display: block;
		display: flex;
		justify-content: flex-start;
		margin-bottom: 1rem;
	}
	.text {
		margin-right: 1rem;
	}
	h2 {
		font-size: 1.4rem;
		margin: 0 0 1rem 0;
	}
	.closeBtn {
		position: absolute;
		padding: 0.4em;
		top: 0;
		right: 0;
		cursor: pointer;
		background-color: var(--surface3);
		color: var(--link);
		border: 1px solid var(--seperator);
		border-radius: 50%;
	}
	.submitBtn {
		padding: 0.5em 1em;
		font-weight: 500;
		background-color: var(--link);
		color: white;
		cursor: pointer;
		border-radius: 5px;
		border: none;
	}
	.submitBtn:hover,
	.submitBtn:focus {
		background-color: var(--link-active);
	}
	.closeBtn:hover,
	.closeBtn:focus {
		background-color: var(--link-active);
	}
	.errorMsg {
		color: var(--negative);
	}
	form input {
		font-size: 0.9rem;
		width: 25ch;
	}
</style>
