import admin from 'firebase-admin';
// import { dev } from '$app/env';
// import * as path from 'path';

export const config = {
	apiKey: 'AIzaSyA3nvUwcIbPuU1qxJ0U9HIDfUXkS0X0HHQ',
	authDomain: 'dress-catalog.firebaseapp.com',
	projectId: 'dress-catalog',
	storageBucket: 'dress-catalog.appspot.com',
	messagingSenderId: '872477903513',
	appId: '1:872477903513:web:fb7c6d515c8d1fbfa50608',
	measurementId: 'G-GHYJBN5Y9Z'
};

function getCredential() {
	// return new Promise((resolve, reject) => {
	// 	if (dev) {
	// 		return resolve(admin.credential.applicationDefault());
	// 	}
	// 	import(path.join(path.resolve(), './sveltekit/serviceAccountKey.json'))
	// 		.then(({ default: serviceAccountKey }) => resolve(admin.credential.cert(serviceAccountKey)))
	// 		.catch(reject);
	// });
	return new Promise((resolve) => resolve(admin.credential.applicationDefault()));
}
async function initializeApp() {
	if (!admin.apps || admin.apps.length === 0) {
		try {
			const credential = await getCredential();
			// Initialize the default app
			admin.initializeApp({
				...config,
				credential
			});
		} catch (err) {
			console.error(err);
			return Promise.reject(new Error('Could not read service account key'));
		}
	}
	return Promise.resolve();
}

export const getDatabase = async () => {
	await initializeApp();
	return admin.firestore();
};

export const getStorage = async () => {
	await initializeApp();
	return admin.storage();
};

export const getAuth = async () => {
	await initializeApp();
	return admin.auth();
};
