export default async function loadPopularProducts(context) {
	const { session, fetch } = context;
	try {
		const data = await fetch(`http://${session.host}/xhr/popular`, {
			method: 'GET'
		}).then((res) => res.json());
		return data;
	} catch (ex) {
		return [];
	}
}
