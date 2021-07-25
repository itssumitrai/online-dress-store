import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase";
// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import { config } from './lib/firebase';
import admin from 'firebase-admin';
import { reset } from './store';

export const handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
    console.log('>> request cookies:', cookies);
	request.locals.userid = cookies.userid || uuid();

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
	}

	return response;
};

export function getSession(request) {
    // reset store state
    reset();
    if (firebase.apps.length === 0) {
        // only initialize firebase once.
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
        firebase.initializeApp(config);
        firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                // update cookie & store
            } else {
                const token = await user.getIdToken();
                // update cookie & store
            }
        });
    }

    return {
    };
}