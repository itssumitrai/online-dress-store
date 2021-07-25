import firebase from 'firebase';

export const post = async ({ body, headers }) => {
    const email = body.get('email');
    const password = body.get('password');
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('>> User is now signed in:', userCredential.user.customClaims);
        // Set cookie
        const token = await userCredential.user.getIdToken();
        console.log('>> headers.cookie:', headers.cookie);

        return {
            status: 200,
            headers: {
                cookie: headers.cookie + '; token=' + token
            },
            body: {
                userCredential: userCredential
            }
        };
        // TODO: add first & last name to database
    } catch (ex) {
        console.error('>> Error during login:', ex);
    }

	return {
        status: 200,
        body: {}
    };
};