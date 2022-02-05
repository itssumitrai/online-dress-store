// import { getHost } from '../lib/utils';

export default async function loadProducts(context, params = {}) {
	const { fetch, url } = context;
	const ALLOWED_PARAMS = ['sku'];
	const { searchParams } = url;
	const finalSearchParams = {};
	ALLOWED_PARAMS.forEach((key) => {
		if (params[key] !== undefined) {
			finalSearchParams[key] = params[key];
		}
	});
	finalSearchParams.count = searchParams.get('c') || 20; // count of items to load
	finalSearchParams.offset = searchParams.get('o') || 0; // start index of items to load

	return fetch(`/xhr/products?${new URLSearchParams(finalSearchParams).toString()}`, {
		method: 'GET'
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error(res.statusText || 'Could not load products');
			}
			return res.json();
		})
		.catch((err) => {
			console.error(err);
			return { meta: { count: 20, offset: 0, pageSize: 1 }, items: [] };
		});
}
