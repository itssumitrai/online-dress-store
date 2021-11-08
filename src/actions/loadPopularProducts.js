import { getHost } from '../lib/utils';

export default async function loadPopularProducts(context) {
	const { session, fetch } = context;
	try {
		const data = await fetch(`${session.protocol}//${getHost(session)}/xhr/popular`, {
			method: 'GET'
		}).then((res) => res.json());
		return data;
	} catch (ex) {
		return [];
	}
}
