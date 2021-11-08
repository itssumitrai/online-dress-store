import { reset } from './store';

const { NODE_ENV } = process.env;

export const handle = async ({ request, resolve }) => {
	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);
	return response;
};

export function getSession(request) {
	// reset store state
	reset();

	return {
		host: request.host,
		protocol: NODE_ENV === 'development' ? 'http:' : 'https:'
	};
}
