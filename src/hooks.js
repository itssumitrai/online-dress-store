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
			'Expect-CT': JSON.stringify({
				'max-age': 31536000
			}),
			'Referrer-Policy': 'no-referrer-when-downgrade',
			'Strict-Transport-Security': 'max-age=15552000',
			'X-Content-Type-Options': 'nosniff',
			'X-Download-Options': 'noopen',
			'X-Frame-Options': 'SAMEORIGIN',
			'X-Permitted-Cross-Domain-Policies': 'none',
			'X-XSS-Protection': 0,
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
