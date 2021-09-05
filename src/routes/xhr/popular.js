export const get = async (request) => {
	let res;
	try {
		res = await fetch(`http://${request.host}/xhr/test?value=popular`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		}).then((res) => {
			if (!res.ok) {
				throw new Error('Response not ok');
			}
			return res.json();
		});
	} catch (ex) {
		return {
			status: ex.status || 500,
			body: ex.message || 'Downstream error'
		};
	}
	return {
		status: 200,
		body: res
	};
};
