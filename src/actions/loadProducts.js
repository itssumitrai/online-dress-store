import { getHost } from '../lib/utils';

export default async function loadProducts(context, params = {}) {
	const { session, fetch } = context;
	const ALLOWED_PARAMS = ['sku'];
	const finalSearchParams = {};
	ALLOWED_PARAMS.forEach((key) => {
		if (params[key] !== undefined) {
			finalSearchParams[key] = params[key];
		}
	});

	return fetch(
		`${session.protocol}//${getHost(session)}/xhr/allProducts?${new URLSearchParams(
			finalSearchParams
		).toString()}`,
		{
			method: 'GET'
		}
	).then((res) => {
		if (!res.ok) {
			return Promise.reject();
		}
		return res.json();
	});
}
