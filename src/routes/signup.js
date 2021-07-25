import firebase from 'firebase';

export const post = async ({ body }) => {
    const email = body.get('email');
    const password = body.get('password');
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('>> User is now signed in:', userCredential.user);
        // TODO: add first & last name to database
    } catch (ex) {
        console.error('>> Error during signup:', ex);
    }

	return {
        status: 200,
        body: {}
    };
};