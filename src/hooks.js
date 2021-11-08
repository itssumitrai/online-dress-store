import { reset } from './store';
import { directives } from './csp-policy';
import { dev } from '$app/env';

const CSP = Object.entries(directives)
	.map(([key, arr]) => key + ' ' + arr.join(' '))
	.join('; ');

export const handle = async ({ request, resolve }) => {
	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);
	return {
		...response,
		headers: {
			...response.headers,
			'X-Frame-Options': 'SAMEORIGIN',
			'Referrer-Policy': 'no-referrer',
			'X-Content-Type-Options': 'nosniff',
			'Content-Security-Policy': CSP
		}
	};
};

export function getSession(request) {
	// reset store state
	reset();

	return {
		host: request.host,
		protocol: dev ? 'http:' : 'https:'
	};
}
