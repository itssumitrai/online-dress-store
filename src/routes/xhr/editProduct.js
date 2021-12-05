import { getDatabase, getAuth } from '../../../firebaseUtil.js';

async function isAdminUser(body) {
	const { token } = body;
	if (!token) {
		return false;
	}
	const currentUserClaim = await getAuth().verifyIdToken(token);
	if (!currentUserClaim.admin) {
		// current user is not admin.
		return false;
	}
	return true;
}

export async function post({ body }) {
	const parsedBody = JSON.parse(body);
	if (!(await isAdminUser(parsedBody))) {
		return {
			status: 401,
			body: 'Unauthorized: cannot add product'
		};
	}
	const { item } = parsedBody;
	const docRef = await getDatabase().collection('products').doc(item.sku);
	await docRef.set(item); // if sku is present, its overridden otherwise a new one is created (Edit/Add)
	return {
		status: 200,
		body: item
	};
}

export async function put({ body }) {
	const parsedBody = JSON.parse(body);
	if (!(await isAdminUser(parsedBody))) {
		return {
			status: 401,
			body: 'Unauthorized: cannot edit product'
		};
	}
	const { item } = parsedBody;
	const docRef = await getDatabase().collection('products').doc(item.sku);
	await docRef.set(item); // if sku is present, its overridden otherwise a new one is created (Edit/Add)
	return {
		status: 200,
		body: item
	};
}

export async function del({ body }) {
	const parsedBody = JSON.parse(body);
	if (!(await isAdminUser(parsedBody))) {
		return {
			status: 401,
			body: 'Unauthorized: cannot delete product'
		};
	}
	const { sku } = parsedBody;
	await getDatabase().collection('products').doc(sku).delete();
	return {
		status: 200,
		body: { sku, message: 'OK' }
	};
}
