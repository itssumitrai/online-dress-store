import admin from 'firebase-admin';
import { dev } from '$app/env';
import { join } from 'path';

export const config = {
	apiKey: 'AIzaSyA3nvUwcIbPuU1qxJ0U9HIDfUXkS0X0HHQ',
	authDomain: 'dress-catalog.firebaseapp.com',
	projectId: 'dress-catalog',
	storageBucket: 'dress-catalog.appspot.com',
	messagingSenderId: '872477903513',
	appId: '1:872477903513:web:fb7c6d515c8d1fbfa50608',
	measurementId: 'G-GHYJBN5Y9Z'
};

function initializeApp() {
	if (!admin.apps || admin.apps.length === 0) {
		let credential = admin.credential.applicationDefault();
		if (!dev) {
			credential = admin.credential.cert(require(join(__dirname, './serviceAccountKey.json')));
		}
		admin.initializeApp({
			...config,
			credential
		});
	}
}

export const getDatabase = () => {
	initializeApp();
	return admin.firestore();
};

export const getStorage = () => {
	initializeApp();
	return admin.storage();
};

export const getAuth = () => {
	initializeApp();
	return admin.auth();
};
