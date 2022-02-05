import { reset } from './store';
import { directives } from './csp-policy';
import { dev } from '$app/env';

export const handle = async ({ event, resolve }) => {
	const { searchParams } = event;
	// TODO https://github.com/sveltejs/kit/issues/1046
	if (searchParams?.has('_method')) {
		event.request.method = searchParams.get('_method').toUpperCase();
	}

	const response = await resolve(event);
	if (response.headers.get('content-type')?.startsWith('text/html')) {
		const CSP = Object.entries(directives)
			.map(([key, arr]) => key + ' ' + arr.join(' '))
			.join('; ');
		const headers = {
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
		};
		Object.keys(headers).forEach((headerKey) => {
			response.headers.set(headerKey, headers[headerKey]);
		});
	}
	return response;
};

export function getSession(event) {
	// reset store state
	reset();

	return {
		host: event.request.host,
		protocol: dev ? 'http:' : 'https:'
	};
}
