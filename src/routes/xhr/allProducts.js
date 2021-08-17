import admin from 'firebase-admin';

export const get = async ({ query }) => {
	const sku = query.get('sku');
	const db = admin.firestore();
	let productsRef = db.collection('products');
	if (sku) {
		productsRef = productsRef.where('sku', '==', sku);
	}
	try {
		const snapshot = await productsRef.get();
		if (snapshot.empty) {
			console.error('>> No matching data in database');
			throw {
				status: 404,
				body: 'No matching records'
			};
		}
		const finalData = [];
		snapshot.forEach((doc) => {
			finalData.push(doc.data());
		});
		return {
			status: 200,
			body: finalData
		};
	} catch (ex) {
		return {
			status: ex.status || 500,
			body: ex.message || 'Downstream error'
		};
	}
};
