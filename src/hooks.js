import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import { config } from './lib/firebase';
import admin from 'firebase-admin';
import { reset } from './store';

export const handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
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

	if (!admin.apps || admin.apps.length === 0) {
		// only initialize firebase admin sdk once on the server
		admin.initializeApp({
			...config,
			credential: admin.credential.applicationDefault()
		});
	}

	return {
		host: request.host
	};
}
