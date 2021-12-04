import admin from 'firebase-admin';
import { dev } from '$app/env';
import { join } from 'path';
import { config } from './firebaseConfig';

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
